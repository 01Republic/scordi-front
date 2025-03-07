import React, {memo, ReactNode} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {toast} from 'react-hot-toast';
import {currentUserAtom} from '^models/User/atom';
import {googleOAuth} from '^config/environments';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {MainPageRoute} from '^pages/index';
import {LinkTo, LinkToProps} from '^components/util/LinkTo';
import {Avatar} from '^components/Avatar';
import { Building, LogIn } from 'lucide-react';

export const InviteOrgErrorBody = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const router = useRouter();

    return (
        <div className="m-auto text-center py-32 flex flex-col gap-5">
            <h1>앗! 초대 권한이 없어요</h1>
            <h3 className="mb-5">
                초대 권한 확인이 필요해요
                <br /> 조직 관리자에게 문의 부탁드려요 😢
            </h3>

            <div className="flex flex-col gap-5 w-fit m-auto mb-10">
                <Button
                    text="스코디 메인 페이지로 이동하기"
                    icon={<LogIn size={20} />}
                    href={MainPageRoute.path()}
                />
                {currentUser?.lastSignedOrgId ? (
                    <Button
                        text="내 조직 워크스페이스로 이동하기"
                        icon={<Building size={20} />}
                        href={OrgMainPageRoute.path(currentUser.lastSignedOrgId!)}
                    />
                ) : (
                    <Button
                        text="내 조직 워크스페이스로 이동하기"
                        icon={<Building size={20} />}
                        onClick={() => toast.error('회원가입을 먼저 진행해주세요')}
                    />
                )}
                <button onClick={router.back} className="btn btn-link">
                    다른 계정으로 시도하기
                </button>
            </div>

            <div className="m-auto">
                <p className="mb-1">스코디가 처음이라면?</p>
                <GoogleOAuthProvider clientId={googleOAuth.loginClient.id}>
                    <GoogleLoginBtn about="login" />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
});

interface ButtonProps extends LinkToProps {
    text: string;
    icon: ReactNode;
}
const Button = (props: ButtonProps) => {
    const {text, icon, href, onClick, disabled} = props;

    return (
        <LinkTo
            href={href}
            onClick={onClick}
            className="btn flex items-center justify-center gap-2 text-[14px] sm:text-lg btn-lg h-[3rem] sm:h-[4rem] min-h-[3rem] sm:min-h-[4rem] sm:px-28 border border-gray-300 font-semibold"
            disabled={disabled}
        >
            <span>{icon}</span>
            <span>{text}</span>
        </LinkTo>
    );
};
