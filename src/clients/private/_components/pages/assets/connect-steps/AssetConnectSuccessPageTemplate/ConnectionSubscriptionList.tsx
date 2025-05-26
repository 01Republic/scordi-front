import {memo, useEffect, useState} from 'react';
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
import {EmptyTable} from '^_components/table/EmptyTable';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';

interface ConnectionSubscriptionListProps {
    onSync: () => Promise<SubscriptionDto[]>;
}

export const ConnectionSubscriptionList = memo((props: ConnectionSubscriptionListProps) => {
    const {onSync} = props;

    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onSync()
            .then(setSubscriptions)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

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
                    onMove={() => router.push(OrgSubscriptionConnectionPageRoute.path(orgId))}
                />
                {subscriptions.length === 0 ? (
                    <EmptyTable message="불러온 구독이 없어요" />
                ) : (
                    <ul className="grid grid-cols-4 gap-8 w-full">
                        {subscriptions.map((subscription) => {
                            const {product} = subscription;

                            return (
                                <SubscriptionItem key={subscription.id} title={product.name()} logo={product.image} />
                            );
                        })}
                    </ul>
                )}

                <section className="w-full flex items-center justify-center">
                    <NextStepButton text="완료" onClick={() => router.replace(OrgMainPageRoute.path(orgId))} />
                </section>
            </div>
        </PureLayout>
    );
});
