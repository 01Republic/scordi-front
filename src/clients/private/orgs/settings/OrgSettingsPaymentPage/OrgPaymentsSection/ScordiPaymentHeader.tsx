import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {ScordiPaymentItemUIType} from './ScordiPaymentItem';

interface ScordiPaymentHeaderProps {
    version?: ScordiPaymentItemUIType;
}

export const ScordiPaymentHeader = memo((props: ScordiPaymentHeaderProps) => {
    const {version = 'default'} = props;
    const {t} = useTranslation('workspaceSettings');

    if (version === 'notion') return <></>;

    return (
        <div className="p-4 grid grid-cols-4 items-center bg-slate-50 rounded-lg text-14 font-medium text-gray-500">
            <div className="">{t('payment.paymentInfo')}</div>

            <div className="">{t('payment.paymentDate')}</div>

            <div className="">{t('payment.paymentType')}</div>

            <div className="">{t('payment.paymentAmount')}</div>
        </div>
    );
});
ScordiPaymentHeader.displayName = 'ScordiPaymentHeader';

export const ScordiPaymentHeaderV2 = memo((props: ScordiPaymentHeaderProps) => {
    return (
        <div className="grid grid-cols-4 text-14">
            {/*결제 정보*/}
            <div></div>

            {/*결제일*/}
            <div></div>

            {/*결제 구분*/}
            <div></div>

            {/*결제 금액*/}
            <div></div>
        </div>
    );
});
