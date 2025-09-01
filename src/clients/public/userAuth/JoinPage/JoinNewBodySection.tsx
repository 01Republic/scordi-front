import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {SignAuthCreateUserPageRoute} from '^pages/sign/createUser';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {UserAuthTitleSection} from '^clients/public/userAuth/common/UserAuthTitleSection';
import {EmailLoginButton} from '^clients/public/userAuth/UserSignUpPage/EmailLoginButton';
import {JoinGoogleLoginButton} from '^clients/public/userAuth/JoinPage/JoinGoogleLoginButton';

export const JoinNewBodySection = memo(() => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <NewLandingPageLayout pageName="joinpage" hideNav>
            <div className="flex items-center justify-center" style={{height: '100vh'}}>
                <div className="flex flex-col items-center justify-center w-[400px] gap-5">
                    <UserAuthTitleSection
                        text="초대를 받으셨군요!"
                        subTitle="소프트웨어 구독관리에 더 이상 시간 쓰지 마세요"
                    />
                    <EmailLoginButton
                        isLoading={isLoading}
                        buttonText="이메일로 시작하기"
                        onClick={() => {
                            setIsLoading(true);
                            router.push(SignAuthCreateUserPageRoute.path());
                        }}
                    />
                    <JoinGoogleLoginButton />
                </div>
            </div>
        </NewLandingPageLayout>
    );
});
