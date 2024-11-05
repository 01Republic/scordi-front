import React, {memo} from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOauthClientId} from '^api/tasting.api/gmail/constant';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {FaArrowRight} from 'react-icons/fa6';
import {useRecoilState, useRecoilValue} from 'recoil';
import {invitedOrgIdAtom, isCopiedAtom} from '^v3/V3OrgJoin/atom';
import {useGoogleLoginSuccessHandler2} from '^hooks/useGoogleLoginSuccessHandler2';
import {UserDto} from '^models/User/types';
import {useRouter} from 'next/router';
import {inviteMembershipApi} from '^models/Membership/api';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {orgIdParamState} from '^atoms/common';
import {useCurrentUser} from '^models/User/hook';
import {V3OrgJoinErrorPageRoute} from '^pages/v3/orgs/[orgId]/error';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';

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
                    <InvitedGoogleLoginButton />
                </div>
            </div>
        </div>
    );
});

const InvitedGoogleLoginButton = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [invitedOrgId, setInvitedOrgId] = useRecoilState(invitedOrgIdAtom);
    const isFromInviteLink = useRecoilValue(isCopiedAtom);
    const {setCurrentUser, loginRedirect} = useCurrentUser(null);
    const googleLoginOnSuccess = useGoogleLoginSuccessHandler2();
    const router = useRouter();

    console.log('invitedOrgId', invitedOrgId);
    console.log('isFromInviteLink', isFromInviteLink);

    // Org Join 페이지에서 로그인했을 경우 초대된 유저가 맞는지 확인하는 함수.
    const checkInvitedEmail = async (user: UserDto, invitedOrgId: number) => {
        // 초대 링크 통해서 들어온 유저는 초대된 유저인지 확인 안함
        if (isFromInviteLink) return true;

        if (orgId !== invitedOrgId) return false;

        return inviteMembershipApi
            .validate(invitedOrgId, user.email)
            .then(() => true)
            .catch(() => false);
    };

    // 초대 이메일을 확인처리 합니다.
    const confirmInviteEmail = async (user: UserDto) => {
        return inviteMembershipApi
            .validate(invitedOrgId, user.email)
            .then((res) => inviteMembershipApi.confirm(res.data.id))
            .then(() => setInvitedOrgId(() => 0));
    };

    const onSuccess = async (accessToken: string) => {
        // 로그인 처리 후
        googleLoginOnSuccess(accessToken, async (user?: UserDto) => {
            // 가입된 회원인 경우.
            if (user) {
                setCurrentUser(user);
                const invited = await checkInvitedEmail(user, invitedOrgId);
                if (!invited) return router.push(V3OrgJoinErrorPageRoute.path(invitedOrgId));

                await confirmInviteEmail(user);
                return router.push(OrgMainPageRoute.path(invitedOrgId));
            } else {
                // 가입된 회원이 아닌 경우. 전화번호 인증 페이지로 이동
                router.push(SignPhoneAuthPageRoute.path());
            }
            // // 초대된 멤버와 멤버십 데이터를 초대 롼료 상태로 올바르게 업데이트 합니다.
            // if (isFromInviteLink) {
            //     // 초대 링크를 통해 접속하는 유저는
            // }
            //
            // // 초대 이메일을 통해 접속하는 유저는
            // else {
            // }
        });
    };

    return (
        <GoogleOAuthProvider clientId={googleOauthClientId}>
            <GoogleLoginBtn
                about="login"
                className="btn-block justify-start relative"
                buttonText={
                    <span>
                        Google 계정으로 시작하기{' '}
                        <span className="absolute right-4">
                            <FaArrowRight />
                        </span>
                    </span>
                }
                onToken={onSuccess}
            />
        </GoogleOAuthProvider>
    );
});
