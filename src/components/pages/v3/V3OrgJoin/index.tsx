import React, {memo, useEffect} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {WithChildren} from '^types/global.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {googleOauthClientId} from '^api/tasting.api/gmail/constant';

export const V3OrgJoin = memo(() => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);

    if (!orgId || isNaN(orgId)) return <></>;

    return (
        <div className={styles.viewport}>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout}`}>
                <MobileSection.Padding>
                    <div className="m-auto text-center py-32 flex flex-col gap-5">
                        <h1>스코디 시작하기</h1>
                        <h3 className="mb-5">
                            반가워요, 고객님!
                            <span className="block">스코디를 이렇게 이용해보세요 🙂</span>
                        </h3>
                        <div className="w-fit m-auto">
                            <Slot>📲 회사에서 이용중인 앱이 있다면 모두 등록 해주세요</Slot>
                            <Slot>📨 구글 이메일로 1분만에 앱을 등록해서 관리 할 수 있어요</Slot>
                            <Slot>👥 팀별로 어떤 앱을 쓰고 있는지 한 눈에 확인할 수 있어요</Slot>
                        </div>
                        <div className="w-fit m-auto">
                            <p className="mb-1">로그인 후 스코디 이용하기</p>
                            <GoogleOAuthProvider clientId={googleOauthClientId}>
                                <GoogleLoginBtn about="gmail" />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </MobileSection.Padding>
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
