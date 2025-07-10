import React, {memo, useRef, useState} from 'react';
import {errorToast} from '^api/api';
import {ProductDto} from '^models/Product/type';
import {ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {
    useCreateProductSimilarName,
    useProductSimilarNameList,
    useUpdateProductSimilarName,
} from '^models/ProductSimilarName/hook';
import {ContentPanel} from '^layouts/ContentLayout';

interface ProductSimilarNameFormPanelProps {
    product: ProductDto;
}

export const ProductSimilarNameFormPanel = memo((props: ProductSimilarNameFormPanelProps) => {
    const {product} = props;
    const {result} = useProductSimilarNameList({
        relations: [],
        where: {productId: product.id},
        order: {id: 'DESC'},
    });

    const {mutateAsync: createProductSimilarName} = useCreateProductSimilarName();
    const {mutateAsync: updateProductSimilarName} = useUpdateProductSimilarName();

    const [disconnectProduct, setDisConnectProduct] = useState<ProductSimilarNameDto[]>([]);
    const [createProduct, setCreateProduct] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleDisconnect = (item: ProductSimilarNameDto) => {
        setDisConnectProduct((prev) =>
            prev.some((product) => product.id === item.id)
                ? prev.filter((product) => product.id !== item.id)
                : [...prev, item],
        );
    };

    const handleAddCreate = () => {
        const val = inputRef.current?.value.trim();
        if (!val) return;
        if (createProduct.includes(val)) {
            inputRef.current!.value = '';
            return;
        }
        setCreateProduct((prev) => [...prev, val]);
        inputRef.current!.value = '';
    };

    const handleRemoveCreate = (name: string) => {
        setCreateProduct((prev) => prev.filter((val) => val !== name));
    };

    const onSubmit = () => {
        setIsLoading(true);
        const createPs = createProduct.map((name) =>
            createProductSimilarName({name, productId: product.id, isBlock: false}),
        );
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
                    {/* 연결된 서비스 (모두 보여주되, 해제 대기 중인 건 빨간 텍스트) */}
                    {result.pagination.currentItemCount > 0 && (
                        <section>
                            <div className="pb-1.5 border-b border-gray-200">
                                <p className="text-12 font-medium">
                                    연결된 서비스 ({result.pagination.currentItemCount})
                                </p>
                            </div>
                            <div>
                                {result.items.map((item) => {
                                    const isDisconnect = disconnectProduct.some((val) => val.id === item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between py-1.5 border-b border-gray-200"
                                        >
                                            <p className={isDisconnect ? 'text-red-600' : 'text-gray-400'}>
                                                {item.name}
                                            </p>
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
                    )}

                    {/* 등록할 서비스 추가 영역 */}
                    <section>
                        <div className="pb-1.5 border-b border-gray-200 flex justify-between">
                            <p className="text-12 font-medium">등록할 서비스 추가</p>
                        </div>

                        {/* 입력 + 추가 버튼 */}
                        <div className="flex items-center justify-between border-b border-gray-200">
                            <input
                                ref={inputRef}
                                type="text"
                                className="input rounded-none p-0 text-14 w-full focus:outline-0 text-gray-400 placeholder-gray-400 placeholder-text-14"
                                placeholder="등록할 서비스 명을 입력해주세요."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                        handleAddCreate();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-xs btn-scordi ml-2 border-none"
                                onClick={handleAddCreate}
                            >
                                추가
                            </button>
                        </div>
                    </section>

                    {/* 서비스 등록 및 연결 리스트 */}
                    {createProduct.length > 0 && (
                        <section>
                            <div className="pb-1.5 border-b border-gray-200 flex justify-between">
                                <p className="text-12 font-medium">
                                    서비스 등록 및 연결 {createProduct.length > 0 && `(${createProduct.length})`}
                                </p>
                            </div>
                            <div className="mt-2 space-y-1">
                                {createProduct.map((name) => (
                                    <div
                                        key={name}
                                        className="flex items-center justify-between py-1.5 border-b border-gray-200"
                                    >
                                        <span className="text-gray-400">{name}</span>
                                        <button
                                            type="button"
                                            className="btn btn-xs !bg-white !border-gray-300 text-red-500 "
                                            onClick={() => handleRemoveCreate(name)}
                                        >
                                            취소
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
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
