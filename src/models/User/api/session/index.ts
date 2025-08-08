import {
    CreateUserDetailRequestDto,
    CreateUserDeviceRequestDto,
    CreateUserRequestDto,
    CreateUserResponseDto,
    SendPhoneAuthMessageDto,
    UpdateUserPasswordRequestDto,
    UserGoogleSocialSignUpInvitedRequestDto,
    UserSocialSignUpInvitedRequestDto,
    UsersWebpushRegisterDto,
    UsersWebpushTestDto,
} from '^models/User/types';
import {
    JwtContainer,
    UserDto,
    UserEditProfileRequestDto,
    UserLoginRequestDto,
    UserSocialLoginRequestDto,
    UserSocialSignUpRequestDto,
} from '^models/User/types';
import {api} from '^api/api';
import axios from 'axios';
import {GoogleSignedUserData} from '^models/User/atom';
import {oneDtoOf} from '^types/utils/response-of';

export const userSessionApi = {
    index: () => {
        const url = '/users/session';
        return api.get<UserDto>(url).then(oneDtoOf(UserDto));
    },

    create: (data: UserLoginRequestDto) => {
        const url = '/users/session';
        return api.post<JwtContainer>(url, data);
    },

    createBySocialAccount: (data: UserSocialLoginRequestDto) => {
        const url = '/users/session/social';
        return api.post<JwtContainer>(url, data);
    },

    update: () => {
        const url = '/users/session';
        return api.put<JwtContainer>(url);
    },
};

export const userApi = {
    registration: {
        // User 생성 (회원가입)
        create: (data: UserSocialSignUpRequestDto) => {
            const url = '/users';
            return api.post<UserDto>(url, data).then(oneDtoOf(UserDto));
        },

        // 내 정보 수정
        update: (data: UserEditProfileRequestDto) => {
            const url = `/users/my`;
            return api.patch(url, data).then(oneDtoOf(UserDto));
        },

        // 이메일로 화원가입 여부 확인
        find: (email: string) => {
            const url = `/users/find-by/${email}`;
            return api.get<UserDto>(url).then(oneDtoOf(UserDto));
        },
    },
};

export const getGoogleUserData = (accessToken: string) => {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;
    const headers = {Authorization: `Bearer ${accessToken}`, Accept: 'application/json'};
    return axios.get<GoogleSignedUserData>(url, {headers});
};

// TODO: 이 함수는 만료되었습니다. 이 엔드포인트는 서버에서 제거될 예정입니다. 아래 registerUsersWebpushDevice 를 사용해주세요.
export const patchUsersWebpushRegister = (data: UsersWebpushRegisterDto) => {
    return api.patch('/users/webpush/register', data);
};

export const registerUsersWebpushDevice = (data: CreateUserDeviceRequestDto) => {
    return api.post('/users/webpush/devices', data);
};

export const postUserWebpushTest = () => {
    return api.post<UsersWebpushTestDto>('/users/webpush/test');
};

export const createInvitedUser = (data: UserSocialSignUpInvitedRequestDto) => {
    return api.post<UserDto>('/users/invitation', data);
};

// 회원가입 플로우 개선 후 API
export const SignUserApi = {
    /* 회원가입 */
    createUser: (data: CreateUserRequestDto, accessToken?: string) => {
        const url = '/users/v2';
        const headers = accessToken ? {'X-GOOGLE-TOKEN': accessToken} : {};
        return api.post<CreateUserResponseDto>(url, data, {headers});
    },

    /* 초대 유저 회원가입 */
    invitedCreateUser: (data: UserGoogleSocialSignUpInvitedRequestDto, accessToken: string) => {
        const url = `/users/social/google/invited`;
        return api.post<UserDto>(url, data, {
            headers: {'X-GOOGLE-TOKEN': accessToken},
        });
    },

    /* 핸드폰 인증번호 요청 */
    postPhoneAuthSession: (data: SendPhoneAuthMessageDto) => {
        const url = '/users/auth/phone-auth-session';
        return api.post<boolean>(url, data);
    },

    /* 핸드폰 인증번호 확인 */
    patchPhoneAuthSession: (data: SendPhoneAuthMessageDto) => {
        const url = '/users/auth/phone-auth-session';
        return api.patch<boolean>(url, data);
    },

    /* 로그인 */
    login: (accessToken: string) => {
        const url = '/users/session/social/google';
        return api.get(url, {
            headers: {'X-GOOGLE-TOKEN': accessToken},
        });
    },

    /* 유저 상세 정보 생성 (유입경로) */
    createUserDetail: (data: CreateUserDetailRequestDto, userId: number) => {
        const url = `/users/${userId}/detail`;
        return api.post(url, data);
    },
};

export const userPasswordApi = {
    reset: (email: string) => {
        const url = `/users/${email}/password/reset`;
        return api.post(url);
    },

    validate: (token: string) => {
        const url = `/users/${encodeURIComponent(token)}/password/validate`;
        return api.get(url);
    },

    update: (token: string, data: UpdateUserPasswordRequestDto) => {
        const url = `/users/${encodeURIComponent(token)}/password`;
        return api.patch(url, data);
    },
};
