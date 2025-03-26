import React, {memo, useState} from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {ArrowRight} from 'lucide-react';
import {useCurrentUser} from '^models/User/hook';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {googleOAuth} from '^config/environments';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {Modal} from '^components/Modal';

export const UserSignUpPage = memo(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {currentUser, loginRedirect} = useCurrentUser();

    if (currentUser) loginRedirect(currentUser);

    return (
        <LandingPageLayout pageName="Login" hideNav hideFooter>
            <GoogleOAuthProvider clientId={googleOAuth.loginClient.id}>
                <div className={'flex items-center justify-center'} style={{minHeight: '100vh'}}>
                    <div className="flex flex-col items-center justify-center w-[400px] gap-5">
                        <section className="flex flex-col items-center justify-center gap-1">
                            <h1
                                className="text-gradient-color"
                                style={{background: 'linear-gradient(to right, #5c5fee, #a5a6f5)'}}
                            >
                                SaaS 관리는 스코디
                            </h1>
                            <p className="text-14 font-semibold text-gray-500">
                                팀 생산성을 높이는 소프트웨어 구독 비용 관리
                            </p>
                        </section>
                        <GoogleLoginBtn
                            about="login"
                            className="btn-block justify-start relative"
                            buttonText={
                                <span>
                                    Google 계정으로 시작하기
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
