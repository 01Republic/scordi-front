import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useForm} from 'react-hook-form';
import {UpdateBillingHistoryRequestDto} from '^types/billing.type';
import {BillingHistoryShowPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]';
import {updateBillingHistory} from '^api/billing.api';
import {errorNotify} from '^utils/toast-notify';
import {useRouter} from 'next/router';

type BillingHistoryEditFormProps = {} & WithChildren;

export const BillingHistoryEditForm = memo((props: BillingHistoryEditFormProps) => {
    const {children} = props;
    const form = useForm<UpdateBillingHistoryRequestDto>();
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const applicationId = Number(router.query.appId) || null;
    const billingHistoryId = Number(router.query.billingHistoryId) || null;

    const onSubmit = (data: UpdateBillingHistoryRequestDto) => {
        if (!organizationId || !applicationId || !billingHistoryId) return;

        const redirectUrl = BillingHistoryShowPageRoute.path(organizationId, applicationId, billingHistoryId);
        updateBillingHistory(billingHistoryId, data)
            .then(() => router.replace(redirectUrl))
            .catch(errorNotify);
    };

    return <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>;
});
