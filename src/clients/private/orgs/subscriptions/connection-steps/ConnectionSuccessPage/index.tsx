import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {errorToast} from '^api/api';
import {allFulfilled} from '^utils/array';
import {orgIdParamState} from '^atoms/common';
import {codefCardApi} from '^models/CodefCard/api';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto} from '^models/Subscription/types';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {subscriptionConnectedCodefCardsAtom} from '^models/Subscription/atom';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import LoadingScreen from '../common/LoadingScreen';
import {StatusHeader} from '../common/StatusHeader';
import {NextStepButton} from '../common/NextStepButton';
import {SuccessCreditCardSection} from './SuccessCreditCardSection';
import {ConnectionSubscriptionList} from './ConnectionSubscriptionList';

export const ConnectionSuccessPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const successCodefCards = useRecoilValue(subscriptionConnectedCodefCardsAtom);
    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);
    const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSyncCodefCard, setIsSyncCodefCard] = useState(false);

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
            .catch((error) => errorToast(error));
    };

    if (isLoading)
        return (
            <LoadingScreen
                onComplete={() => {
                    setIsLoading(false);
                    setIsSyncCodefCard(true);
                }}
            />
        );

    if (isSyncCodefCard) return <ConnectionSubscriptionList subscriptions={subscriptions} />;

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
                    onClick={() => router.back()}
                />
                {successCodefCards.length > 0 && (
                    <SuccessCreditCardSection
                        successCodefCards={successCodefCards}
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
