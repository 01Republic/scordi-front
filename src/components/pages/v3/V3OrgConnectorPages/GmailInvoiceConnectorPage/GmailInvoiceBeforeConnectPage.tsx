import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft} from 'react-icons/fa6';
import {SafeBadge} from '^v3/V3OrgConnectorPages/GoogleWorkspaceConnectorPage/GoogleWorkspaceBeforeConnectPage';
import {useRouter} from 'next/router';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useSetRecoilState} from 'recoil';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';

export const GmailInvoiceBeforeConnectPage = memo(function GmailInvoiceBeforeConnectPage() {
    const router = useRouter();
    const setCode = useSetRecoilState(connectInvoiceAccountCodeAtom);

    return (
        <div className="py-10 px-12">
            <header className="mb-12">
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
                        src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png"
                        alt="Gmail logo"
                        className="avatar w-[48px] h-[48px] bg-white mb-4"
                    />
                    <SafeBadge />
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl mb-8">
                        Gmail<span className="text-gray-400">을 연결하고</span> <br />{' '}
                        <span className="text-gray-400">청구서 이메일을 한 곳에서 확인하세요</span>
                    </h1>

                    <div className="flex">
                        <div className="rounded-box p-4 bg-red-200 text-red-600">
                            <p className="font-semibold text-18">계정 통합 팝업에서, 권한 동의에 체크해주세요!</p>
                        </div>
                    </div>
                    <br />

                    <div className="mb-12">
                        <p className="text-lg font-semibold">안심하셔도 괜찮아요!</p>
                        <ul className="list-disc pl-4 text-16">
                            <li>
                                결제 관련 이메일 외에는 조회 할 수 없도록, <u>원천 차단</u>되어있어요.
                            </li>
                            <li>청구서 계정이 여러개여도 모두 연결 할 수 있어요.</li>
                        </ul>
                    </div>

                    <div>
                        <GoogleLoginBtn
                            about="gmail"
                            onCode={(code) => setCode(code)}
                            ButtonComponent={() => (
                                <button className="btn btn-lg btn-scordi">첫 번째 Gmail 계정 연결하기</button>
                            )}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
});
