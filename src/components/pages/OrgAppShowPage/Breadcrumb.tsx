import {memo} from 'react';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {useCurrentSubscription} from '^models/Subscription/hook';

// Application Detail Page Breadcrumb
export const Breadcrumb = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const {currentSubscription} = useCurrentSubscription();

    if (!currentSubscription) return <></>;

    const proto = currentSubscription.product;

    return (
        <section className="text-sm breadcrumbs mb-5">
            <ul>
                <li>
                    <a className="text-gray-400" onClick={() => router.push(OrgAppIndexPageRoute.path(orgId))}>
                        Apps
                    </a>
                </li>
                <li>
                    <span className="text-gray-400">Subscriptions</span>
                </li>
                <li>
                    <b>{proto && proto.nameEn}</b>
                </li>
            </ul>
        </section>
    );
});
