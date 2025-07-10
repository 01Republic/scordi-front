import {errorToast} from '^api/api';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {alert2, confirm2, confirmed} from '^components/util/dialog';
import {ChannelTalk_Url} from '^config/constants';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {dayBefore, yyyy_mm_dd} from '^utils/dateTime';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';

interface UnsubscribeButtonProps {
    scordiSubscription: ScordiSubscriptionDto;
    onSuccess?: () => any;
}

export const UnsubscribeButton = memo((props: UnsubscribeButtonProps) => {
    const {scordiSubscription, onSuccess} = props;
    const {t} = useTranslation('workspaceSettings');
    const [isLoading, setIsLoading] = useState(false);
    const orgId = scordiSubscription.organizationId;
    const nextDate = scordiSubscription.getNextDate();

    const onClick = async () => {
        // 노트. 1) 해지하려는 구독이, "해지" 가능한 플랜인 것인지 검사해야 함. 그리고 만약 해지 불가능한 플랜이면 다른 얼럿을 띄워줘야 함.
        if (!nextDate) return alert2(t('payment.cannotUnsubscribe') ?? '');

        const cancelConfirm = () => {
            return confirm2(
                t('payment.reallyUnsubscribe') || '',
                <div className="bg-red-50 px-4 py-3 rounded-lg">
                    <h4 className="text-16 mb-2">{t('payment.dontWorry')} 👋</h4>

                    <div className="text-14">
                        <div>{t('payment.canUseRemainingPeriod')}</div>
                        <div className="text-center py-6 font-semibold">
                            {yyyy_mm_dd(dayBefore(1, nextDate), '. ')} {t('payment.until')}
                        </div>
                        <div>{t('payment.noRenewalFromNextPayment')}</div>
                    </div>
                </div>,
                undefined,
                {confirmButtonText: t('payment.unsubscribe') || '', cancelButtonText: t('payment.goBack') || ''},
            );
        };

        confirmed(cancelConfirm())
            .then(() => setIsLoading(true))
            .then(() => scordiSubscriptionApi.cancel(orgId))
            .then(() => toast.success(t('payment.unsubscribed')))
            .then(() => onSuccess && onSuccess())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    const onClickPreRelease = async () => {
        const {isConfirmed} = await confirm2(
            t('payment.unsubscribeSubscription') || '',
            <p>
                {t('payment.unsubscribeHelp')}
                <br />
                {t('payment.clickConnectButton')}
            </p>,
            undefined,
            {confirmButtonText: t('payment.connect') || '', cancelButtonText: t('payment.goBack') || ''},
        );

        if (!isConfirmed) return;

        if (typeof window !== 'undefined') window.open(ChannelTalk_Url, '_blank');
    };

    return (
        <MoreDropdown.ItemButton className="!text-error bg-error/5" onClick={onClickPreRelease}>
            <span>{t('payment.unsubscribeSubscription')}</span>
        </MoreDropdown.ItemButton>
    );
});
UnsubscribeButton.displayName = 'UnsubscribeButton';
