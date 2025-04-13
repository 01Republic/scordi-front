import {Button} from '^public/components/ui/button';
import {memo} from 'react';
import {OnboadingLayout} from './OnboadingLayout';

export const OrgOnboardingMembersPage = memo(() => {
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
                            /* TODO: 구글 워크스페이스로 불러오기 */
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
                            /* TODO: 슬랙으로 불러오기 */
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
                            /* TODO: 엑셀 대량 등록으로 불러오기 */
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
