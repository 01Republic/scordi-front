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
import {FaArrowRight} from 'react-icons/fa6';

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

                <div className={'flex items-center justify-center'} style={{minHeight: '80vh'}}>
                    {/*<form onSubmit={form.handleSubmit(submit)}>*/}
                    <div className="m-auto text-center w-[400px]">
                        {/*<img src="/logo-sign_in_page.png" alt="" />*/}
                        <h1
                            className="mb-1 text-gradient-color"
                            style={{background: 'linear-gradient(to right, #5c5fee, #a5a6f5)'}}
                        >
                            SaaS 관리는 스코디
                        </h1>
                        <p className="mb-5 text-14 font-semibold text-gray-500">
                            팀 생산성을 높이는 소프트웨어 구독 비용 관리
                        </p>

                        <div className="pb-14">
                            <GoogleLoginBtn
                                about="gmail"
                                className="btn-block justify-start relative"
                                buttonText={
                                    <span>
                                        Google 계정으로 시작하기{' '}
                                        <span className="absolute right-4">
                                            <FaArrowRight />
                                        </span>
                                    </span>
                                }
                            />
                        </div>
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
