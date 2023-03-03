import {memo} from 'react';
import {useApplicationPrototype} from '^hooks/useApplicationPrototypes';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';

// Application Detail Page Breadcrumb
export const Breadcrumb = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const proto = useApplicationPrototype();

    return (
        <section className="text-sm breadcrumbs mb-5">
            <ul>
                <li>
                    <a className="text-gray-400" onClick={() => router.push(OrgAppsIndexPageRoute.path(orgId))}>
                        Apps
                    </a>
                </li>
                <li>{proto && proto.name}</li>
            </ul>
        </section>
    );
});
