import React, {useEffect} from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgTeamMembersPage as Page} from 'src/components/pages/v3/V3OrgTeam/V3OrgTeamMembersPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {useRouter} from 'next/router';
import {useTeamMembers} from '^components/pages/v3/V3OrgTeam/V3OrgTeamMembersPage/atom';

export const V3OrgTeamsPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/teams',
    path: (orgId: number) =>
        pathReplace(V3OrgTeamsPageRoute.pathname, {
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

export default function V3OrgAppsPage() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    const {search: loadTeamMembers} = useTeamMembers();

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId) return;

        loadTeamMembers({
            where: {organizationId: orgId},
            order: {createdAt: 'DESC'},
        });
    }, [router.isReady, orgId]);

    if (!orgId) return <></>;

    return <Page />;
}
