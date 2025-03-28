import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {subscriptionApi} from '^models/Subscription/api';
import {selectedTeamMembersAtom} from './inputs/TeamMemberSelect/atom';
import {
    createSubscriptionForInvoiceAccountFormData,
    createSubscriptionFormData,
    currentStepAtom,
    finishedProductMapAtom,
} from './atom';
import {Steps} from './steps';
import {useCurrentConnectingProduct} from './useCurrentConnectingProduct';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useWorkspaceSubscriptionCount} from '^models/Subscription/hook';
import {useOrgIdParam} from '^atoms/common';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {errorToast} from '^api/api';

export const PrevNextButtons = memo(function PrevNextButtons() {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const formData = useRecoilValue(createSubscriptionFormData);
    const clearFormData = useResetRecoilState(createSubscriptionFormData);
    const [teamMembers, setTeamMembers] = useRecoilState(selectedTeamMembersAtom);
    const [currentStep, setStep] = useRecoilState(currentStepAtom);
    const [invoiceAccountData, setInvoiceAccountData] = useRecoilState(createSubscriptionForInvoiceAccountFormData);
    const {currentConnectingProduct, finishProduct} = useCurrentConnectingProduct();
    const resetFinishedProductMap = useResetRecoilState(finishedProductMapAtom);
    const {refetch} = useWorkspaceSubscriptionCount(orgId);

    const prev = (i: number) => i - 1;
    const next = (i: number) => i + 1;

    const createSubscription = () => {
        const {invoiceAccountIds = []} = invoiceAccountData;
        const redirect = (orgId: number) => router.push(OrgMainPageRoute.path(orgId));

        return subscriptionApi
            .create(formData)
            .then((res) => res.data)
            .then(async (subscription) => {
                const api = invoiceAccountApi.subscriptionsApi;
                const requests = invoiceAccountIds.map((id) => api.create(id, subscription.id)); // 여러 연결생성 요청을
                await Promise.allSettled(requests); // 병렬 처리
                return subscription;
            })
            .then((subscription) => {
                toast.success(`${currentConnectingProduct?.nameKo} 구독을 등록했어요.`);

                // 폼 상태 초기화
                setInvoiceAccountData({
                    invoiceAccounts: [],
                    invoiceAccountIds: [],
                });
                setTeamMembers([]);
                clearFormData();

                // 다음 등록할 앱이 있는지 확인하여
                const nextProduct = finishProduct(subscription.productId);

                return nextProduct
                    ? setStep(Steps.IsFreeTier) // 있으면 첫 스텝으로
                    : redirect(subscription.organizationId).then(() => resetFinishedProductMap()); // 없으면 조직 홈으로
            })
            .catch(errorToast);
    };

    switch (currentStep) {
        case Steps.IsFreeTier:
            // 유/무료 선택
            return (
                <StepButtons
                    onNext={() => {
                        setStep(formData.isFreeTier ? Steps.TeamMembers : Steps.RecurringCycle);
                    }}
                    isValid={typeof formData.isFreeTier === 'boolean'}
                />
            );
        case Steps.RecurringCycle:
            // 결제주기 선택
            return (
                <StepButtons
                    onPrev={() => setStep(Steps.IsFreeTier)}
                    onNext={() => setStep(next)}
                    isValid={typeof formData.billingCycleType !== 'undefined'}
                />
            );
        case Steps.SubscriptionInfo:
            // 구독정보 입력
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => setStep(next)}
                    isValid={
                        !!formData.currentBillingAmount?.amount &&
                        !!formData.currentBillingAmount?.currency &&
                        !!formData.billingCycleType &&
                        !!formData.lastPaidAt
                    }
                />
            );
        case Steps.PaymentMethod:
            // 결제수단 설정
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => setStep(next)}
                    isValid={true}
                    nextButtonText={formData.creditCardId || formData.bankAccountId ? undefined : '건너뛰기'}
                />
            );
        case Steps.InvoiceAccount:
            // 청구서 수신 메일 설정
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => setStep(next)}
                    isValid={true}
                    nextButtonText={invoiceAccountData.invoiceAccountIds.length === 0 ? '건너뛰기' : undefined}
                />
            );
        case Steps.TeamMembers:
            // 이용중인 멤버
            return (
                <StepButtons
                    onPrev={() => {
                        setStep((i) => {
                            return formData.isFreeTier ? Steps.IsFreeTier : prev(i);
                        });
                    }}
                    onNext={() => setStep(next)}
                    isValid={true}
                    nextButtonText={teamMembers.length == 0 ? '건너뛰기' : undefined}
                />
            );
        case Steps.Master:
            // 담당자
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => setStep(next)}
                    isValid={true}
                    nextButtonText={!formData.masterId ? '건너뛰기' : undefined}
                />
            );
        case Steps.PartnerCompany:
            // 파트너사
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => setStep(next)}
                    isValid={true}
                    nextButtonText={!formData.vendorContract?.vendorCompanyId ? '건너뛰기' : undefined}
                />
            );
        case Steps.Memo:
            // 메모
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => {
                        createSubscription().then(() => refetch());
                    }}
                    isValid={true}
                    nextButtonText="등록 완료"
                />
            );
        default:
            return <></>;
    }
});

interface Props {
    onPrev?: () => any;
    onNext?: () => any;
    isValid?: boolean;
    prevButtonText?: string;
    nextButtonText?: string;
}

const StepButtons = memo((props: Props) => {
    const {onPrev, onNext, isValid = false, prevButtonText = '이전', nextButtonText = '다음'} = props;

    return (
        <div className="sticky inset-x-0 bottom-0 border-t bg-white">
            <div className="container max-w-5xl mx-auto flex items-center justify-between py-2 px-8">
                {onPrev ? (
                    <button className="btn w-40 text-16" onClick={onPrev}>
                        {prevButtonText}
                    </button>
                ) : (
                    <div />
                )}
                {onNext && (
                    <button
                        className={`btn w-40 text-16 btn-scordi ${
                            isValid ? '' : 'btn-disabled !bg-scordi !text-white opacity-30'
                        }`}
                        onClick={() => isValid && onNext()}
                    >
                        {nextButtonText}
                    </button>
                )}
            </div>
        </div>
    );
});
