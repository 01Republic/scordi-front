import React, {memo} from 'react';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {UserAuthTitleSection} from '^clients/public/userAuth/common/UserAuthTitleSection';
import {EmailLoginSection} from '^clients/public/userAuth/LoginPage/EmailLoginSection';
import {JoinGoogleLoginButton} from '^clients/public/userAuth/JoinPage/JoinGoogleLoginButton';

export const JoinBodySection = memo(() => {
    return (
        <NewLandingPageLayout pageName="joinpage" hideNav>
            <div className="flex items-center justify-center" style={{height: '100vh'}}>
                <div className="flex flex-col items-center justify-center w-[400px] gap-5">
                    <UserAuthTitleSection
                        text="초대를 받으셨군요!"
                        subTitle="소프트웨어 구독관리에 더 이상 시간 쓰지 마세요"
                    />
                    <EmailLoginSection />
                    <div className="w-full h-px bg-gray-200" />
                    <JoinGoogleLoginButton />
                </div>
            </div>
        </NewLandingPageLayout>
    );
});
