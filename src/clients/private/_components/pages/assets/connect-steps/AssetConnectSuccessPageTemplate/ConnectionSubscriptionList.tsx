import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {SubscriptionDto} from '^models/Subscription/types';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {NextStepButton} from '../common/NextStepButton';
import {StatusHeader} from '../common/StatusHeader';
import {SubscriptionItem} from './SubscriptionItem';

interface ConnectionSubscriptionListProps {
    subscriptions: SubscriptionDto[];
}

export const ConnectionSubscriptionList = memo((props: ConnectionSubscriptionListProps) => {
    const {subscriptions} = props;

    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <PureLayout>
            <div className="w-full flex flex-col gap-20">
                <StatusHeader
                    title={`총 ${subscriptions.length}개의 구독을 불러왔어요`}
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
                <ul className="grid grid-cols-4 gap-8 w-full">
                    {subscriptions.map((subscription) => {
                        const {product} = subscription;

                        return <SubscriptionItem key={subscription.id} title={product.name()} logo={product.image} />;
                    })}
                </ul>

                <section className="w-full flex items-center justify-center">
                    <NextStepButton
                        text="스코디 바로가기"
                        onClick={() => router.replace(OrgMainPageRoute.path(orgId))}
                    />
                </section>
            </div>
        </PureLayout>
    );
});
