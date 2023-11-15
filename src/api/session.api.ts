import {
    CreateUserDeviceRequestDto,
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
import {api} from './api';
import axios from 'axios';
import {GoogleSignedUserData} from '^models/User/atom';

export const userSessionApi = {
    index: () => {
        const url = '/users/session';
        return api.get<UserDto>(url);
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

export const user = {
    create: (data: UserSocialSignUpRequestDto) => {
        const url = '/users';
        return api.post<UserDto>(url, data);
    },

    update: (data: UserEditProfileRequestDto) => {
        const url = `/users/my`;
        return api.patch(url, data);
    },

    find: (email: string) => {
        const url = `/users/find-by/${email}`;
        return api.get<UserDto>(url);
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
