import {memo, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {CardSelector} from 'src/components/pages/v3/share/Select/CardSelect';
import {updateCurrentSubscriptionState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';
import {SubscriptionDto} from '^models/Subscription/types';

type CardOption = {
    value: number;
    label: string;
    name: string | null | undefined;
};

export const CardSelect = memo(() => {
    const [formData, setFormData] = useRecoilState(updateCurrentSubscriptionState);
    const {currentSubscription} = useCurrentSubscription();

    useEffect(() => {
        setFormData((prev) => ({...prev, creditCardId: currentSubscription?.creditCardId}));
    }, []);

    const defaultValue = formData.creditCardId && currentSubscription ? currentSubscription.creditCard : undefined;

    return (
        <CardSelector
            defaultValue={defaultValue}
            onChange={(creditCardId: number | null) => {
                setFormData((prev) => ({...prev, creditCardId}));
            }}
        />
    );
});
