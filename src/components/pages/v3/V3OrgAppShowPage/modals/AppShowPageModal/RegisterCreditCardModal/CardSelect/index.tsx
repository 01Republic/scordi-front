import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {CardSelector} from '^v3/share/Select/CardSelector';
import {updateCurrentSubscriptionState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';

type CardOption = {
    value: number;
    label: string;
    name: string | null | undefined;
};

export const CardSelect = memo(() => {
    const setFormData = useSetRecoilState(updateCurrentSubscriptionState);
    const {currentSubscription} = useCurrentSubscription();

    return (
        <CardSelector
            defaultValue={currentSubscription?.creditCard}
            onChange={(creditCardId: number) => {
                setFormData((prev) => ({...prev, creditCardId}));
            }}
        />
    );
});
