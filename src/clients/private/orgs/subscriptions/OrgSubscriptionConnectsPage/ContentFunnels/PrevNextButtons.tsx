import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {subscriptionApi} from '^models/Subscription/api';
import {selectedTeamMembersAtom} from './inputs/TeamMemberSelect/atom';
import {createSubscriptionFormData, currentStepAtom, finishedProductMapAtom} from './atom';
import {Steps} from './steps';
import {useCurrentConnectingProduct} from './useCurrentConnectingProduct';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useProductOnMainPage, useProductSearchResult} from '^models/Product/hook';

export const PrevNextButtons = memo(function PrevNextButtons() {
    const router = useRouter();
    const formData = useRecoilValue(createSubscriptionFormData);
    const clearFormData = useResetRecoilState(createSubscriptionFormData);
    const [teamMembers, setTeamMembers] = useRecoilState(selectedTeamMembersAtom);
    const [currentStep, setStep] = useRecoilState(currentStepAtom);
    const {finishProduct} = useCurrentConnectingProduct();
    const resetFinishedProductMap = useResetRecoilState(finishedProductMapAtom);
    const {reload: reloadProductsOnMain} = useProductOnMainPage();
    const {reload: reloadProductSearch} = useProductSearchResult();

    const prev = (i: number) => i - 1;
    const next = (i: number) => i + 1;

    const createSubscription = () => {
        console.log(formData);
        subscriptionApi.create(formData).then((res) => {
            const subscription = res.data;
            toast.success('구독이 등록되었어요!');
            setTeamMembers([]);
            clearFormData();
            const nextProduct = finishProduct(subscription.productId);

            if (nextProduct) {
                setStep(Steps.IsFreeTier);
            } else {
                return router.push(OrgMainPageRoute.path(subscription.organizationId)).then(async () => {
                    resetFinishedProductMap();
                    return Promise.allSettled([reloadProductsOnMain(), reloadProductSearch()]);
                });
            }
        });
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
                        !!formData.billingCycleType
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
                    nextButtonText={formData.creditCardId ? undefined : '건너뛰기'}
                />
            );
        case Steps.InvoiceAccount:
            // 청구서 수신 메일 설정
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => setStep(next)}
                    isValid={true}
                    nextButtonText={formData.invoiceAccountId ? undefined : '건너뛰기'}
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
                    nextButtonText={!formData.vendorCompanyId ? '건너뛰기' : undefined}
                />
            );
        case Steps.Memo:
            // 메모
            return (
                <StepButtons
                    onPrev={() => setStep(prev)}
                    onNext={() => createSubscription()}
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
