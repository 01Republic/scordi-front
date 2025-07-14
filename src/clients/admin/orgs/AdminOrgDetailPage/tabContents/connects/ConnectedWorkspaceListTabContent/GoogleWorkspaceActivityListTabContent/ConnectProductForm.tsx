import React, {memo, useState} from 'react';
import {GoogleWorkspaceOauthTokenActivityDto} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/type';
import {ProductSimilarNameDto, UpdateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type';
import {SwalForm} from '^components/util/dialog/swal-form';
import Swal from 'sweetalert2';
import {useForm} from 'react-hook-form';
import {productApi} from '^models/Product/api';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {debounce} from 'lodash';
import {ProductProfile2} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {Check, X} from 'lucide-react';
import {LoadableBox} from '^components/util/loading';
import {ProductDto} from '^models/Product/type';
import {errorToast} from '^api/api';
import {LinkTo} from '^components/util/LinkTo';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {productSimilarNameApi} from '^models/ProductSimilarName/api';

interface ConnectProductFormProps {
    activity: GoogleWorkspaceOauthTokenActivityDto;
    productSimilarName: ProductSimilarNameDto;
    onSave: (productId: number) => any;
}

export const ConnectProductForm = memo((props: ConnectProductFormProps) => {
    const {activity, productSimilarName, onSave} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<Paginated<ProductDto>>(Paginated.init());
    const [selectedProduct, setSelectedProduct] = useState<ProductDto>();

    const search = (keyword: string) => {
        if (!keyword) return;
        setIsSearching(true);
        productApi
            .index({keyword, isLive: true, order: {nameEn: 'ASC', nameKo: 'ASC'}, itemsPerPage: 0})
            .then((res) => setSearchResult(res.data))
            .catch(errorToast)
            .finally(() => setIsSearching(false));
    };

    const toggleProduct = (product: ProductDto) => {
        setSelectedProduct((p) => (p?.id === product.id ? undefined : product));
    };

    const onSubmit = () => {
        if (!selectedProduct) return;
        setIsLoading(true);
        productSimilarNameApi
            .update(productSimilarName.id, {productId: selectedProduct.id})
            .then(() => onSave(selectedProduct.id))
            .then(() => Swal.close())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <div className={`text-left`}>
            <div className="px-4 py-4 flex flex-col gap-3">
                <section className="text-left pt-2">
                    <input
                        type="search"
                        autoFocus
                        placeholder="Search App (Product)"
                        className="input input-sm input-bordered w-full"
                        onChange={debounce((e) => {
                            search(e.target.value.trim());
                        }, 500)}
                    />

                    {selectedProduct && (
                        <div className="text-14 py-2 flex items-cetner gap-2">
                            <span>선택된 앱:</span>{' '}
                            <span>
                                (id: #{selectedProduct.id}) {selectedProduct.name()}
                            </span>{' '}
                            <span
                                className="flex items-center cursor-pointer text-gray-500 hover:text-black"
                                onClick={() => setSelectedProduct(undefined)}
                            >
                                <X fontSize={14} />
                            </span>
                        </div>
                    )}
                </section>

                <LoadableBox isLoading={isSearching} loadingType={2} noPadding>
                    {searchResult.items.map((product, i) => (
                        <div
                            key={i}
                            tabIndex={0}
                            onClick={() => toggleProduct(product)}
                            className="w-full py-2 px-4 flex items-center group cursor-pointer rounded-md hover:bg-scordi-100"
                        >
                            <a
                                href={AdminProductPageRoute.path(product.id)}
                                target="_blank"
                                className="text-scordi hover:underline"
                            >
                                <ProductProfile2 product={product} />
                            </a>
                            <div className="ml-auto">
                                <Check
                                    className={
                                        product.id === selectedProduct?.id ? '' : 'opacity-0 group-hover:opacity-50'
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </LoadableBox>

                <section className="flex items-center justify-end gap-1.5">
                    <button
                        type="button"
                        className="btn sm:btn-sm bg-gray-200 text-gray-500 rounded-btn"
                        onClick={() => Swal.close()}
                    >
                        취소
                    </button>
                    <button
                        onClick={onSubmit}
                        className={`btn sm:btn-sm btn-scordi rounded-btn ${isLoading ? 'loading' : ''}`}
                    >
                        확인
                    </button>
                </section>
            </div>
        </div>
    );
});
ConnectProductForm.displayName = 'ConnectProductForm';
