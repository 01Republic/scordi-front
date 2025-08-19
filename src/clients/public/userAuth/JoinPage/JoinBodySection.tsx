import React, {memo} from 'react';
import {deployEnv} from '^config/environments';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {UserAuthTitleSection} from '^clients/public/userAuth/common/UserAuthTitleSection';
import {EmailLoginSection} from '^clients/public/userAuth/LoginPage/EmailLoginSection';
import {JoinGoogleLoginButton} from '^clients/public/userAuth/JoinPage/JoinGoogleLoginButton';

export const JoinBodySection = memo(() => {
    const isNotProduction = deployEnv !== 'production';
    return (
        <NewLandingPageLayout pageName="joinpage" hideNav>
            <div className="flex items-center justify-center" style={{height: '100vh'}}>
                <div className="flex flex-col items-center justify-center w-[400px] gap-5">
                    <UserAuthTitleSection
                        text="초대를 받으셨군요!"
                        subTitle="소프트웨어 구독관리에 더 이상 시간 쓰지 마세요"
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
                    <JoinGoogleLoginButton />
                </div>
            </div>
        </NewLandingPageLayout>
    );
});
