import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {Connectors} from '^pages/orgs/[id]/onboarding/members/connects/[connectorName]';
import {OrgOnboardingNotificationsConnectsPageRoute} from '^pages/orgs/[id]/onboarding/notifications/connects/[connectorName]';
import exampleSlackImage from 'src/images/onboarding/ex_slack.png';
import {ConnectButton} from '../OrgOnboardingMembersPage/ConnectButton';
import {OnboardingLayout} from '../OnboardingLayout';
import {LoadableBox} from '^components/util/loading';
import {useOnboardingComplete} from '^clients/private/orgs/onboarding/useOnboardingComplete';

// 온보딩 스텝3. / 슬랙 연동 / 커버 페이지
export const OrgOnboardingNotificationsPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {isLoading, onComplete} = useOnboardingComplete();

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
            <OnboardingLayout
                step={3}
                title={`놓치기 쉬운 구독 변동,\n슬랙 알림 받아보세요`}
                description={`월별 구독 현황 레포트와 비용과 시트 변동 사항을\n슬랙 알림을 통해 빠르게 확인할 수 있어요.`}
                image={exampleSlackImage}
                onBack={() => router.back()}
                onSkip={onComplete}
                button={
                    <ConnectButton
                        src="/images/logo/external/logo_slack.png"
                        alt="슬랙 연동하고 알림 받기"
                        text="슬랙 연동하고 알림 받기"
                        onClick={() => {
                            router.push(OrgOnboardingNotificationsConnectsPageRoute.path(orgId, Connectors.slack));
                        }}
                    />
                }
            />
        </LoadableBox>
    );
});
