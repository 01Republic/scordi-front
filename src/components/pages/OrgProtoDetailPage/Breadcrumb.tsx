import {memo} from 'react';
import {useProduct} from '^hooks/useProducts';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';

export const Breadcrumb = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const [proto] = useProduct();

    return (
        <section className="text-sm breadcrumbs mb-5">
            <ul>
                <li>
                    <a className="text-gray-400" onClick={() => router.push(OrgAppIndexPageRoute.path(orgId))}>
                        Apps
                    </a>
                </li>
                <li>
                    <span className="text-gray-400">Integrations</span>
                </li>
                <li>{proto && proto.name}</li>
            </ul>
        </section>
    );
});
