import {UsersWebpushRegisterDto, UsersWebpushTestDto} from './../types/user.type';
import {
    JwtContainer,
    UserDto,
    UserEditProfileRequestDto,
    UserLoginRequestDto,
    UserSocialLoginRequestDto,
    UserSocialSignUpRequestDto,
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

export const postUser = (data: UserSocialSignUpRequestDto) => {
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

export const patchUsersWebpushRegister = (data: UsersWebpushRegisterDto) => {
    return api.patch('/users/webpush/register', data);
};

export const postUserWebpushTest = () => {
    return api.post<UsersWebpushTestDto>('/users/webpush/test');
};
