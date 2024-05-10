import {useEffect} from 'react';
import {plainToInstance} from 'class-transformer';
import {useLocalStorageState} from '^atoms/localStorage.atom';
import {ProductDto} from '^models/Product/type';
import {createSubscriptionFormListAtom} from '^models/Subscription/atom';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {useCurrentConnectingProduct} from './useCurrentConnectingProduct';
import {useForm} from 'react-hook-form';

const findOrCreateForm = (formList: CreateSubscriptionRequestDto[], productId: number) => {
    return (
        formList.find((f) => f.productId === productId) || plainToInstance(CreateSubscriptionRequestDto, {productId})
    );
};

export function useCreateSubscriptionFormList() {
    const {selectedProducts, currentConnectingProduct} = useCurrentConnectingProduct();
    const [formList, setFormList] = useLocalStorageState(createSubscriptionFormListAtom, CreateSubscriptionRequestDto);
    const form = useForm<CreateSubscriptionRequestDto>();

    useEffect(() => {
        syncSelectedProductsToForm(selectedProducts);
    }, [selectedProducts]);

    function syncSelectedProductsToForm(products: ProductDto[]) {
        setFormList((forms) => {
            return products.map((product) => findOrCreateForm(forms, product.id));
        });
    }

    const currentForm = (() => {
        const formData = formList.find((f) => {
            return f.productId === currentConnectingProduct?.id;
        });
        if (!formData) return;

        form.setValue('currentBillingAmount', formData.currentBillingAmount);

        return form;
    })();

    const setCurrentForm = (formData: Partial<CreateSubscriptionRequestDto>) => {
        //
    };

    return {
        formList,
        setFormList,
        currentForm,
    };
}
