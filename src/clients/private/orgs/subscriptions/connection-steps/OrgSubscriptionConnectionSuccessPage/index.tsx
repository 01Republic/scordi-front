import {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {allFulfilled} from '^utils/array';
import {codefCardApi} from '^models/CodefCard/api';
import {subscriptionApi} from '^models/Subscription/api';
import {errorToast} from '^api/api';
import {LoadingScreen} from '^_components/pages/assets/connect-steps/common/LoadingScreen';
import {ConnectionSubscriptionList} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectionSubscriptionList';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {SuccessCreditCardSection} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/SuccessCreditCardSection';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {subscriptionConnectedCodefCardsAtom} from '^models/CodefCard/atom';

// TODO: 스코디 카드 연동이 전부 실패된 경우, 자산 완료 페이지에 페이지 플래시만 뜨게 될 텐데 이를 어쩌나.
// TODO: 자산 연동 성공 실패 여부 전달.
//       자산 연동 요청에 allFulfilled 를 사용중. -> 요청실패를 취급 할 수 있나. -> 없지.
//       그러면 기획된 바 대로 실패된건 플래시를 띄워줄 수 있나 -> 없지.
//       => 이를 어쩌나.
export const OrgSubscriptionConnectionSuccessPage = memo(function OrgSubscriptionConnectionSuccessPage() {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const processedCodefCards = useRecoilValue(subscriptionConnectedCodefCardsAtom);
    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);
    const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSyncedCodefCard, setIsSyncedCodefCard] = useState(false);

    const onSync = async () => {
        setIsLoading(true);
        await allFulfilled(
            selectedCodefCards.map((codefCard) => {
                return codefCardApi.histories(orgId, codefCard.id, {sync: true}).then(() => {
                    return subscriptionApi.index({
                        relations: ['master'],
                        where: {creditCardId: codefCard.creditCardId},
                        order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
                    });
                });
            }),
        )
            .then((res) => {
                const connectionSubscriptions = res.flatMap((subscription) => subscription.data.items);
                setSubscriptions(connectionSubscriptions);
            })
            .catch(errorToast);
    };

    if (isLoading)
        return (
            <LoadingScreen
                message="선택한 자산을 기준으로 구독을 찾고 있어요"
                onClose={() => {
                    setIsLoading(false);
                    setIsSyncedCodefCard(true);
                }}
            />
        );

    if (isSyncedCodefCard) return <ConnectionSubscriptionList subscriptions={subscriptions} />;

    return (
        <PureLayout>
            <div className="flex flex-col gap-20">
                <StatusHeader
                    title="자산 연동이 완료되었어요"
                    icon={
                        <LottieNoSSR
                            src="https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie"
                            loop
                            autoplay
                            className="w-[82px] h-24"
                            layout={{fit: 'fill'}}
                        />
                    }
                    onBack={() => router.back()}
                />
                {processedCodefCards.length > 0 && (
                    <SuccessCreditCardSection
                        processedCodefCards={processedCodefCards}
                        selectedCodefCards={selectedCodefCards}
                        setSelectedCodefCards={setSelectedCodefCards}
                    />
                )}
                <div className="flex w-full justify-center">
                    <NextStepButton onClick={onSync} />
                </div>
            </div>
        </PureLayout>
    );
});
