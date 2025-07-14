import React, {memo, useRef} from 'react';

interface AddCreateProductSectionProps {
    createProduct: string[];
    setCreateProduct: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddCreateProductSection = memo((props: AddCreateProductSectionProps) => {
    const {createProduct, setCreateProduct} = props;

    const inputRef = useRef<HTMLInputElement>(null);

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

    return (
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
                <button type="button" className="btn btn-xs btn-scordi ml-2 border-none" onClick={handleAddCreate}>
                    추가
                </button>
            </div>
        </section>
    );
});
