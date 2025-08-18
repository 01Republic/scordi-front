import {BillingHistoryDto, BillingHistoryStatus} from '^models/BillingHistory/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface BillingHistoryStatusTagUIProps {
    billingHistory: BillingHistoryDto;
}

export const BillingHistoryStatusTagUI = memo((props: BillingHistoryStatusTagUIProps) => {
    const {billingHistory} = props;
    const {t} = useTranslation('subscription');
    const about = billingHistory.about;

    switch (about) {
        case BillingHistoryStatus.PayWait:
            return <TagUI className={`bg-green-100`}>{t('detail.billingStatus.payWait')}</TagUI>;
        case BillingHistoryStatus.PaySuccess:
            return <TagUI className={`bg-green-200`}>{t('detail.billingStatus.paySuccess')}</TagUI>;
        case BillingHistoryStatus.PayFail:
            return <TagUI className={`bg-red-400 text-white`}>{t('detail.billingStatus.payFail')}</TagUI>;
        case BillingHistoryStatus.Warning:
        case BillingHistoryStatus.Info:
            return <TagUI className={`bg-blue-200`}>{t('detail.billingStatus.info')}</TagUI>;
        case BillingHistoryStatus.Unknown:
        default:
            return <TagUI className={`bg-gray-200`}>{t('detail.billingStatus.unknown')}</TagUI>;
    }

    // if (billingHistory.paidAt) return <TagUI className={`bg-green-200`}>결제됨</TagUI>;
    // return <TagUI className={`bg-red-400 text-white`}>실패</TagUI>;
    // return <TagUI className={`bg-red-200`}>실패</TagUI>;
    // return <TagUI className={`bg-gray-200`}>예정</TagUI>;
});
BillingHistoryStatusTagUI.displayName = 'BillingHistoryStatusTagUI';
