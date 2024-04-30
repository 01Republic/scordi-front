import {selectedProductsAtom} from '../atom';
import {ProductDto} from '../type';
import {useLocalStorageState} from '^atoms/localStorage.atom';

const findById = (arr: ProductDto[], id: number) => arr.find((p) => p.id === id);
const filterById = (arr: ProductDto[], id: number) => arr.filter((p) => p.id !== id);
const addOne = (arr: ProductDto[], elem: ProductDto) => [...arr, elem];

// 선택된 앱 목록 (구독 등록을 위한 앱 선택 컨텍스트에서)
export const useSelectProducts = () => {
    const [selectedProducts, setSelectedProducts] = useLocalStorageState(selectedProductsAtom, ProductDto);

    const select = (product: ProductDto) => {
        const id = product.id;
        setSelectedProducts((arr) => {
            return findById(arr, id) ? arr : addOne(arr, product);
        });
    };

    const toggle = (product: ProductDto) => {
        const id = product.id;
        setSelectedProducts((arr) => {
            return findById(arr, id) ? filterById(arr, id) : addOne(arr, product);
        });
    };

    const unSelect = (product: ProductDto) => {
        const id = product.id;
        setSelectedProducts((arr) => filterById(arr, id));
    };

    const clearSelects = () => setSelectedProducts([]);

    return {
        selectedProducts,
        toggle,
        select,
        unSelect,
        clearSelects,
    };
};
