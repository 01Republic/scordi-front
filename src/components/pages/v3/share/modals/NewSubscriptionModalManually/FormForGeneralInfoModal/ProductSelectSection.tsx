import React, {memo} from 'react';
import {SelectProduct} from '^v3/share/modals/NewSubscriptionModalManually/FormForGeneralInfoModal/SelectProduct';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

interface ProductSelectSectionProps {
    afterChange: () => any;
}

export const ProductSelectSection = memo((props: ProductSelectSectionProps) => {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const {afterChange} = props;

    const onChange = (productId: number) => {
        setFormData((f) => ({...f, productId}));
        afterChange();
    };

    return <SelectProduct defaultValue={formData.productId} onChange={(product) => onChange(product.id)} labelHidden />;
});
ProductSelectSection.displayName = 'ProductSelectSection';
