import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {SlackConnectorPage} from '^clients/private/orgs/connects/SlackConnectorPage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useRouter} from 'next/router';
import {OrgOnboardingCompletePageRoute} from '../../complete';
import {useState} from 'react';
import {useOnboardingComplete} from '^clients/private/orgs/onboarding/useOnboardingComplete';
import {LoadableBox} from '^components/util/loading';

export enum Connectors {
    googleWorkspace = 'google-workspace',
    slack = 'slack',
    excel = 'excel',
}

// 온보딩 스텝3. / 슬랙 연동 / 시작 페이지
export const OrgOnboardingNotificationsConnectsPageRoute = pathRoute({
    pathname: '/orgs/[id]/onboarding/notifications/connects/[connectorName]',
    path: (id: number, connectorName: Connectors) =>
        pathReplace(OrgOnboardingNotificationsConnectsPageRoute.pathname, {
            id,
            connectorName,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', connectorName: Connectors.googleWorkspace}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home',
            'google-compliance',
            // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.'org-home'
        ])),
    },
});

export default function OrgConnectorDetailPage() {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);
    const {isLoading, onComplete} = useOnboardingComplete();
    const connectorName = router.query.connectorName as string | undefined;

    if (!orgId || isNaN(orgId) || !connectorName) return <></>;

    if (connectorName === Connectors.slack)
        return (
            <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                <SlackConnectorPage onNext={onComplete} />
            </LoadableBox>
        );

    return (
        <div>
            <div>
                <p>
                    redirect to: {OrgOnboardingNotificationsConnectsPageRoute.path(orgId, connectorName as Connectors)}
                </p>
            </div>
        </div>
    );
}
