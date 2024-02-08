import React, {memo} from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOauthClientId} from '^api/tasting.api/gmail/constant';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {WithChildren} from '^types/global.type';
import {FaArrowRight} from 'react-icons/fa6';

export const JoinPageBody = memo(() => {
    return (
        <div className="flex items-center justify-center" style={{height: '100vh'}}>
            <div className="m-auto text-center min-w-[400px]">
                <h1
                    className="mb-1 text-gradient-color"
                    style={{background: 'linear-gradient(to right, #5c5fee, #a5a6f5)'}}
                >
                    초대를 받으셨군요!
                </h1>
                <p className="mb-5 text-14 font-semibold text-gray-500">
                    소프트웨어 구독관리에 더 이상 시간 쓰지 마세요
                </p>
                <div className="pb-20">
                    <GoogleOAuthProvider clientId={googleOauthClientId}>
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
                    </GoogleOAuthProvider>
                </div>
            </div>
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
