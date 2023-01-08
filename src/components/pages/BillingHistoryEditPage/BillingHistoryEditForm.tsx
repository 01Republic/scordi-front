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

        form.setValue('paidAmount', billingHistory.paidAmount);
        form.setValue('paidAt', `${billingHistory.paidAt}`.split('T')[0]);
        form.setValue('isSuccess', billingHistory.isSuccess);
    }, [billingHistory]);

    return <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>;
});
