import React, {useEffect} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {useRouter} from 'next/router';
import {V3OrgTeamMembersPage} from '^v3/V3OrgTeam/V3OrgTeamMembersPage';
import {useTeamMembers} from '^models/TeamMember/atom/atom';

export const V3OrgTeamMembersPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/teams/members',
    path: (orgId: number) =>
        pathReplace(V3OrgTeamMembersPageRoute.pathname, {
            orgId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home',
            'google-compliance',
            'publicTasting',
        ])),
        // Will be passed to the page component as props
    },
});

export default function Page() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    const {search} = useTeamMembers();

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || isNaN(orgId)) return;
        search({where: {organizationId: orgId}});
    }, [router.isReady, orgId]);

    if (!orgId) return <></>;

    return <V3OrgTeamMembersPage />;
}
