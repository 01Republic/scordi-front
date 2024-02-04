import {memo, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {updateCurrentSubscriptionState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {CardSelector} from 'src/components/pages/v3/share/Select/CardSelect';

export const CardSelect = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const setFormData = useSetRecoilState(updateCurrentSubscriptionState);

    useEffect(() => {
        setFormData((prev) => ({...prev, creditCardId: currentSubscription?.creditCardId}));
    }, []);

    const defaultValue = currentSubscription ? currentSubscription.creditCard : undefined;

    return (
        <CardSelector
            defaultValue={defaultValue}
            onChange={(creditCardId: number | null) => {
                setFormData((prev) => ({...prev, creditCardId}));
            }}
        />
    );
});
