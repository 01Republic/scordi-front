import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {TeamMembersListPage} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersListPage';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import React from 'react';
import {TeamPaymentsListPage} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/TeamPaymentsListPage';

export const TeamPaymentsPageRoute = pathRoute({
    pathname: '/orgs/[id]/teams/[teamId]/payments',
    path: (orgId: number, teamId: number) => pathReplace(TeamPaymentsPageRoute.pathname, {id: orgId, teamId: teamId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', teamId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const teamId = useRouterIdParamState('teamId', teamIdParamState);

    if (!orgId || isNaN(orgId)) return <></>;
    if (!teamId || isNaN(teamId)) return <></>;

    return <TeamPaymentsListPage />;
}
