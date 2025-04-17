import {GoogleOAuthProvider} from '@react-oauth/google';
import {OutLink} from '^components/OutLink';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {LinkTo} from '^components/util/LinkTo';
import {googleOAuth} from '^config/environments';
import {WithChildren} from '^types/global.type';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';
import {ImgHTMLAttributes, memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {SafeBadge} from '../SafeBadge';
import {googleWorkspaceAccessTokenAtom} from './atom';

export const GoogleWorkspaceBeforeConnectPage = memo(function GoogleWorkspaceBeforeConnectPage() {
    const router = useRouter();
    const setAccessToken = useSetRecoilState(googleWorkspaceAccessTokenAtom);

    return (
        <div className="py-16 px-12">
            <header className="fixed mb-12">
                <div className="mb-12">
                    <LinkTo
                        onClick={() => router.back()}
                        className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                    >
                        <ArrowLeft /> 뒤로가기
                    </LinkTo>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <img
                        src="https://fonts.gstatic.com/s/i/productlogos/admin_2020q4/v6/192px.svg"
                        alt="google workspace logo"
                        className="avatar w-[48px] h-[48px] bg-white"
                    />

                    <SafeBadge />
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl my-10 font-medium">
                        구글 워크스페이스<span className="text-gray-400">를 연결하면</span> <br />{' '}
                        <span className="text-gray-400">구성원 계정을 한 번에 불러올 수 있어요</span>
                    </h1>

                    <div className="rounded-box p-4 bg-red-50 text-red-400 border border-red-400">
                        <p className="font-medium text-18 mb-2">잠깐, 다음과 같은 안내를 확인해주세요.</p>
                        <ul className="list-disc pl-4 text-16">
                            <li>비활성 계정을 제외한 모든 구성원을 불러와요.</li>
                            <li>안심하세요. 구성원 정보 외에 다른 데이터를 가져올 수 없어요.</li>
                            <li>구성원을 동기화하거나 슬랙 워크스페이스 연결해제도 가능해요.</li>
                        </ul>
                    </div>

                    <br />
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                        <GoogleLoginBtn
                            about="admin"
                            onToken={(accessToken) => setAccessToken(accessToken)}
                            className="!btn-md"
                            logoSize="w-4 h-4"
                            ButtonComponent={() => (
                                <button
                                    id="google-workspace-connect-button"
                                    className="btn btn-md btn-block btn-scordi"
                                >
                                    연결 시작하기
                                </button>
                            )}
                        />
                    </GoogleOAuthProvider>
                </div>
            </header>

            <div className="grid sm:grid-cols-2">
                <div></div>
                <div>
                    <div className="mb-14 w-full flex flex-col gap-4">
                        <section>
                            <h3>관리자 계정인지 3초만에 확인하기</h3>
                            <br />
                            <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                                <li>
                                    <OutLink href="https://google.com" text="구글" className="cursor-pointer" />{' '}
                                    사이트에 접속해 주세요
                                </li>
                                <li>
                                    우측 상단 <Code>더보기</Code> 아이콘을 클릭해 패널을 열어주세요
                                </li>
                                <li>
                                    열린 패널에서 <Code>관리 콘솔</Code> 아이콘이 보인다면, 관리자 계정이에요!
                                    <Img
                                        src="/images/v3/how-to-check-google-workspace-admin-permission.png"
                                        alt="how to check google workspace admin permission"
                                        className="my-2"
                                    />
                                </li>
                            </ul>
                        </section>

                        <hr className="my-4" />

                        <section>
                            <p className="text-16">혹시.. 연동이 안되시나요?</p>
                            <h3>계정 권한을 정확하게 확인하기</h3>
                            <br />
                            <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                                <li>
                                    <OutLink href="https://admin.google.com" className="cursor-pointer" /> 사이트에
                                    접속해 주세요
                                </li>
                                <li>
                                    화면 왼쪽 메뉴에서 <Code>계정 {`>`} 관리자 역할</Code>을 선택해주세요
                                </li>
                                <li>
                                    역할 중 ‘최고 관리자’ 항목에 마우스를 올리면, 오른쪽에 <Code>관리자 보기</Code>{' '}
                                    버튼이 생길거에요
                                    <Img
                                        src="/images/v3/how-to-check-google-workspace-admin-permission-2.png"
                                        alt="how to check google workspace admin permission 2"
                                        style={{width: '100%'}}
                                        className="my-2"
                                    />
                                </li>
                                <li>
                                    <Code>관리자 보기</Code>를 선택하면 관리자로 배정된 계정을 확인 할 수 있어요
                                    <Img
                                        src="/images/v3/how-to-check-google-workspace-admin-permission-3.png"
                                        alt="how to check google workspace admin permission 3"
                                        style={{width: '100%'}}
                                        className="my-2"
                                    />
                                </li>
                            </ul>
                        </section>

                        <hr className="my-4" />

                        <section>
                            <p className="text-16">만약 연결하려는 계정에 관리자 권한이 없다면?</p>
                            <h3>계정에 권한 설정하기</h3>
                            <br />
                            <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                                <li>
                                    <OutLink href="https://admin.google.com" className="cursor-pointer" /> 사이트에
                                    접속해 주세요
                                </li>
                                <li>
                                    화면 왼쪽 메뉴에서 <Code>계정 {`>`} 관리자 역할</Code>을 선택해주세요
                                </li>
                                <li>
                                    역할 중 ‘최고 관리자’ 항목에 마우스를 올리면, 오른쪽에 <Code>관리자 지정</Code>{' '}
                                    버튼이 생길거에요
                                    <Img
                                        src="/images/v3/how-to-check-google-workspace-admin-permission-2.png"
                                        alt="how to check google workspace admin permission 2"
                                        style={{width: '100%'}}
                                        className="my-2"
                                    />
                                </li>
                                <li>
                                    <Code>관리자 지정</Code>을 선택하고 권한을 부여할 계정을 선택해 주세요
                                </li>
                                <li>
                                    <Code>사용자 할당</Code>을 클릭하면 완료되어요!
                                    <Img
                                        src="/images/v3/how-to-check-google-workspace-admin-permission-4.png"
                                        alt="how to check google workspace admin permission 4"
                                        style={{width: '100%'}}
                                        className="my-2"
                                    />
                                </li>
                            </ul>
                        </section>

                        <section>
                            <br />
                            <br />
                            <br />
                            <p className="text-2xl font-bold">연결을 시작해볼까요?</p>
                            <br />
                            <button
                                onClick={() => document.getElementById('google-workspace-connect-button')?.click()}
                                className="btn btn-md btn-block btn-scordi"
                            >
                                연결 시작하기
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
});

const Code = ({children}: WithChildren) => (
    <code className="rounded text-14 px-1.5 py-0.5 bg-gray-600 text-white">{children}</code>
);

const Img = (props: ImgHTMLAttributes<any>) => <img src="" alt="" style={{width: '70%'}} loading="lazy" {...props} />;
