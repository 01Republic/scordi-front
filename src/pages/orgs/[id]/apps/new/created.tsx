import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {PreLoader} from '^components/PreLoader';
import {ProductDto, safeImageSrc} from '^types/product.type';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import {ImageV2} from '^components/v2/ui/Image';
import {useSetRecoilState} from 'recoil';
import {subscriptionIdParamState} from '^atoms/common';
import OrgMobileLayout from '^layouts/org/mobileLayout';

export const NewAppCreatedPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/new/created',
    path: (orgId: number, applicationId: number) =>
        pathReplace(`${NewAppCreatedPageRoute.pathname}?applicationId=[applicationId]`, {
            id: orgId,
            applicationId,
        }),
});

export default function NewAppCreatedPage() {
    const router = useRouter();
    const subscriptionId = Number(router.query.applicationId);
    const {currentSubscription: subscription} = useCurrentSubscription();
    const setSubscriptionIdParam = useSetRecoilState(subscriptionIdParamState);

    useEffect(() => {
        setSubscriptionIdParam(subscriptionId);
    }, [subscriptionId]);

    if (subscription) {
        setTimeout(() => {
            router.push(OrgAppIndexPageRoute.path(subscription.organizationId));
        }, 1.5 * 1000);
    }

    if (!subscription) return <PreLoader />;

    return (
        <OrgMobileLayout>
            <div className="flex w-full h-full items-center justify-center pb-[100px]">
                <div>
                    <div className="w-full flex justify-center">
                        <ImageV2
                            className="animate-bounce mb-10"
                            src={
                                subscription
                                    ? safeImageSrc(subscription.product, 120, 120)
                                    : 'https://placeimg.com/120/120/arch'
                            }
                            alt={`${subscription.product.name} logo`}
                            width={120}
                        />
                    </div>
                    <p className="font-bold text-center" style={{fontSize: '1.6rem'}}>
                        <em>
                            <span className="text-primary">{subscription?.product?.name || 'Slack'}</span> 등록 완료!
                        </em>
                    </p>
                </div>
            </div>
        </OrgMobileLayout>
    );
}

NewAppCreatedPage.getInitialProps = async () => ({});
