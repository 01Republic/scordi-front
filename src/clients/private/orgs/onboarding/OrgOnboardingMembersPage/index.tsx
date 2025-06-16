import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {Connectors} from '^pages/orgs/[id]/onboarding/members/connects/[connectorName]';
import {OrgOnboardingMembersConnectsPageRoute} from '^pages/orgs/[id]/onboarding/members/connects/[connectorName]';
import {OrgOnboardingNotificationsPageRoute} from '^pages/orgs/[id]/onboarding/notifications';
import exampleGoogleImage from 'src/images/onboarding/ex_google.png';
import {OnboardingLayout} from '../OnboardingLayout';
import {ConnectButton} from './ConnectButton';

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
        // {
        //     src: '/images/logo/external/logo_slack.png',
        //     alt: '슬랙으로 불러오기',
        //     text: '슬랙으로 불러오기',
        //     onClick: () => router.push(OrgOnboardingMembersConnectsPageRoute.path(orgId, Connectors.slack)),
        // },
        // {
        //     src: '/images/logo/external/logo_excel.svg',
        //     alt: '엑셀 대량 등록으로 불러오기',
        //     text: '엑셀 대량 등록으로 불러오기',
        //     onClick: () => router.push(OrgOnboardingMembersConnectsPageRoute.path(orgId, Connectors.excel)),
        // },
    ];

    return (
        <OnboardingLayout
            step={2}
            title={`구성원 계정을 불러와 \n구독에 연결할게요`}
            description={`구글 워크스페이스를 연동하면 구성원 계정을 불러와,\n자동으로 사용 중인 구독과 연결할 수 있어요.`}
            image={exampleGoogleImage}
            onSkip={() => router.push(OrgOnboardingNotificationsPageRoute.path(orgId))}
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
