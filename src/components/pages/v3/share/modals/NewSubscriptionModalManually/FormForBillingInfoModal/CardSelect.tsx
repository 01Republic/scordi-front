import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {CardSelector} from 'src/components/pages/v3/share/Select/CardSelect';

export const CardSelect = memo(function CardSelect() {
    const setFormData = useSetRecoilState(newSubscriptionManualFormData);

    const onChange = (creditCardId: number | null) => {
        setFormData((prev) => ({...prev, creditCardId}));
    };

    return <CardSelector onChange={(e) => onChange(e)} />;
});
