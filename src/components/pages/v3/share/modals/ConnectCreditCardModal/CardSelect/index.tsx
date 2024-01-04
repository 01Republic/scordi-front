import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {CardSelector} from '^v3/share/Select/CardSelector';
import {updateCurrentSubscriptionState} from '^v3/V3OrgAppShowPage/atom';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';

export const CardSelect = memo(() => {
    const {result} = useCreditCards();
    const setFormData = useSetRecoilState(updateCurrentSubscriptionState);

    const toOption = (card: CreditCardDto) => {
        const value = card.id;
        const label = card.fullNumber;
        const name = card.name;

        return {value, label, name};
    };

    const onChange = (e: number) => {
        const cardId = e;

        setFormData((prev) => ({...prev, creditCardId: cardId}));
    };

    return <CardSelector options={result.items.map(toOption)} onChange={(e) => onChange(e)} />;
});
