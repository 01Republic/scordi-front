import {orgIdParamState} from '^atoms/common';
import {Connectors, OrgConnectorDetailPageRoute} from '^pages/orgs/[id]/connects/[connectorName]';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {OnboadingLayout} from './OnboadingLayout';
import { OrgOnboardingMembersConnectsPageRoute } from '^pages/orgs/[id]/onboarding/members/connects/[connectorName]';

const ConnectButton = ({src, alt, text, onClick}: {src: string; alt: string; text: string; onClick: () => void}) => (
    <Button variant="outline" size="xl" className="hover:shadow-md" onClick={onClick}>
        <img src={src} alt={alt} className="w-5 h-5" />
        {text}
    </Button>
);

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
