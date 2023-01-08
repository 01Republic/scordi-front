import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {UseFormReturn} from 'react-hook-form';
import {UpdateApplicationRequestDto} from '^types/application.type';
import {applicationIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {AppInfoPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {updateApplication} from '^api/application.api';
import {useSetRecoilState} from 'recoil';
import {getApplicationQuery} from '^atoms/applications.atom';
import {useRouter} from 'next/router';
import {errorNotify} from '^utils/toast-notify';
import {useApplication} from '^hooks/useApplications';

type ApplicationEditFormProps = {
    form: UseFormReturn<UpdateApplicationRequestDto, any>;
} & WithChildren;

export const ApplicationEditForm = memo((props: ApplicationEditFormProps) => {
    const {form, children} = props;
    const router = useRouter();
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const applicationId = useRouterIdParamState('appId', applicationIdParamState);
    const application = useApplication();
    const fetchApp = useSetRecoilState(getApplicationQuery);

    const onSubmit = (data: UpdateApplicationRequestDto) => {
        if (!organizationId || !applicationId) return;

        const redirectUrl = AppInfoPageRoute.path(organizationId, applicationId);
        updateApplication(applicationId, data)
            .then(({data: updatedApp}) => {
                fetchApp(updatedApp);
                router.replace(redirectUrl);
            })
            .catch(errorNotify);
    };

    useEffect(() => {
        if (!application) return;

        // displayName?: string; // 조직이름 (연동서비스 내에서)
        // paymentPlanId?: number; // 결제플랜 ID
        // billingCycleId?: number; // 결제주기 ID
        // isFreeTier?: boolean; // 프리티어 여부
        // registeredAt?: Date | string; // 사용시작일
        // paidMemberCount?: number; // 결제되는 사용자 수
        // usedMemberCount?: number; // 사용중인 사용자 수
        // connectStatus?: ConnectStatus; // 연동상태
        form.setValue('displayName', application.displayName); // 조직이름 (연동서비스 내에서)
        form.setValue('paymentPlanId', application.paymentPlanId); // 결제플랜 ID
        form.setValue('billingCycleId', application.billingCycleId); // 결제주기 ID
        form.setValue('isFreeTier', application.isFreeTier); // 프리티어 여부
        form.setValue('registeredAt', `${application.registeredAt}`.split('T')[0]); // 사용시작일
        form.setValue('paidMemberCount', application.paidMemberCount); // 결제되는 사용자 수
        form.setValue('usedMemberCount', application.usedMemberCount); // 사용중인 사용자 수
        // form.setValue('connectStatus', application.connectStatus); // 연동상태
    }, [application]);

    return <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>;
});
