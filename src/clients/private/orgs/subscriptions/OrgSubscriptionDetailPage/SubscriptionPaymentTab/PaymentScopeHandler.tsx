import {ScopeButton} from '^clients/private/_components/rest-pages/ListPage/ScopeButton';
import {FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';

interface Props {
    onSearch: (query: FindAllBillingHistoriesQueryDto) => any;
}

export const PaymentScopeHandler = memo(function (props: Props) {
    const {onSearch} = props;
    const {t} = useTranslation('subscription');
    const [selected, setSelected] = useState<number>(0);

    const getBillingHistories = (where: FindAllBillingHistoriesQueryDto['where'] | null) => {
        onSearch({
            where: {
                ...where,
            },
            order: {paidAt: 'DESC'},
        });
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton
                active={selected === 0}
                onClick={() => {
                    setSelected(0);
                    getBillingHistories(null);
                }}
            >
                {t('detail.paymentStatus.all')}
            </ScopeButton>
            <ScopeButton
                active={selected === 1}
                onClick={() => {
                    setSelected(1);
                    getBillingHistories({paidAt: {op: 'not', val: 'NULL'}});
                }}
            >
                {t('detail.paymentStatus.paid')}
            </ScopeButton>
            <ScopeButton
                active={selected === 2}
                onClick={() => {
                    setSelected(2);
                    getBillingHistories({paidAt: 'NULL'});
                }}
            >
                {t('detail.paymentStatus.failed')}
            </ScopeButton>
        </div>
    );
});
