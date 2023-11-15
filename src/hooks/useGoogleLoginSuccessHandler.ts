import {useRouter} from 'next/router';
import {GoogleSignedUserData} from '^models/User/atom';
import {UserDto} from '^models/User/types';
import {getGoogleUserData, userSessionApi} from '^api/session.api';
import {setToken} from '^api/api';
import {useCurrentUser} from '^models/User/hook';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';
import {inviteMembershipApi} from '^api/membership.api';
import {V3OrgJoinErrorPageRoute} from '^pages/v3/orgs/[orgId]/error';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {GoogleAccessTokenData} from '^api/tasting.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useEffect} from 'react';

// v2 -> v3 로 넘어가면서 구글 사용자 인증 직후 가입정보가 없으면 리디렉션 되는 위치가 바뀌었습니다.
// import {UserSignUpPageRoute} from '^pages/users/signup'; // Deprecated.

/**
 * 전반적으로 이 함수를 쓰는 컴포넌트(Google Login Button)가 사용되는 페이지들이 많습니다.
 * 어디서 이 함수를 쓰는지에 대한 관리가 필요합니다.
 */
export const useGoogleLoginSuccessHandler = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [invitedOrgId, setInvitedOrgId] = useRecoilState(invitedOrgIdAtom);
    const router = useRouter();
    const {currentUser, setCurrentUser, loginRedirect, setAuthenticatedUserData} = useCurrentUser(null);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        setInvitedOrgId(orgId);
    }, [orgId]);

    // 추가정보 입력을 위해 가입페이지로 넘기는 함수.
    const moveToSignUpPage = (userData: GoogleSignedUserData) => {
        // 용도 불분명
        setAuthenticatedUserData(userData);
        // 용도 분명 -> sign/phone page 에서 google signedUserData 를 조회하여 가입 처리를 진행하기 때문.
        window.localStorage.setItem('scordi/tasting/gmailProfile', JSON.stringify(userData));

        // 초대된 유저에 대한 판단은 라우팅된 페이지에서 진행합니다.
        // accessTokenData 가 State 상에서 관리되고 있기 때문입니다.
        router.push(SignPhoneAuthPageRoute.path());
    };

    // 그냥 로그인 시키고 적절한 다음 페이지로 이동시키는 함수.
    const moveWithLogin = async (user: UserDto) => {
        localStorage.setItem('locale', user?.locale ?? 'ko');
        setCurrentUser(user);

        if (invitedOrgId) {
            const isInvited = await checkInvitedEmail(user, invitedOrgId);
            if (isInvited) {
                router.push(V3OrgHomePageRoute.path(invitedOrgId));
            } else {
                router.push(V3OrgJoinErrorPageRoute.path(invitedOrgId));
            }
        }
        loginRedirect(user);
    };

    // Org Join 페이지에서 로그인했을 경우 초대된 유저가 맞는지 확인하는 함수.
    const checkInvitedEmail = async (user: UserDto, invitedOrgId: number) => {
        const currentOrgId = Number(router.query.orgId);
        if (currentOrgId !== invitedOrgId) return false;

        try {
            const response = await inviteMembershipApi.index(invitedOrgId, encodeURI(user.email));
            if (response.status === 200) {
                await inviteMembershipApi.confirm(response.data.id);
                return true;
            }
        } catch {
            return false;
        }
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
    return async function googleLoginOnSuccess(accessToken: string) {
        // 토큰을 통해 구글 회원 정보를 불러온 뒤,
        const {data: googleSignedUserData} = await getGoogleUserData(accessToken);

        // 서버에 이 회원이 가입된 계정이 있는지 확인합니다.
        const jwtRequest = userSessionApi.createBySocialAccount({
            provider: 'google',
            uid: googleSignedUserData.id,
        });

        // 만약 가입된 계정이 있다면, 응답으로 토큰이 오는데
        jwtRequest.then(({data: {token}}) => {
            // 토큰으로 사용자를 조회한 뒤
            setToken(token);
            userSessionApi.index().then(({data: user}) => {
                user.phone
                    ? moveWithLogin(user) // 전화번호가 있으면 로그인 시키고
                    : moveToSignUpPage(googleSignedUserData); // 전화번호가 없으면 추가정보 입력을 위해 가입페이지로 넘깁니다.
            });
        });

        // 만약 가입된 계정이 없으면, 구글 회원 정보를 상태에 저장하고 추가정보 입력을 위해 가입페이지로 넘깁니다.
        jwtRequest.catch(() => moveToSignUpPage(googleSignedUserData));
    };
};
