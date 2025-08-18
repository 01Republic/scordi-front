import {ScopeButton} from '^clients/private/_components/rest-pages/ListPage/ScopeButton';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';

interface MemberStatusScopeHandlerProps {
    onSearch: (status: SubscriptionSeatStatus | null) => void;
}

export const MemberStatusScopeHandler = memo(function InviteStatusScopeHandler(props: MemberStatusScopeHandlerProps) {
    const {onSearch} = props;
    const [memberStatus, setMemberStatus] = useState<SubscriptionSeatStatus | null>(null);
    const {t} = useTranslation('subscription');

    const handleClick = (status: SubscriptionSeatStatus | null) => {
        setMemberStatus(status);
        onSearch(status);
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton active={memberStatus == null} onClick={() => handleClick(null)}>
                {t('scope.all')}
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.NONE}
                onClick={() => handleClick(SubscriptionSeatStatus.NONE)}
            >
                {t('scope.none')}
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.PAID}
                onClick={() => handleClick(SubscriptionSeatStatus.PAID)}
            >
                {t('scope.paid')}
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.FREE}
                onClick={() => handleClick(SubscriptionSeatStatus.FREE)}
            >
                {t('scope.free')}
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.QUIT}
                onClick={() => handleClick(SubscriptionSeatStatus.QUIT)}
            >
                {t('scope.quit')}
            </ScopeButton>
        </div>
    );
});
