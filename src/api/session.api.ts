import {
    JwtContainer,
    UserDto,
    UserEditProfileRequestDto,
    UserLoginRequestDto,
    UserSocialLoginRequestDto,
} from '^types/user.type';
import {api} from './api';
import axios from 'axios';
import {GoogleSignedUserData} from '^atoms/currentUser.atom';

export const postUserSession = (data: UserLoginRequestDto) => {
    return api.post<JwtContainer>('/users/session', data);
};

export const postUserSessionBySocialAccount = (data: UserSocialLoginRequestDto) => {
    return api.post<JwtContainer>('/users/session/social', data);
};

export const getUserSession = () => {
    return api.get<UserDto>('/users/session');
};

export const putUserSession = () => {
    return api.put<JwtContainer>('/users/session');
};

export const postUser = (data: UserLoginRequestDto) => {
    return api.post<UserDto>('/users', data);
};

export const modifyUser = (data: UserEditProfileRequestDto) => {
    return api.patch(`/users/my`, data);
};

export const getGoogleUserData = (accessToken: string) => {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;
    const headers = {Authorization: `Bearer ${accessToken}`, Accept: 'application/json'};
    return axios.get<GoogleSignedUserData>(url, {headers});
};
