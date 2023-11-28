import React, {memo, useState} from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useForm} from 'react-hook-form';
import {UserLoginRequestDto} from '^models/User/types';
import {useCurrentUser} from '^models/User/hook';
import {Modal} from '^components/Modal';
import {GoogleLoginBtn} from './GoogleLoginBtn';
import {TextInput} from '^components/TextInput';
import {TesterLoginForm} from '^components/pages/UsersLogin/TesterLoginForm';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {WithChildren} from '^types/global.type';
import {appEnv, googleOAuth} from '^config/environments';

export const UsersLoginPage = memo(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {currentUser, loginRedirect} = useCurrentUser();

    if (currentUser) loginRedirect(currentUser);

    // const submit = (data: UserLoginRequestDto) => {
    //     login(data)
    //         .then((user) => loginRedirect(user))
    //         .catch(() => setIsModalOpen(true));
    // };

    const scope = ['email', 'profile', 'openid', 'https://www.googleapis.com/auth/gmail.readonly'];

    return (
        <div className="bg-white">
            <GoogleOAuthProvider clientId={googleOAuth.gmailClient.id}>
                <Modal
                    type={'info'}
                    isOpen={isModalOpen}
                    title={'Login failed'}
                    description={'Create a Google Account'}
                    buttons={[{text: 'Try again', onClick: () => setIsModalOpen(false)}]}
                />
                <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 bg-white z-10" />

                <div
                    className={'mx-auto py-4 sm:py-20 w-full max-w-md sm:max-w-lg space-y-5'}
                    style={{minHeight: '100vh'}}
                >
                    {/*<form onSubmit={form.handleSubmit(submit)}>*/}
                    <div className="p-4 m-auto text-center">
                        {/*<img src="/logo-sign_in_page.png" alt="" />*/}
                        <h1 className="text-3xl sm:text-5xl  mb-8 font-bold">스코디 시작하기</h1>
                        <h5 className="text-lg sm:text-2xl mb-8">
                            반가워요, 고객님!
                            <span className="block">스코디를 이렇게 이용해보세요 🙂</span>
                        </h5>
                        <div className="pb-8">
                            <Slot>📲 회사에서 이용중인 앱이 있다면 모두 등록 해주세요</Slot>
                            <Slot>📨 구글 이메일로 1분만에 앱을 등록해서 관리 할 수 있어요</Slot>
                            <Slot>👥 팀별로 어떤 앱을 쓰고 있는지 한 눈에 확인할 수 있어요</Slot>
                        </div>

                        <div>
                            <GoogleLoginBtn scope={scope} />
                        </div>
                        <div></div>
                    </div>
                    {/*</form>*/}
                </div>

                {/*{appEnv !== 'production' && (*/}
                {/*    <div className="mx-auto py-10 w-full max-w-md space-y-5">*/}
                {/*        <TesterLoginForm />*/}
                {/*    </div>*/}
                {/*)}*/}
            </GoogleOAuthProvider>
        </div>
    );
});

export const Slot = memo((props: WithChildren) => {
    const {children} = props;

    return (
        <div className="flex items-center justify-center rounded-box text-[14px] sm:text-lg sm:btn-lg h-[3rem] sm:h-[4rem] min-h-[3rem] sm:min-h-[4rem] bg-scordi-light-200 text-scordi-600 font-semibold shadow mb-6">
            {children}
        </div>
    );
});
