import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {currentUserAtom} from '^models/User/atom';
import {googleOauthClientId} from '^api/tasting.api/gmail/constant';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {MobileSection} from '^v3/share/sections/MobileSection';

export const V3InviteOrgError = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const router = useRouter();

    const moveToMain = () => {
        if (!currentUser) return;
        router.push(V3OrgHomePageRoute.path(currentUser.orgId));
    };

    return (
        <div className={styles.viewport}>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout}`}>
                <MobileSection.Padding>
                    <div className="m-auto text-center py-32 flex flex-col gap-5">
                        <h1>권한 확인이 필요해요</h1>
                        <h3 className="mb-5">
                            초대 권한이 없네요! <br /> 담당자에게 문의 부탁드려요 😢
                        </h3>
                        <div className="w-4/5 m-auto">
                            <Slot onClick={() => router.push('/')}> 📲 스코디 메인 페이지로 이동하기</Slot>
                            {currentUser && <Slot onClick={moveToMain}> 🙌 내 조직 워크스페이스로 이동하기</Slot>}
                        </div>

                        <div className="m-auto">
                            <p className="mb-1">스코디가 처음이라면?</p>
                            <GoogleOAuthProvider clientId={googleOauthClientId}>
                                <GoogleLoginBtn about="admin" />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </MobileSection.Padding>
            </div>
        </div>
    );
});

interface SlotProps {
    children: string;
    onClick?: () => void;
}
export const Slot = memo((props: SlotProps) => {
    const {children, onClick} = props;

    return (
        <button
            onClick={onClick}
            className="btn w-full flex items-center justify-center rounded-box text-[14px] sm:text-lg sm:btn-lg h-[3rem] sm:h-[4rem] min-h-[3rem] sm:min-h-[4rem] bg-scordi-light-200 text-scordi-600 font-semibold shadow mb-6"
        >
            {children}
        </button>
    );
});
