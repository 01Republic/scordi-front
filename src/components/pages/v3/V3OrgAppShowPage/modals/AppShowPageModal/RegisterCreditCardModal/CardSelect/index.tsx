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
    const {result} = useCreditCards();
    const setFormData = useSetRecoilState(updateCurrentSubscriptionState);
    const {currentSubscription} = useCurrentSubscription();

    const toOption = (card: CreditCardDto): CardOption => {
        const value = card.id;
        const label = card.fullNumber;
        const name = card.name;

        return {value, label, name};
    };

    const onChange = (e: number) => {
        const cardId = e;

        setFormData((prev) => ({...prev, creditCardId: cardId}));
    };

    const defaultValue = currentSubscription?.creditCard && toOption(currentSubscription?.creditCard);

    return (
        <CardSelector defaultValue={defaultValue} options={result.items.map(toOption)} onChange={(e) => onChange(e)} />
    );
});
