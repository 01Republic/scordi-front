import React, {memo} from 'react';
import {ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {useProductSimilarNameList} from '^models/ProductSimilarName/hook';
import {ProductDto} from '^models/Product/type';

interface ConnectProductSectionProps {
    product: ProductDto;
    disconnectProduct: ProductSimilarNameDto[];
    setDisConnectProduct: React.Dispatch<React.SetStateAction<ProductSimilarNameDto[]>>;
}

export const ConnectedProductsSection = memo((props: ConnectProductSectionProps) => {
    const {product, disconnectProduct, setDisConnectProduct} = props;

    const {result} = useProductSimilarNameList({
        relations: [],
        where: {productId: product.id},
        order: {id: 'DESC'},
    });

    const productSimilarList = result.items.filter((item) => item.name !== product.nameKo);

    const toggleDisconnect = (item: ProductSimilarNameDto) => {
        setDisConnectProduct((prev) =>
            prev.some((product) => product.id === item.id)
                ? prev.filter((product) => product.id !== item.id)
                : [...prev, item],
        );
    };

    return (
        <section>
            <div className="pb-1.5 border-b border-gray-200">
                <p className="text-12 font-medium">연결된 서비스 ({result.pagination.currentItemCount})</p>
            </div>
            <div>
                {productSimilarList.map((item) => {
                    const isDisconnect = disconnectProduct.some((val) => val.id === item.id);
                    return (
                        <div
                            key={item.id}
                            className="flex items-center justify-between py-1.5 border-b border-gray-200"
                        >
                            <p className={isDisconnect ? 'text-red-600' : 'text-gray-400'}>{item.name}</p>
                            <button
                                type="button"
                                onClick={() => toggleDisconnect(item)}
                                className={`btn btn-xs !bg-white !border-gray-300  ${
                                    isDisconnect ? 'text-red-500' : '!text-gray-500'
                                }`}
                            >
                                {isDisconnect ? '취소' : '연결 해제'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});
