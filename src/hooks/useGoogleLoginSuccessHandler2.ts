import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue} from 'recoil';
import {setToken} from '^api/api';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';
import {V3OrgJoinErrorPageRoute} from '^pages/v3/orgs/[orgId]/error';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {invitedOrgIdAtom, isCopiedAtom} from '^v3/V3OrgJoin/atom';
import {userSocialGoogleApi} from '^api/social-google.api';
import {useCurrentUser} from '^models/User/hook';
import {UserDto} from '^models/User/types';
import {inviteMembershipApi} from '^models/Membership/api';
import {userSessionApi} from '^models/User/api/session';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {SignAuthCreateUserPageRoute} from '^pages/sign/createUser';

// v2 -> v3 로 넘어가면서 구글 사용자 인증 직후 가입정보가 없으면 리디렉션 되는 위치가 바뀌었습니다.
// import {UserSignUpPageRoute} from '^pages/users/signup'; // Deprecated.

/**
 * 전반적으로 이 함수를 쓰는 컴포넌트(Google Login Button)가 사용되는 페이지들이 많습니다.
 * 어디서 이 함수를 쓰는지에 대한 관리가 필요합니다.
 */
export const useGoogleLoginSuccessHandler2 = () => {
    // const orgId = useRecoilValue(orgIdParamState);
    const [invitedOrgId, setInvitedOrgId] = useRecoilState(invitedOrgIdAtom);
    const [isCopied, setIsCopied] = useRecoilState(isCopiedAtom);
    const {setCurrentUser, loginRedirect} = useCurrentUser(null);
    const router = useRouter();

    // 추가정보 입력을 위해 가입페이지로 넘기는 함수.
    const moveToSignUpPage = () => router.push(SignAuthCreateUserPageRoute.path());

    // 그냥 로그인 시키고 적절한 다음 페이지로 이동시키는 함수.
    const moveWithLogin = async (user: UserDto) => {
        localStorage.setItem('locale', user?.locale ?? 'ko');
        setCurrentUser(user);

        if (!invitedOrgId) return;

        const isInvited = await checkInvitedEmail(user, invitedOrgId);
        if (isInvited) return router.push(OrgMainPageRoute.path(invitedOrgId));
        if (!isInvited) return router.push(V3OrgJoinErrorPageRoute.path(invitedOrgId));

        loginRedirect(user);
    };

    // Org Join 페이지에서 로그인했을 경우 초대된 유저가 맞는지 확인하는 함수.
    const checkInvitedEmail = async (user: UserDto, invitedOrgId: number) => {
        // 초대 링크 통해서 들어온 유저는 초대된 유저인지 확인 안함
        if (isCopied) return true;

        // if (orgId !== invitedOrgId) return false;

        return inviteMembershipApi
            .validate(invitedOrgId, user.email)
            .then(() => true)
            .catch(() => false);
    };

    /**
     * googleLoginOnSuccess
     * 구글로 사용자 인증에 성공했을 때, 후속 로직이 코드가 길어서 별도로 분리했습니다.
     * ---
     *  ex.
     *
     *      const googleLoginOnSuccess = useGoogleLoginSuccessHandler();
     *
     *      const loginButtonOnClick = useGoogleLogin({
     *         onSuccess: async (response) => {
     *             await googleLoginOnSuccess(response.access_token);
     *         },
     *         onError: (error) => {
     *             console.log(error);
     *         },
     *     });
     *
     */
    return async function googleLoginOnSuccess(accessToken: string, callbackFn?: (user?: UserDto) => any) {
        // 토큰을 통해 구글 회원 정보를 불러온 뒤,
        // const {data: googleSignedUserData} = await getGoogleUserData(code);

        // 서버에 이 회원이 가입된 계정이 있는지 확인합니다.
        await userSocialGoogleApi
            .login(accessToken)
            // 만약 가입된 계정이 있다면, 응답으로 토큰이 오는데
            .then(({data: {token}}) => {
                // 토큰으로 사용자를 조회한 뒤
                setToken(token);
                userSessionApi.index().then(({data: user}) => {
                    localStorage.setItem('locale', user?.locale ?? 'ko');
                    if (callbackFn) {
                        callbackFn(user);
                    } else {
                        user.phone
                            ? moveWithLogin(user) // 전화번호가 있으면 로그인 시키고
                            : moveToSignUpPage(); // 전화번호가 없으면 추가정보 입력을 위해 가입페이지로 넘깁니다.
                    }
                });
            })

            // 만약 가입된 계정이 없으면, 구글 회원 정보를 상태에 저장하고 추가정보 입력을 위해 가입페이지로 넘깁니다.
            .catch(() => {
                localStorage.setItem('accessToken', accessToken);
                if (callbackFn) {
                    callbackFn();
                } else {
                    moveToSignUpPage();
                }
            });
    };
};
