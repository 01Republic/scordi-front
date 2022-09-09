import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import { PageRoute } from '^types/pageRoute.type';
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { ContentLayout } from '^layouts/ContentLayout';
import { ContentHeading, ContentHeadingSecondaryButton } from '^layouts/ContentLayout/ContentHeading';
import { ContentPanel, ContentPanelInput, ContentPanelList } from '^layouts/ContentLayout/ContentPanel';
import { useRouter } from 'next/router';
import { ApplicationPrototypeDto } from '^types/applicationPrototype.type';
import { getApplicationPrototype } from '^api/applicationPrototype.api';
import { errorNotify } from '^utils/toast-notify';
import { PreLoader } from '^components/PreLoader';
import { useForm } from 'react-hook-form';
import { ApplicationDto, CreateApplicationRequestDto } from '^types/application.type';
import { ContentForm } from '^layouts/ContentLayout/ContentForm';
import { SwitchCheckbox } from '^components/SwitchCheckbox';
import { IoFlash } from '@react-icons/all-files/io5/IoFlash';
import { RadioSetInput } from '^components/RadioSetInput';
import { TextInput } from '^components/TextInput';
import { createApplication, getApplications } from '^api/application.api';
import { toast } from 'react-toastify';
import { OrgAppsIndexPageRoute } from '^pages/orgs/[id]/apps';
import { t_BillingCycleTerm } from '^types/applicationBillingCycle.type';

export const OrgAddAppInfoPageRoute: PageRoute = {
  pathname: '/orgs/[id]/apps/new/[appId]/information',
  path: (orgId: number, appId: number) =>
    OrgAddAppInfoPageRoute.pathname
      .replace('[id]', String(orgId))
      .replace('[appId]', String(appId)),
}

export default function OrgAddAppInfoPage() {
  const router = useRouter();
  const organizationId = Number(router.query.id);
  const prototypeId = Number(router.query.appId);
  const [protoApp, setProtoApp] = useState<ApplicationPrototypeDto | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number>(0);
  const form = useForm<CreateApplicationRequestDto>({
    defaultValues: {
      // billingCycle: BillingCycle.undef,
      // registeredAt: (new Date()).toISOString().split('T')[0],
    }
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
      const where = { organizationId, prototypeId };
      getApplications({ itemsPerPage: 999, where })
        .then(({ data }) => {
          if (data.items[0]) {
            alert('이미 추가된 앱입니다.');
            redirectNext();
          }
        })
        .catch(errorNotify);

      getApplicationPrototype(prototypeId)
        .then(({ data: proto }) => {
          setProtoApp(proto);
          form.setValue('paymentPlanId', proto.paymentPlans[0].id);
          form.setValue('billingCycleId', proto.billingCycles[0].id);
          setSelectedPlanId(proto.paymentPlans[0].id);
        })
        .catch(errorNotify);
    }
  }, [prototypeId]);

  if (!protoApp) {
    return <PreLoader />;
  }

  const onSubmitHandler = () => {
    form.setValue('organizationId', organizationId);
    form.setValue('prototypeId', protoApp.id);
    const values = form.getValues();
    createApplication(values)
      .then(() => {
        toast('Successfully Saved');
        toast('Then, Oauth2 Popup');
        toast('Then, Pending & Welcome Alert');
        toast('Then, confirm -> redirect page');
        setTimeout(() => {
          redirectNext();
        }, 3000);
      })
      .catch(errorNotify);
  };

  return (
    <ContentLayout>
      <ContentHeading title={protoApp.name}>
        <div>
          <ContentHeadingSecondaryButton className="gap-2" onClick={() => router.back()}>
            <IoArrowBack /> Back
          </ContentHeadingSecondaryButton>
        </div>
      </ContentHeading>

      <ContentForm submitBtnHidden={true} onSubmit={(e) => {
        form.handleSubmit(onSubmitHandler)(e);
      }}>
        <div className="bs-row mx-0 gap-8">
          <div className="h-fit sticky top-[100px]">
            <div className="flex flex-col gap-4">
              <img src={protoApp.image} alt={`${protoApp.name} Logo`} width={210} height={210} className="bg-white rounded-xl p-3" />
              <button className="btn btn-secondary btn-block text-lg gap-2">
                <IoFlash /> Connect App
              </button>
            </div>
          </div>

          <div className="bs-col px-0">
            {/*<h3 className="text-lg text-gray-500 mb-5">Put more information ...</h3>*/}

            <ContentPanel title="Set more details ...">
              <ContentPanelList>
                <ContentPanelInput
                  title="프리티어 여부"
                  text="현재 이 서비스를 무료로 사용하고 계신가요?"
                  required={true}
                >
                  <SwitchCheckbox {...form.register('isFreeTier')} />
                </ContentPanelInput>

                <ContentPanelInput
                  title="결제플랜"
                  text="어느 플랜으로 이용중이세요? <br>잘 모르겠다면 <b>Team</b> 을 선택해주세요! <br>(안심하세요, 잘못 입력했더라도 연동이 완료되면 자동으로 올바른 값으로 고쳐드려요!)"
                  required={true}
                >
                  <RadioSetInput
                    options={protoApp.paymentPlans.map((plan) => [plan.name, plan.id])}
                    {...form.register('paymentPlanId', { required: true })}
                    defaultValue={form.getValues('paymentPlanId')}
                    onChange={(e) => {
                      const paymentPlanId = Number(e.target.value);
                      const plan = protoApp.paymentPlans.find(({ id }) => id === paymentPlanId)!;
                      form.setValue('paymentPlanId', paymentPlanId);
                      form.setValue('billingCycleId', plan.billingCycles[0].id);
                      setSelectedPlanId(paymentPlanId);
                    }}
                  />
                </ContentPanelInput>

                <ContentPanelInput
                  title="결제주기"
                  text="해당하는 결제주기를 선택해주세요."
                  required={true}
                >
                  <RadioSetInput
                    options={selectedPlan!.billingCycles.map((cycle) => [t_BillingCycleTerm(cycle.term), cycle.id]) || [['발행되지 않음', 0]]}
                    {...form.register('billingCycleId', { required: true })}
                    defaultValue={form.getValues('billingCycleId')}
                    onChange={(e) => form.setValue('billingCycleId', Number(e.target.value))}
                  />
                </ContentPanelInput>

                <ContentPanelInput
                  title="사용 시작일"
                  text="서비스를 언제부터 사용하셨나요?"
                  required={true}
                >
                  <TextInput
                    type="date"
                    {...form.register('registeredAt', { required: true })}
                    defaultValue={form.getValues('registeredAt') as string}
                  />
                </ContentPanelInput>
              </ContentPanelList>
            </ContentPanel>

          </div>
        </div>
      </ContentForm>
    </ContentLayout>
  )
}

OrgAddAppInfoPage.getLayout = getOrgMainLayout;
