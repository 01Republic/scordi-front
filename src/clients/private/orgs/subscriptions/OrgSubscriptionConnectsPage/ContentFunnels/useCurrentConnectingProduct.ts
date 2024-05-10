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
    const {selectedProducts} = useSelectProducts();
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

    return {
        isLoading,
        currentConnectingProduct,
        setCurrentConnectingProduct: setCurrentProduct,
        selectedProducts,
    };
};
