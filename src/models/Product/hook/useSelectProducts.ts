import {selectedProductsAtom} from '../atom';
import {ProductDto} from '../type';
import {useLocalStorageState} from '^atoms/localStorage.atom';
import {finishedProductMapAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/atom';
import {useRecoilState} from 'recoil';

const findById = (arr: ProductDto[], id: number) => arr.find((p) => p.id === id);
const filterById = (arr: ProductDto[], id: number) => arr.filter((p) => p.id !== id);
const addOne = (arr: ProductDto[], elem: ProductDto) => [...arr, elem];

// 선택된 앱 목록 (구독 등록을 위한 앱 선택 컨텍스트에서)
export const useSelectProducts = () => {
    const [selectedProducts, setSelectedProducts] = useLocalStorageState(selectedProductsAtom, ProductDto);
    const [finishedProductMap, setFinishedProductMap] = useRecoilState(finishedProductMapAtom);

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

    const selectedWithFinishedProducts = (() => {
        const arr = [...selectedProducts];
        Object.entries(finishedProductMap).forEach(([index, product]) => {
            arr.splice(parseInt(index), 0, product);
        });
        return arr;
    })();

    const finish = (productId: number) => {
        const index = selectedWithFinishedProducts.findIndex((p) => p.id === productId);
        const finishedProduct = selectedWithFinishedProducts[index];
        setFinishedProductMap((dic) => {
            const dic2 = {...dic};
            dic2[index] = finishedProduct;
            return dic2;
        });
        unSelect(finishedProduct);
    };

    return {
        selectedProducts,
        selectedWithFinishedProducts,
        toggle,
        select,
        unSelect,
        clearSelects,
        finishedProductMap,
        finish,
    };
};
