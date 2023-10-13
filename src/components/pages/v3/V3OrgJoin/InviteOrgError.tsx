import React, {memo} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOauthClientId} from '^api/tasting.api/gmail/constant';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {DefaultButton} from '^components/Button';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {MobileSection} from '^v3/share/sections/MobileSection';

export const V3InviteOrgError = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const router = useRouter();

    return (
        <div className={styles.viewport}>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout}`}>
                <MobileSection.Padding>
                    <div className="h-full py-32 flex flex-col gap-5 text-center">
                        <div className="w-1/2 m-auto">
                            <img
                                src="/images/logo/scordi/jpg/symbol_and_text/symbol_and_text--primary_black.jpg"
                                alt="scordi_logo"
                            />
                        </div>
                        <h3 className="mb-10">초대 권한을 확인해주세요</h3>
                        <div className="flex flex-col gap-3 w-2/3 m-auto">
                            {currentUser && (
                                <>
                                    <p>이미 가입된 조직이 있습니다</p>
                                    <DefaultButton
                                        text="내 조직 워크스페이스로 이동하기"
                                        onClick={() => router.push(V3OrgHomePageRoute.path(currentUser.orgId))}
                                    />
                                </>
                            )}

                            <p className="mt-3">스코디가 처음이라면?</p>
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
