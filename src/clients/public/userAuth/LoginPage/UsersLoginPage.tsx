import React, {memo, useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {deployEnv, googleOAuth} from '^config/environments';
import {useCurrentUser} from '^models/User/hook';
import {Modal} from '^components/Modal';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {UserAuthTitleSection} from '../common/UserAuthTitleSection';
import {GoogleLoginBtn} from '../common/GoogleLoginBtn';
import {EmailLoginSection} from '^clients/public/userAuth/LoginPage/EmailLoginSection';

export const UsersLoginPage = memo(() => {
    const isNotProduction = deployEnv !== 'production';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {currentUser, loginRedirect} = useCurrentUser();

    if (currentUser) loginRedirect(currentUser);

    return (
        <LandingPageLayout pageName="Login" hideNav hideFooter>
            <div className={'flex items-center justify-center'} style={{minHeight: '100vh'}}>
                <div className="flex flex-col items-center justify-center w-[400px] gap-8">
                    <UserAuthTitleSection
                        text="팀 생산성을 높이는 소프트웨어 구독 비용 관리"
                        subTitle="팀 생산성을 높이는 소프트웨어 구독 비용 관리"
                    />

                    {/* 이메일 로그인
                    스테이징 환경에서만 이메일 로그인이 가능합니다.
                    */}
                    {isNotProduction && (
                        <>
                            <EmailLoginSection />
                            <div className="w-full h-px bg-gray-200" />
                        </>
                    )}

                    {/* 구글 로그인 */}
                    <GoogleOAuthProvider clientId={googleOAuth.loginClient.id}>
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
                    </GoogleOAuthProvider>
                </div>
            </div>

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
