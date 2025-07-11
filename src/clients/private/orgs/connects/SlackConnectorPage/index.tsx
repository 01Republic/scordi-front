import {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {IntegrationProvider, IntegrationWorkspaceDto} from '^models/IntegrationWorkspace/type';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import {ConnectingResultScreenForSlack} from '../ConnectingResultScreen';
import {SlackBeforeConnectPage} from './SlackBeforeConnectPage';

interface SlackConnectorPageProps {
    onNext?: () => void;
}

// 온보딩 스텝3. / 슬랙 연동 / 시작 페이지
export const SlackConnectorPage = memo(function SlackConnectorPage({onNext}: SlackConnectorPageProps) {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const [slackWorkspace, setSlackWorkspace] = useState<IntegrationWorkspaceDto<IntegrationProvider.slack>>();

    // 시작페이지
    if (!slackWorkspace) return <SlackBeforeConnectPage onNext={setSlackWorkspace} />;

    // 완료페이지
    return (
        <ConnectingResultScreenForSlack
            slackWorkspace={slackWorkspace}
            onNext={() => (onNext ? onNext() : router.push(OrgOnboardingRequestPageRoute.path(orgId)))}
        />
    );
});
