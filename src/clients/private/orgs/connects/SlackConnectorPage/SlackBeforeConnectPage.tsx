import {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {slackScordiOauthApi} from '^models/_slack-bot/api';
import {googleWorkspaceAccessTokenAtom} from '../GoogleWorkspaceConnectorPage/atom';
import {ConnectionAndDescriptionSection} from '^clients/private/orgs/connects/ConnectionAndDescriptionSection';
import {DescriptionSection} from '^clients/private/orgs/connects/DescriptionSection';
import howToConnectSlack from '^images/onboarding/how-to-connect-slack-1.png';
import howToConnectSlack2 from '^images/onboarding/how-to-connect-slack-2.png';

export const SlackBeforeConnectPage = memo(function SlackBeforeConnectPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const setAccessToken = useSetRecoilState(googleWorkspaceAccessTokenAtom);

    return (
        <ConnectionAndDescriptionSection
            src="/images/logo/external/logo_slack.png"
            alt="slack logo"
            title={`슬랙 연동을 위해  \n 간단한 절차를 안내드릴게요`}
            warnTexts={[
                '비활성 계정을 제외한 모든 구성원을 불러와요.',
                '안심하세요. 구성원 정보 외에 다른 데이터를 가져올 수 없어요.',
                '구성원을 동기화하거나 슬랙 워크스페이스 연결해제도 가능해요.',
            ]}
            connectButton={
                <button
                    id="google-workspace-connect-button"
                    className="btn btn-md btn-block btn-scordi"
                    onClick={debounce(() => {
                        window.open(slackScordiOauthApi.authUrl(orgId), '_self');
                    }, 500)}
                >
                    연결 시작하기
                </button>
            }
            onClick={() => document.getElementById('google-workspace-connect-button')?.click()}
        >
            <DescriptionSection
                title="슬랙 워크스페이스 연동으로 구성원 불러오기"
                steps={[
                    <>연결 시작하기 버튼을 클릭 해 주세요.</>,
                    <>연결하고자 하는 슬랙 워크스페이스를 확인해주세요.</>,
                    <>허용 버튼을 눌러 슬랙과 스코디를 연동해주세요.</>,
                ]}
                image={howToConnectSlack}
                alt="howToConnectSlack"
            />
            <DescriptionSection
                title="슬랙 워크스페이스 연동으로 구성원 불러오기"
                steps={[
                    <>설정{' >'} 서비스 연동을 클릭 해주세요.</>,
                    <>슬랙 우측에 있는 세부설정 버튼을 클릭 해주세요.</>,
                    <>설정 탭에서 워크스페이스 제거하고 연결해제를 할 수 있어요.</>,
                ]}
                image={howToConnectSlack2}
                alt="howToConnectSlack2"
            />
        </ConnectionAndDescriptionSection>
    );
});
