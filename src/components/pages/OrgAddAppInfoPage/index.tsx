import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {IoArrowBack} from '@react-icons/all-files/io5/IoArrowBack';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {errorNotify} from '^utils/toast-notify';
import {Page} from '^types/page';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {CreateApplicationRequestDto} from '^types/application.type';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {getApplications} from '^api/application.api';
import {getApplicationPrototype} from '^api/applicationPrototype.api';
import {ContentLayout} from '^layouts/ContentLayout';
import {ContentForm} from '^layouts/ContentLayout/ContentForm';
import {ContentHeading, ContentHeadingSecondaryButton} from '^layouts/ContentLayout/ContentHeading';
import {PreLoader} from '^components/PreLoader';
import {ConnectAppProgressModal} from '^components/pages/OrgAddAppInfoPage/ConnectAppProgressModal';
import {ConnectProfile} from '^components/pages/OrgAddAppInfoPage/ConnectProfile';
import {ConnectPanelV1} from '^components/pages/OrgAddAppInfoPage/ConnectPanelV1';
import {ConnectPanelV2} from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2';
import OrgMobileLayout from '^layouts/org/mobileLayout';

export const OrgAddAppInfoPage: Page = () => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const prototypeId = Number(router.query.appId);
    const [progressModalOpen, setProgressModalOpen] = useState<boolean>(false);
    const {currentOrg} = useCurrentOrg(organizationId);
    const [protoApp, setProtoApp] = useState<ApplicationPrototypeDto | null>(null);
    const [selectedPlanId, setSelectedPlanId] = useState<number>(0);
    const form = useForm<CreateApplicationRequestDto>({
        defaultValues: {
            // billingCycle: BillingCycle.undef,
            // registeredAt: (new Date()).toISOString().split('T')[0],
        },
    });

    // 현재 페이지는 일회적으로 허용된 Form 전송을 위한 공간입니다.
    // 폼이 정상적으로 전송되고난 후 페이지는 만료되어야 하므로, push 대신 replace 로 화면을 전환합니다.
    // 그러면 사용자가 다시 뒤로 돌아오는 행동을 했을 때 이 페이지로 오지 않고 더 이전 페이지(여기서는 앱선택 페이지)로 되돌아가게 됩니다.
    const redirectNext = useCallback(() => {
        router.replace(OrgAppsIndexPageRoute.path(organizationId));
    }, [organizationId]);

    const selectedPlan = useMemo(() => {
        if (protoApp) {
            const plan = protoApp.paymentPlans.find((plan) => plan.id === selectedPlanId);
            return plan || protoApp.paymentPlans[0];
        }
    }, [protoApp, selectedPlanId]);

    useEffect(() => {
        if (prototypeId) {
            // 굳이굳이 주소를 치고 이 페이지로 진입하는 경우에도, 이미 추가한 앱의 경우 튕겨내도록 합니다.
            const where = {organizationId, prototypeId};
            getApplications({itemsPerPage: 999, where})
                .then(({data}) => {
                    if (data.items[0]) {
                        alert('이미 추가된 앱입니다.');
                        redirectNext();
                    }
                })
                .catch(errorNotify);

            getApplicationPrototype(prototypeId)
                .then(({data: proto}) => {
                    setProtoApp(proto);
                    form.setValue('paymentPlanId', proto.paymentPlans[0].id);
                    form.setValue('billingCycleId', proto.billingCycles[0].id);
                    setSelectedPlanId(proto.paymentPlans[0].id);
                })
                .catch(errorNotify);
        }
    }, [prototypeId]);

    if (!currentOrg || !protoApp) {
        return <PreLoader />;
    }

    const onSubmitHandler = () => {
        form.setValue('organizationId', organizationId);
        form.setValue('prototypeId', protoApp.id);
        const values = form.getValues();
        // createApplication(values)
        //   .then(() => {
        //     toast('Successfully Saved');
        //     toast('Then, Oauth2 Popup');
        //     toast('Then, Pending & Welcome Alert');
        //     toast('Then, confirm -> redirect page');
        //     setTimeout(() => {
        //       redirectNext();
        //     }, 3000);
        //   })
        //   .catch(errorNotify);
        console.log(values);
        setProgressModalOpen(true);
    };

    return (
        <OrgMobileLayout>
            <ConnectAppProgressModal
                isOpen={progressModalOpen}
                setIsOpen={setProgressModalOpen}
                organizationId={organizationId}
                organization={currentOrg}
                prototypeId={prototypeId}
                protoApp={protoApp}
            />
            <ContentLayout>
                <ContentHeading title={protoApp.name}>
                    <div>
                        <ContentHeadingSecondaryButton className="gap-2" onClick={() => router.back()}>
                            <IoArrowBack /> Back
                        </ContentHeadingSecondaryButton>
                    </div>
                </ContentHeading>

                {/*<ContentForm submitBtnHidden={true} onSubmit={form.handleSubmit(onSubmitHandler)}>*/}
                <div className="bs-row mx-0 gap-8">
                    <div className="h-fit sticky top-[100px]">
                        <ConnectProfile protoApp={protoApp} />
                    </div>

                    <div className="bs-col px-0">
                        {/*<ConnectPanelV1*/}
                        {/*  form={form}*/}
                        {/*  protoApp={protoApp}*/}
                        {/*  selectedPlan={selectedPlan!}*/}
                        {/*  setSelectedPlanId={setSelectedPlanId}*/}
                        {/*/>*/}

                        <ConnectPanelV2
                            protoApp={protoApp}
                            selectedPlan={selectedPlan!}
                            setSelectedPlanId={setSelectedPlanId}
                        />
                    </div>
                </div>
                {/*</ContentForm>*/}
            </ContentLayout>
        </OrgMobileLayout>
    );
};
