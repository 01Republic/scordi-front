import React, {ImgHTMLAttributes, memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {FaArrowLeft} from 'react-icons/fa6';
import {AiFillSafetyCertificate} from 'react-icons/ai';
import {googleOAuth} from '^config/environments';
import {WithChildren} from '^types/global.type';
import {OutLink} from '^components/OutLink';
import {LinkTo} from '^components/util/LinkTo';
import {BottomUpModalSwal} from '^components/util/modals/share';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {googleWorkspaceAccessTokenAtom} from './atom';

export const GoogleWorkspaceBeforeConnectPage = memo(function GoogleWorkspaceBeforeConnectPage() {
    const router = useRouter();
    const setAccessToken = useSetRecoilState(googleWorkspaceAccessTokenAtom);

    return (
        <div className="py-10 px-12">
            <header className="fixed top-[104px] mb-12">
                <div className="mb-12">
                    <LinkTo
                        onClick={() => router.back()}
                        className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                    >
                        <FaArrowLeft /> 뒤로가기
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
                    <h1 className="text-3xl mb-4">
                        구글 워크스페이스<span className="text-gray-400">를 연결하면</span> <br />{' '}
                        <span className="text-gray-400">누가 무엇을 쓰고 있는지 불러올 수 있어요</span>
                    </h1>

                    <div className="rounded-box p-4 bg-red-200 text-red-600">
                        <p className="font-semibold text-18 mb-2">잠깐, 그룹웨어의 관리자 계정이 필요한 연결이에요</p>
                        <ul className="list-disc pl-4 text-16">
                            <li>구성원과 구독서비스를 맵핑하기 위해 관리자 권한이 꼭 필요해요.</li>
                            <li>안심하세요. 서비스 맵핑 이외의 목적으로 데이터를 취급할 수 없어요.</li>
                        </ul>
                    </div>

                    <br />
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                        <GoogleLoginBtn
                            about="admin"
                            googleLoginOnSuccessFn={(accessToken) => setAccessToken(accessToken)}
                            className="!btn-md"
                            logoSize="w-4 h-4"
                            ButtonComponent={() => (
                                <button
                                    id="google-workspace-connect-button"
                                    className="btn btn-lg btn-block btn-scordi"
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
                <div className="sm:pt-16">
                    <div className="mb-14 w-full flex flex-col gap-4">
                        <section>
                            <h3>No 1. 관리자 계정인지 3초만에 확인하기</h3>
                            <br />
                            <List>
                                <li>
                                    <OutLink href="https://google.com" text="구글" className="cursor-pointer" />{' '}
                                    사이트에 접속해 주세요
                                </li>
                                <li>
                                    우측 상단 <Code>더보기</Code> 아이콘을 클릭해 패널을 열어주세요
                                </li>
                                <li>
                                    열린 패널에서 <Code>관리 콘솔</Code> 아이콘이 보인다면, 관리자 계정이에요!
                                </li>
                            </List>
                            <br />
                            <Img
                                src="/images/v3/how-to-check-google-workspace-admin-permission.png"
                                alt="how to check google workspace admin permission"
                            />
                        </section>

                        <hr className="my-4" />

                        <section>
                            <p className="text-16">혹시.. 연동이 안되시나요?</p>
                            <h3>No 2. 계정 권한을 정확하게 확인하기</h3>
                            <br />
                            <List>
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
                                        className="mb-2"
                                    />
                                </li>
                                <li>
                                    <Code>관리자 보기</Code>를 선택하면 관리자로 배정된 계정을 확인 할 수 있어요
                                    <Img
                                        src="/images/v3/how-to-check-google-workspace-admin-permission-3.png"
                                        alt="how to check google workspace admin permission 3"
                                        style={{width: '100%'}}
                                        className="mb-2"
                                    />
                                </li>
                            </List>
                        </section>

                        <hr className="my-4" />

                        <section>
                            <p className="text-16">만약 연결하려는 계정에 관리자 권한이 없다면?</p>
                            <h3>No 3. 계정에 권한 설정하기</h3>
                            <br />
                            <List>
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
                                        className="mb-2"
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
                                        className="mb-2"
                                    />
                                </li>
                            </List>
                        </section>

                        <section>
                            <br />
                            <br />
                            <br />
                            <p className="text-2xl font-bold">연결을 시작해볼까요?</p>
                            <br />
                            <button
                                onClick={() => document.getElementById('google-workspace-connect-button')?.click()}
                                className="btn btn-lg btn-block btn-scordi"
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

export const SafeBadge = () => {
    const onClick = () => {
        BottomUpModalSwal.fire({
            title: <h4 className="text-lg py-4">고객 데이터를 안전하게 지키기 위한 노력</h4>,
            html: (
                <div className="text-left px-5">
                    <p className="text-16 mb-3">
                        <b>하나. Google Authorized</b>
                        <small className="block">
                            수개월에 걸친 구글 본사의 까다로운 보안 심사를 통과했어요! (2023.11)
                        </small>
                    </p>
                    <p className="text-16 mb-3">
                        <b>둘. 데이터 통신 암호화</b>
                        <small className="block">
                            모든 통신 과정에서 TLS/SSL를 이용하여 고객의 모든 데이터를 안전하게 보호해요.
                        </small>
                    </p>
                    <p className="text-16 mb-3">
                        <b>셋. 비밀 유지 서약</b>
                        <small className="block">
                            고객사의 정보를 누설하지 않도록, 전 직원 비밀 유지 서약을 진행하고 있어요.
                        </small>
                    </p>
                    <p className="text-16 mb-3">
                        <b>넷. ISO 27001 (예정)</b>
                        <small className="block">국제 정보보안 인증제도 심사를 진행하고 있어요!</small>
                    </p>
                </div>
            ),
            backdrop: true,
            position: 'bottom',
            confirmButtonText: '닫기',
            customClass: {
                container: '!p-0 bg-transparent animate__animated animate__faster',
                popup: '!p-0 !rounded-b-none !rounded-t-box shadow-lg',
                title: '!rounded-t-box bg-scordi !py-0 !px-5 !text-left !text-white !text-lg',
                htmlContainer: '!m-0 !pt-4',
                actions: '!m-0 !p-5',
                confirmButton: 'btn btn-block btn-lg !text-xl !rounded-btn !m-0',
            },
            showClass: {backdrop: 'animate__slideInUp'},
            hideClass: {backdrop: 'animate__slideOutDown'},
        });
    };

    return (
        <button
            className="btn btn-sm !bg-green-200 hover:border-green-700 text-green-700 gap-2 !cursor-pointer"
            onClick={onClick}
        >
            <AiFillSafetyCertificate /> 보안 인증 완료
        </button>
    );
};

const List = ({children}: WithChildren) => <ol className="list-decimal pl-4 text-16 leading-loose">{children}</ol>;

const Code = ({children}: WithChildren) => (
    <code className="rounded text-14 px-1.5 py-0.5 bg-gray-600 text-white">{children}</code>
);

const Img = (props: ImgHTMLAttributes<any>) => <img src="" alt="" style={{width: '70%'}} loading="lazy" {...props} />;
