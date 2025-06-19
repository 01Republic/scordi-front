import {ImgHTMLAttributes, memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {WithChildren} from '^types/global.type';
import {googleOAuth} from '^config/environments';
import {googleWorkspaceAccessTokenAtom} from './atom';
import {LinkTo} from '^components/util/LinkTo';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {NextImage} from '^components/NextImage';
import {ConnectionAndDescriptionSection} from '^clients/private/orgs/connects/ConnectionAndDescriptionSection';
import {DescriptionSection} from '^clients/private/orgs/connects/DescriptionSection';
import adminCheck3s from 'src/images/onboarding/googleDirection/admin-check-3s.png';
import adminViewButton from 'src/images/onboarding/googleDirection/admin-view-button.png';
import accountPermissionCheck from 'src/images/onboarding/googleDirection/account-permission-check.png';
import userAssignmentComplete from 'src/images/onboarding/googleDirection/user-assignment-complete.png';

export const GoogleWorkspaceBeforeConnectPage = memo(function GoogleWorkspaceBeforeConnectPage() {
    const setAccessToken = useSetRecoilState(googleWorkspaceAccessTokenAtom);

    return (
        <ConnectionAndDescriptionSection
            src="https://fonts.gstatic.com/s/i/productlogos/admin_2020q4/v6/192px.svg"
            alt="google workspace logo"
            title={`구성원 계정을 불러오기 위한 \n 간단한 절차를 안내드릴게요`}
            warnTexts={[
                '비활성 계정을 제외한 모든 구성원을 불러와요.',
                '안심하세요. 구성원 정보 외에 다른 데이터를 가져올 수 없어요.',
                '구성원을 동기화하거나 슬랙 워크스페이스 연결해제도 가능해요.',
            ]}
            connectButton={
                <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                    <GoogleLoginBtn
                        about="admin"
                        onToken={(accessToken) => setAccessToken(accessToken)}
                        className="!btn-md"
                        logoSize="w-4 h-4"
                        ButtonComponent={() => (
                            <button id="google-workspace-connect-button" className="btn btn-md btn-block btn-scordi">
                                연결 시작하기
                            </button>
                        )}
                    />
                </GoogleOAuthProvider>
            }
            onClick={() => document.getElementById('google-workspace-connect-button')?.click()}
        >
            <DescriptionSection
                title="관리자 계정인지 3초만에 확인하기"
                steps={[
                    <>
                        <LinkTo
                            href="https://google.com"
                            target="_blank"
                            text="구글"
                            className="cursor-pointer link-primary"
                        />
                        사이트에 접속해 주세요
                    </>,
                    <>
                        우측 상단 <Code>더보기</Code> 아이콘을 클릭해 패널을 열어주세요
                    </>,
                    <>
                        열린 패널에서 <Code>관리 콘솔</Code> 아이콘이 보인다면, 관리자 계정이에요!
                    </>,
                ]}
                image={adminCheck3s}
                alt="adminCheck3s"
            />

            <DescriptionSection
                title="계정 권한을 정확하게 확인하기"
                steps={[
                    <>
                        <LinkTo
                            href="https://admin.google.com"
                            target="_blank"
                            text="https://admin.google.com"
                            className="cursor-pointer link-primary"
                        />
                        사이트에 접속해 주세요.
                    </>,
                    <>
                        화면 왼쪽 메뉴에서 <Code>계정 {`>`} 관리자 역할</Code>을 선택해주세요.
                    </>,
                    <>
                        역할 중 ‘최고 관리자’ 항목에 마우스를 올리면, 오른쪽에 <Code>관리자 보기</Code>
                        버튼이 생길거에요
                        <div className="w-full -ml-4 mt-5 mb-2">
                            <NextImage
                                src={adminViewButton}
                                alt="adminViewButton"
                                width={adminViewButton.width}
                                height={adminViewButton.height}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    </>,
                    <>
                        <Code>관리자 보기</Code>를 선택하면 관리자로 배정된 계정을 확인할 수 있어요.
                    </>,
                ]}
                image={accountPermissionCheck}
                alt="accountPermissionCheck"
            />

            <DescriptionSection
                title="계정에 권한 설정하기"
                steps={[
                    <>
                        <LinkTo
                            href="https://admin.google.com"
                            target="_blank"
                            text="https://admin.google.com"
                            className="cursor-pointer link-primary"
                        />
                        사이트에 접속해 주세요.
                    </>,
                    <>
                        화면 왼쪽 메뉴에서 <Code>계정 {`>`} 관리자 역할</Code>을 선택해주세요
                    </>,
                    <>
                        역할 중 ‘최고 관리자’ 항목에 마우스를 올리면, 오른쪽에 <Code>관리자 보기</Code>
                        버튼이 생길거에요
                        <div className="w-full -ml-4 mt-5 mb-2">
                            <NextImage
                                src={adminViewButton}
                                alt="adminViewButton"
                                width={adminViewButton.width}
                                height={adminViewButton.height}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    </>,
                    <>
                        <Code>관리자 지정</Code>을 선택하고 권한을 부여할 계정을 선택해주세요.
                    </>,
                    <>
                        <Code>사용자 할당</Code>을 클릭하면 완료되어요!
                    </>,
                ]}
                image={userAssignmentComplete}
                alt="userAssignmentComplete"
            />
        </ConnectionAndDescriptionSection>
    );
});

const Code = ({children}: WithChildren) => (
    <code className="rounded text-14 px-1.5 py-0.5 bg-gray-600 text-white">{children}</code>
);

const Img = (props: ImgHTMLAttributes<any>) => <img src="" alt="" style={{width: '70%'}} loading="lazy" {...props} />;
