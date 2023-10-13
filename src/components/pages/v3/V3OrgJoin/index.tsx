import React, {memo} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {MobileSection} from '^v3/share/sections/MobileSection';

export const V3OrgJoin = memo(() => {
    const googleOauthClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!;

    return (
        <div className={styles.viewport}>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout}`}>
                <MobileSection.Padding>
                    <div className="text-center gap-5 flex flex-col py-32 h-full">
                        <div className="w-1/2 m-auto">
                            <img
                                src="/images/logo/scordi/jpg/symbol_and_text/symbol_and_text--primary_black.jpg"
                                alt="scordi_logo"
                            />
                        </div>
                        <h3 className="mb-10">스코디에 오신걸 환영합니다!</h3>
                        <p>로그인 후 조직에 참가하세요</p>
                        <div className="w-4/5 m-auto">
                            <GoogleOAuthProvider clientId={googleOauthClientId}>
                                <GoogleLoginBtn />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </MobileSection.Padding>
            </div>
        </div>
    );
});
