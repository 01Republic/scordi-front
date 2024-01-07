import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {CardSelector} from '^v3/share/Select/CardSelector';

export const CardSelect = memo(function CardSelect() {
    const setFormData = useSetRecoilState(newSubscriptionManualFormData);

    const onChange = (creditCardId: number) => {
        setFormData((prev) => ({...prev, creditCardId}));
    };

    return <CardSelector onChange={onChange} />;
});
