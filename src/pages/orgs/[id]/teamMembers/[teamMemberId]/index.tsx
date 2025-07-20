import React, {useEffect} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, teamMemberIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {useRecoilState} from 'recoil';
import {OrgTeamMemberShowPage} from '^clients/private/orgs/team/team-members/OrgTeamMemberShowPage';
import {teamMemberSubjectAtom} from '^clients/private/orgs/team/team-members/OrgTeamMemberShowPage/atom';
import {teamMemberApi} from '^models/TeamMember';
import {useRouter} from 'next/router';

export const OrgTeamMemberShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/teamMembers/[teamMemberId]',
    path: (orgId: number, id: number) =>
        pathReplace(OrgTeamMemberShowPageRoute.pathname, {
            id: orgId,
            teamMemberId: id,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', teamMemberId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            'members',
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const teamMemberId = useRouterIdParamState('teamMemberId', teamMemberIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;
    if (!teamMemberId || isNaN(teamMemberId)) return <></>;

    return <OrgTeamMemberShowPage />;
}
