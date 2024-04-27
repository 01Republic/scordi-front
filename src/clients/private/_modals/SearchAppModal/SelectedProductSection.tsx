import {memo} from 'react';
import {atom, useRecoilState} from 'recoil';
import {ProductDto} from '^models/Product/type';
import {SelectedProductItem} from './SelectedProductItem';

export const selectedProductsAtom = atom<ProductDto[]>({
    key: 'selectedProductsAtom',
    default: [],
});

export const SelectedProductSection = memo(function SelectedProductSection() {
    const [selectedProducts, setSelectedProducts] = useRecoilState(selectedProductsAtom);

    const unSelect = (product: ProductDto) => {
        setSelectedProducts((old) => old.filter((p) => p.id !== product.id));
    };

    if (selectedProducts.length === 0) return <></>;

    return (
        <div className="p-4 border-t min-h-[70px]">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-12 text-gray-500 font-medium">선택된 앱 ({selectedProducts.length})</h4>

                <div>
                    <span
                        className="text-11 text-gray-500 hover:text-gray-800 transition-all cursor-pointer"
                        onClick={() => setSelectedProducts([])}
                    >
                        초기화
                    </span>
                </div>
            </div>

            <div className="mb-4">
                {selectedProducts.map((product, i) => (
                    <SelectedProductItem key={i} product={product} unSelect={unSelect} />
                ))}
            </div>

            <button className="btn btn-scordi btn-block">{selectedProducts.length}개의 앱에 대한 구독 등록하기</button>
        </div>
    );
});
