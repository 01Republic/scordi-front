import { memo } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { orgIdParamState } from '^atoms/common';
import { OrgOnboardingRequestPageRoute } from '^pages/orgs/[id]/onboarding/request';
import { Connectors } from '^pages/orgs/[id]/onboarding/members/connects/[connectorName]';
import { OrgOnboardingMembersConnectsPageRoute } from '^pages/orgs/[id]/onboarding/members/connects/[connectorName]';
import { OnboadingLayout } from '../OnboadingLayout';
import { ConnectButton } from './ConnectButton';

export const OrgOnboardingMembersPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const buttons = [
        {
            src: '/images/logo/external/logo_google_workspace.png',
            alt: '구글 워크스페이스로 불러오기',
            text: '구글 워크스페이스로 불러오기',
            onClick: () => router.push(OrgOnboardingMembersConnectsPageRoute.path(orgId, Connectors.googleWorkspace)),
        },
        {
            src: '/images/logo/external/logo_slack.png',
            alt: '슬랙으로 불러오기',
            text: '슬랙으로 불러오기',
            onClick: () => router.push(OrgOnboardingMembersConnectsPageRoute.path(orgId, Connectors.slack)),
        },
        {
            src: '/images/logo/external/logo_excel.svg',
            alt: '엑셀 대량 등록으로 불러오기',
            text: '엑셀 대량 등록으로 불러오기',
            onClick: () => router.push(OrgOnboardingMembersConnectsPageRoute.path(orgId, Connectors.excel)),
        },
    ];

    return (
        <OnboadingLayout
            step={2}
            title="팀 구성원을 불러올게요"
            description="등록 방식을 아래 버튼으로 선택해 주세요"
            image="/images/examples/ex_member.png"
            onSkip={() => router.push(OrgOnboardingRequestPageRoute.path(orgId))}
            button={
                <div className="flex flex-col gap-4">
                    {buttons.map((button, i) => (
                        <ConnectButton key={i} {...button} />
                    ))}
                </div>
            }
        />
    );
});
