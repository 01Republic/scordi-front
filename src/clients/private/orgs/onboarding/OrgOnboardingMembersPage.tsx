import {orgIdParamState} from '^atoms/common';
import {Connectors, OrgConnectorDetailPageRoute} from '^pages/orgs/[id]/connects/[connectorName]';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {OnboadingLayout} from './OnboadingLayout';

export const OrgOnboardingMembersPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OnboadingLayout
            step={2}
            title={`팀 구성원을 \n불러올게요`}
            description={`등록 방식을 아래 버튼으로 선택해 주세요`}
            image="/images/examples/ex_member.png"
            button={
                <div className="flex flex-col gap-4">
                    <Button
                        variant="scordiWhite"
                        size="xl"
                        onClick={() => {
                            router.push(OrgConnectorDetailPageRoute.path(orgId, Connectors.googleWorkspace));
                        }}
                    >
                        <img
                            src="/images/logo/external/logo_google_workspace.png"
                            alt="구글 워크스페이스로 불러오기"
                            style={{width: 20, height: 20}}
                        />
                        구글 워크스페이스로 불러오기
                    </Button>
                    <Button
                        variant="scordiWhite"
                        size="xl"
                        onClick={() => {
                            router.push(OrgConnectorDetailPageRoute.path(orgId, Connectors.slack));
                        }}
                    >
                        <img
                            src="/images/logo/external/logo_slack.png"
                            alt="슬랙으로 불러오기"
                            style={{width: 20, height: 20}}
                        />
                        슬랙으로 불러오기
                    </Button>
                    <Button
                        variant="scordiWhite"
                        size="xl"
                        onClick={() => {
                            router.push(OrgConnectorDetailPageRoute.path(orgId, Connectors.excel));
                        }}
                    >
                        <img
                            src="/images/logo/external/logo_excel.svg"
                            alt="엑셀 대량 등록으로 불러오기"
                            style={{width: 20, height: 20}}
                        />
                        엑셀 대량 등록으로 불러오기
                    </Button>
                </div>
            }
        />
    );
});
