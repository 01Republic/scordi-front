import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {useForm, UseFormReturn} from 'react-hook-form';
import {UpdateBillingHistoryRequestDto} from '^types/billing.type';
import {BillingHistoryShowPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]';
import {updateBillingHistory} from '^api/billing.api';
import {errorNotify} from '^utils/toast-notify';
import {useRouter} from 'next/router';
import {billingHistoryIdParamState, useRouterIdParamState} from '^atoms/common';
import {useSetRecoilState} from 'recoil';
import {getBillingHistoryQuery} from '^atoms/billingHistories.atom';
import {useBillingHistory} from '^hooks/useBillingHistories';
import {CreateMoneyRequestDto, Currency, CurrencyList} from '^types/money.type';

type BillingHistoryEditFormProps = {
    form: UseFormReturn<UpdateBillingHistoryRequestDto, any>;
} & WithChildren;

export const BillingHistoryEditForm = memo((props: BillingHistoryEditFormProps) => {
    const {form, children} = props;
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const applicationId = Number(router.query.appId) || null;
    const billingHistoryId = useRouterIdParamState('billingHistoryId', billingHistoryIdParamState);
    const billingHistory = useBillingHistory();
    const fetchBillingHistory = useSetRecoilState(getBillingHistoryQuery);

    const onSubmit = (data: UpdateBillingHistoryRequestDto) => {
        if (!organizationId || !applicationId || !billingHistoryId) return;

        const redirectUrl = BillingHistoryShowPageRoute.path(organizationId, applicationId, billingHistoryId);
        updateBillingHistory(billingHistoryId, data)
            .then(({data: updatedHistory}) => {
                fetchBillingHistory(updatedHistory);
                router.replace(redirectUrl);
            })
            .catch(errorNotify);
    };

    useEffect(() => {
        if (!billingHistory) return;

        const payAmount = billingHistory.payAmount;
        form.setValue('payAmount', {
            text: payAmount?.text || '',
            amount: payAmount?.amount || 0, // 금액
            code: payAmount?.code || Currency.KRW, // 화폐 코드
            exchangeRate: payAmount?.exchangeRate || CurrencyList.ko.exchangeRate, // 달러 대비 환율
        });
        form.setValue('paidAt', `${billingHistory.paidAt}`.split('T')[0]);
    }, [billingHistory]);

    return <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>;
});
