import {useRouter} from 'next/router';
import {GoogleSignedUserData} from '^atoms/currentUser.atom';
import {UserDto} from '^types/user.type';
import {getGoogleUserData, getUserSession, postUserSessionBySocialAccount} from '^api/session.api';
import {setToken} from '^api/api';
import {useCurrentUser} from '^hooks/useCurrentUser';

// v2 -> v3 로 넘어가면서 구글 사용자 인증 직후 가입정보가 없으면 리디렉션 되는 위치가 바뀌었습니다.
// import {UserSignUpPageRoute} from '^pages/users/signup'; // Deprecated.
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';

export const useGoogleLoginSuccessHandler = () => {
    const router = useRouter();
    const {setCurrentUser, loginRedirect, setAuthenticatedUserData} = useCurrentUser(null);

    // 추가정보 입력을 위해 가입페이지로 넘기는 함수.
    const moveToSignUpPage = (data: GoogleSignedUserData) => {
        setAuthenticatedUserData(data);
        router.push(SignPhoneAuthPageRoute.path());
    };

    // 그냥 로그인 시키고 적절한 다음 페이지로 이동시키는 함수.
    const moveWithLogin = (user: UserDto) => {
        setCurrentUser(user);
        loginRedirect(user);
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
        const jwtRequest = postUserSessionBySocialAccount({
            provider: 'google',
            uid: googleSignedUserData.id,
        });

        // 만약 가입된 계정이 있다면, 응답으로 토큰이 오는데
        jwtRequest.then(({data: {token}}) => {
            // 토큰으로 사용자를 조회한 뒤
            setToken(token);
            getUserSession().then(({data: user}) => {
                user.phone
                    ? moveWithLogin(user) // 전화번호가 있으면 로그인 시키고
                    : moveToSignUpPage(googleSignedUserData); // 전화번호가 없으면 추가정보 입력을 위해 가입페이지로 넘깁니다.
            });
        });

        // 만약 가입된 계정이 없으면, 구글 회원 정보를 상태에 저장하고 추가정보 입력을 위해 가입페이지로 넘깁니다.
        jwtRequest.catch(() => moveToSignUpPage(googleSignedUserData));
    };
};
