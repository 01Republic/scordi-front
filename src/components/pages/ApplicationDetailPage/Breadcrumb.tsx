import {memo} from 'react';
import {useApplicationPrototype} from '^hooks/useApplicationPrototypes';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {useApplication} from '^hooks/useApplications';

// Application Detail Page Breadcrumb
export const Breadcrumb = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const app = useApplication();

    if (!app) return <></>;

    const proto = app?.prototype;

    return (
        <section className="text-sm breadcrumbs mb-5">
            <ul>
                <li>
                    <a className="text-gray-400" onClick={() => router.push(OrgAppsIndexPageRoute.path(orgId))}>
                        Apps
                    </a>
                </li>
                <li>
                    <span className="text-gray-400">Subscriptions</span>
                </li>
                <li>
                    <b>{proto && proto.name}</b>
                </li>
            </ul>
        </section>
    );
});
