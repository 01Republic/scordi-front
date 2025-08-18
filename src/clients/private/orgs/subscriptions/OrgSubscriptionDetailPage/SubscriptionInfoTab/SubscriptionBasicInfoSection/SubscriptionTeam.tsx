import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import SubscriptionTeamList from './SubscriptionTeamList';

export const SubscriptionTeam = memo(() => {
    const {t} = useTranslation('subscription');

    return (
        <FormControl label={t('detail.basicInfo.teamsInUse')} className="!items-start">
            <SubscriptionTeamList />
        </FormControl>
    );
});
