import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {ArrowRight} from 'lucide-react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOAuth} from '^config/environments';
import {SignAuthCreateUserPageRoute} from '^pages/sign/createUser';
import {useCurrentUser} from '^models/User/hook';
import {Modal} from '^components/Modal';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {UserAuthTitleSection} from '../common/UserAuthTitleSection';
import {GoogleLoginBtn} from '../common/GoogleLoginBtn';
import {EmailLoginButton} from '^clients/public/userAuth/UserSignUpPage/EmailLoginButton';

export const UserSignUpPage = memo(() => {
    const isNotProduction = process.env.NEXT_PUBLIC_APP_STAGE === 'staging' || 'development';
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {currentUser, loginRedirect} = useCurrentUser();

    if (currentUser) loginRedirect(currentUser);

    return (
        <LandingPageLayout pageName="Login" hideNav hideFooter>
            <GoogleOAuthProvider clientId={googleOAuth.loginClient.id}>
                <div className={'flex items-center justify-center'} style={{minHeight: '100vh'}}>
                    <div className="flex flex-col items-center justify-center w-[400px] gap-5">
                        <UserAuthTitleSection text="팀 생산성을 높이는 소프트웨어 구독 비용 관리" />

                        {/* 이메일 회원가입 */}
                        {isNotProduction && (
                            <EmailLoginButton
                                onClick={() => router.push(SignAuthCreateUserPageRoute.path())}
                                buttonText="이메일로 시작하기"
                            />
                        )}

                        {/* 구글 회원가입 */}
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
