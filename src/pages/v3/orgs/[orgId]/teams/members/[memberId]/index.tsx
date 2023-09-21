import React, {useEffect} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, teamMemberIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {useRouter} from 'next/router';
import {useCurrentTeamMember} from '^pages/v3/orgs/[orgId]/teams/members/atom';
import {V3OrgTeamMemberShowPage} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile';

export const V3OrgTeamMemberShowPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/teams/members/[memberId]',
    path: (orgId: number, memberId: number) =>
        pathReplace(V3OrgTeamMemberShowPageRoute.pathname, {
            orgId,
            memberId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', memberId: '1'}}],
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
    const memberId = useRouterIdParamState('memberId', teamMemberIdParamState);
    useCurrentOrg(orgId);

    const {loadCurrentTeamMember} = useCurrentTeamMember();

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || !memberId) return;
        loadCurrentTeamMember(orgId, memberId);
    }, [router.isReady, orgId, memberId]);

    if (!orgId || !memberId) return <></>;

    return <V3OrgTeamMemberShowPage />;
}
