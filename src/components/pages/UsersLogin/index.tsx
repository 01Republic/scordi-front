import React, {memo, useState} from 'react';
import Image from 'next/image';
import {GoogleOAuthProvider} from '@react-oauth/google';
import scordiLogo from '../../../../public/images/renewallogo/scordi-symbol-logo.png';
import scordiTextLogo from '../../../../public/images/renewallogo/scordi-text-loco.png';
import {useCurrentUser} from '^models/User/hook';
import {Modal} from '^components/Modal';
import {GoogleLoginBtn} from './GoogleLoginBtn';
import {WithChildren} from '^types/global.type';
import {googleOAuth} from '^config/environments';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {ArrowRight} from 'lucide-react';

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
        <LandingPageLayout pageName="Login" hideNav hideFooter>
            <GoogleOAuthProvider clientId={googleOAuth.loginClient.id}>
                <div className={'flex items-center justify-center'} style={{minHeight: '100vh'}}>
                    {/*<form onSubmit={form.handleSubmit(submit)}>*/}
                    <div className="flex flex-col items-center justify-center w-[400px] gap-10">
                        {/*<img src="/logo-sign_in_page.png" alt="" />*/}
                        <section className="flex items-center justify-center gap-3">
                            <Image src={scordiLogo} alt="scordiLogo" width={40} height={40} priority />
                            <Image src={scordiTextLogo} alt="scordiLogo" width={140} height={36} priority />
                        </section>

                        <GoogleLoginBtn
                            about="login"
                            className="btn-block justify-start relative"
                            buttonText={
                                <span>
                                    Google 계정으로 로그인
                                    <span className="absolute right-4">
                                        <ArrowRight />
                                    </span>
                                </span>
                            }
                        />
                    </div>
                    {/*</form>*/}
                </div>
            </GoogleOAuthProvider>

            <Modal
                type={'info'}
                isOpen={isModalOpen}
                title={'Login failed'}
                description={'Create a Google Account'}
                buttons={[{text: 'Try again', onClick: () => setIsModalOpen(false)}]}
            />
        </LandingPageLayout>
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
