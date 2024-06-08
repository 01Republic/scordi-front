import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {ProductDto} from '^models/Product/type';
import {useEffect} from 'react';
import {useSelectProducts} from '^models/Product/hook';
import {productApi} from '^models/Product/api';

const currentConnectingProductAtom = atom<ProductDto | null>({
    key: 'currentConnectingProductAtom',
    default: null,
});

const lastRequestedIdAtom = atom<number | undefined>({
    key: 'currentConnectingProduct/lastRequestedIdAtom',
    default: undefined,
});

const isLoadingAtom = atom({
    key: 'currentConnectingProduct/isLoadingAtom',
    default: false,
});

export const useCurrentConnectingProduct = () => {
    const {selectedProducts, finish} = useSelectProducts();
    const [currentConnectingProduct, setCurrentConnectingProduct] = useRecoilState(currentConnectingProductAtom);
    const setRequestId = useSetRecoilState(lastRequestedIdAtom);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);

    // load from storage
    useEffect(() => {
        const product = selectedProducts[0];

        if (!product) return;
        if (currentConnectingProduct) return;

        setCurrentProduct(product);
    }, []);

    function setCurrentProduct(product: ProductDto) {
        if (currentConnectingProduct?.id === product.id) return;
        setRequestId((id) => {
            if (id === product.id) return id;

            setTimeout(() => {
                setIsLoading(true);
                productApi
                    .show(product.id)
                    .then((res) => setCurrentConnectingProduct(res.data))
                    .finally(() => setIsLoading(false));
            }, 0);

            return product.id;
        });
    }

    function finishProduct(productId: number) {
        const nextProduct = getNextProduct(productId);
        finish(productId);
        if (nextProduct) setCurrentProduct(nextProduct);
        return nextProduct;
    }

    function getNextProduct(productId: number) {
        const index = selectedProducts.findIndex((p) => p.id === productId);
        const length = selectedProducts.length;

        if (length === 1 && index === 0) return undefined; // 최종 앱의 경우
        if (length <= index + 1) return selectedProducts[0]; // 아직 앞에 미등록한 앱이 남아있는 경우
        if (length > index + 1) return selectedProducts[index + 1]; // 다음 등록할 앱이 있는 경우
        return undefined;
    }

    return {
        isLoading,
        currentConnectingProduct,
        setCurrentConnectingProduct: setCurrentProduct,
        selectedProducts,
        finishProduct,
    };
};
