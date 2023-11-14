import React, {useEffect} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {V3OrgTeamShowPage} from 'src/components/pages/v3/V3OrgTeam/V3OrgTeamShowPage';
import {useRouter} from 'next/router';
import {useTeamMembers} from '^models/TeamMember/hook';

export const V3OrgTeamShowPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/teams/[teamId]',
    path: (orgId: number, teamId: number) =>
        pathReplace(V3OrgTeamShowPageRoute.pathname, {
            orgId,
            teamId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', teamId: '1'}}],
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
    const teamId = useRouterIdParamState('teamId', teamIdParamState);

    useCurrentOrg(orgId);
    const {search: loadTeamMembers} = useTeamMembers();

    useEffect(() => {
        loadTeamMembers({
            teamId,
            order: {createdAt: 'DESC'},
        });
    }, [router.isReady, orgId, teamId]);

    if (!orgId || !teamId) return <></>;

    return <V3OrgTeamShowPage />;
}
