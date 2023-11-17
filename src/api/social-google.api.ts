import {api} from '^api/api';
import {oneDtoOf} from '^types/utils/response-of';
import {
    JwtContainer,
    UserDto,
    UserGoogleSocialSignUpInvitedRequestDto,
    UserGoogleSocialSignUpRequestDtoV2,
} from '^models/User/types';

const makeHeaders = (accessToken: string) => ({'X-Google-Token': accessToken});

export const userSocialGoogleApi = {
    token(code: string) {
        const url = `/users/auth/social/google/token?code=${code}`;
        return api.get<string>(url).then((res) => res.data);
    },

    login(token: string) {
        const url = `/users/session/social/google`;
        const headers = makeHeaders(token);
        return api.get<JwtContainer>(url, {headers});
    },

    signUp(token: string, data: UserGoogleSocialSignUpRequestDtoV2) {
        const url = `/users/social/google`;
        const headers = makeHeaders(token);
        return api.post<UserDto>(url, data, {headers}).then(oneDtoOf(UserDto));
    },

    signUpInvited(token: string, data: UserGoogleSocialSignUpInvitedRequestDto) {
        const url = `/users/social/google/invited`;
        const headers = makeHeaders(token);
        return api.post<UserDto>(url, data, {headers}).then(oneDtoOf(UserDto));
    },

    show(token: string) {
        const url = `/users/social/google`;
        const headers = makeHeaders(token);
        return api.get<UserDto>(url, {headers}).then(oneDtoOf(UserDto));
    },
};
