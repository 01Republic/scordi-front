import React, {memo, useState} from 'react';
import {errorToast} from '^api/api';
import {ProductDto} from '^models/Product/type';
import {ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {useCreateProductSimilarName, useUpdateProductSimilarName} from '^models/ProductSimilarName/hook';
import {ContentPanel} from '^layouts/ContentLayout';
import {ConnectedProductsSection} from './ConnectedProductsSection';
import {AddCreateProductSection} from './AddCreateProductSection';
import {CreateAndConnectProductsSection} from './CreateAndConnectProductsSection';

interface ProductSimilarNameFormPanelProps {
    product: ProductDto;
}

export const ProductSimilarNameFormPanel = memo((props: ProductSimilarNameFormPanelProps) => {
    const {product} = props;
    const {mutateAsync: createProductSimilarName} = useCreateProductSimilarName();
    const {mutateAsync: updateProductSimilarName} = useUpdateProductSimilarName();

    const [disconnectProduct, setDisConnectProduct] = useState<ProductSimilarNameDto[]>([]);
    const [createProduct, setCreateProduct] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setIsLoading(true);
        const createPs = createProduct.map((name) => createProductSimilarName({name, productId: product.id}));
        const updatePs = disconnectProduct.map((item) =>
            updateProductSimilarName({id: item.id, data: {name: item.name}}),
        );

        Promise.all([...createPs, ...updatePs])
            .then(() => {
                setCreateProduct([]);
                setDisConnectProduct([]);
            })
            .catch((error) => errorToast(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <ContentPanel title="서비스명 등록 연결 및 연결 해제">
            <div className="grid grid-cols-4">
                <div className="flex flex-col col-span-2 gap-10 text-14">
                    {/* 연결된 서비스 영역 */}
                    <ConnectedProductsSection
                        product={product}
                        disconnectProduct={disconnectProduct}
                        setDisConnectProduct={setDisConnectProduct}
                    />

                    {/* 등록할 서비스 추가 영역 */}
                    <AddCreateProductSection createProduct={createProduct} setCreateProduct={setCreateProduct} />

                    {/* 서비스 등록 및 연결 리스트 영역 */}
                    {createProduct.length > 0 && (
                        <CreateAndConnectProductsSection
                            createProduct={createProduct}
                            setCreateProduct={setCreateProduct}
                        />
                    )}
                </div>
                <div className="col-span-2 flex h-full items-end justify-end">
                    <button
                        type="submit"
                        className={`btn btn-md btn-scordi rounded-lg ${isLoading ? 'link_to-loading' : ''}`}
                        onClick={onSubmit}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </ContentPanel>
    );
});
