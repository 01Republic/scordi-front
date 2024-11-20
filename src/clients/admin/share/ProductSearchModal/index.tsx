import {memo, useState} from 'react';
import {SwalForm} from '^components/util/dialog/swal-form';
import {useForm} from 'react-hook-form';
import {FindAllProductQuery, ProductDto} from '^models/Product/type';
import {productApi} from '^models/Product/api';
import {errorToast} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {LoadableBox} from '^components/util/loading';
import {paginatedDtoOf} from '^types/utils/response-of';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {ReactNodeElement} from '^types/global.type';

interface ProductSearchModalProps {
    title: ReactNodeElement;
    onSelect: (product: ProductDto) => any;
}

export const ProductSearchModal = memo((props: ProductSearchModalProps) => {
    const {title, onSelect} = props;
    const form = useForm<Pick<FindAllProductQuery, 'keyword'>>();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<Paginated<ProductDto>>({
        items: [],
        pagination: {
            itemsPerPage: 30,
            currentPage: 0,
            currentItemCount: 0,
            totalPage: 0,
            totalItemCount: 0,
        },
    });

    const search = ({keyword}: Pick<FindAllProductQuery, 'keyword'>) => {
        setIsLoading(true);
        productApi
            .index({
                isLive: true,
                itemsPerPage: 0,
                order: {id: 'DESC'},
                keyword,
            })
            .then(paginatedDtoOf(ProductDto))
            .then((res) => setResult(res.data))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <SwalForm onSubmit={form.handleSubmit(search)} confirmBtnText="확인" className="px-2">
            <section>
                <h4 className="text-xl sm:text-lg text-left text-scordi">{title}</h4>
            </section>

            <section className="mb-4 flex flex-col gap-3">
                <div>
                    <label>
                        <p className="text-14 mb-1">이름으로 찾기</p>
                        <input
                            autoFocus
                            className="input sm:input-sm input-bordered w-full bg-gray-100"
                            {...form.register('keyword')}
                            required
                        />
                    </label>
                </div>
            </section>

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <section className="mb-4">
                    {result.items.length ? (
                        <div>
                            <div className="text-12 text-scordi mb-3">
                                검색결과: 총 {result.pagination.totalItemCount.toLocaleString()}개
                            </div>
                            <div className="grid grid-cols-2 gap-0.5">
                                {result.items.map((product, i) => (
                                    <div
                                        key={i}
                                        className="btn btn-block bg-white hover:bg-slate-100 flex items-center justify-between group"
                                        onClick={() => onSelect(product)}
                                    >
                                        <div className="flex-1 flex items-center gap-2">
                                            <ProductAvatarImg product={product} className="w-6 h-6" />
                                            <div className="flex items-center gap-2">
                                                <span className="text-14">{product.name()}</span>
                                                <span className="text-12 text-gray-400">(id: {product.id})</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="btn btn-xs hidden group-hover:inline-flex items-center justify-center btn-white rounded-md shadow border-gray-300">
                                                선택
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-12 text-gray-400">검색결과: 없음</div>
                    )}
                </section>
            </LoadableBox>
        </SwalForm>
    );
});
