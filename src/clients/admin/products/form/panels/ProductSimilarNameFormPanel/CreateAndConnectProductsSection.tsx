import React, {memo} from 'react';

interface CreateAndConnectProductSectionProps {
    createProduct: string[];
    setCreateProduct: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CreateAndConnectProductsSection = memo((props: CreateAndConnectProductSectionProps) => {
    const {createProduct, setCreateProduct} = props;

    const handleRemoveCreate = (name: string) => {
        setCreateProduct((prev) => prev.filter((val) => val !== name));
    };

    return (
        <section>
            <div className="pb-1.5 border-b border-gray-200 flex justify-between">
                <p className="text-12 font-medium">
                    서비스 등록 및 연결 {createProduct.length > 0 && `(${createProduct.length})`}
                </p>
            </div>
            <div className="mt-2 space-y-1">
                {createProduct.map((name) => (
                    <div key={name} className="flex items-center justify-between py-1.5 border-b border-gray-200">
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
    );
});
