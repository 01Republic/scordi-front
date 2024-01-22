import React, {memo, ReactNode} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GoOrganization, GoSignIn} from 'react-icons/go';
import {useToast} from '^hooks/useToast';
import {currentUserAtom} from '^models/User/atom';
import {googleOauthClientId} from '^api/tasting.api/gmail/constant';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {MainPageRoute} from '^pages/index';

export const InviteOrgErrorBody = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const router = useRouter();
    const {toast} = useToast();

    const moveToMain = () => {
        if (!currentUser) return toast.error('가입된 조직이 없어요!');

        router.push(V3OrgHomePageRoute.path(currentUser.orgId));
    };

    return (
        <div className="m-auto text-center py-32 flex flex-col gap-5">
            <h1>앗! 초대 권한이 없어요</h1>
            <h3 className="mb-5">
                초대 권한 확인이 필요해요
                <br /> 담당자에게 문의 부탁드려요 😢
            </h3>

            <div className="flex flex-col gap-5 w-fit m-auto mb-10">
                <Button
                    text="스코디 메인 페이지로 이동하기"
                    icon={<GoSignIn size={20} />}
                    onClick={() => router.push(MainPageRoute.path())}
                />
                <Button
                    text="내 조직 워크스페이스로 이동하기"
                    icon={<GoOrganization size={20} />}
                    onClick={moveToMain}
                />
            </div>

            <div className="m-auto">
                <p className="mb-1">스코디가 처음이라면?</p>
                <GoogleOAuthProvider clientId={googleOauthClientId}>
                    <GoogleLoginBtn about="admin" />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
});

interface ButtonProps {
    text: string;
    icon: ReactNode;
    onClick: () => void;
}
const Button = (props: ButtonProps) => {
    const {text, icon, onClick} = props;

    return (
        <button
            onClick={() => onClick()}
            className="btn flex items-center justify-center gap-2 text-[14px] sm:text-lg btn-lg h-[3rem] sm:h-[4rem] min-h-[3rem] sm:min-h-[4rem] sm:px-28 border border-gray-300 font-semibold"
        >
            <span>{icon}</span>
            <span>{text}</span>
        </button>
    );
};
