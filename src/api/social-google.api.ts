import {api} from '^api/api';
import {
    JwtContainer,
    UserDto,
    UserGoogleSocialSignUpInvitedRequestDto,
    UserGoogleSocialSignUpRequestDtoV2,
} from '^types/user.type';
import {oneDtoOf} from '^types/utils/response-of';

export const userSocialGoogleApi = {
    google(code: string) {
        const url = `/users/session/social/google`;
        return api.post<JwtContainer>(url, {code});
    },

    googleSignUp(data: UserGoogleSocialSignUpRequestDtoV2) {
        const url = `/users/social/google`;
        return api.post<UserDto>(url, data).then(oneDtoOf(UserDto));
    },

    googleSignUpInvited(data: UserGoogleSocialSignUpInvitedRequestDto) {
        const url = `/users/social/google/invited`;
        return api.post<UserDto>(url, data).then(oneDtoOf(UserDto));
    },

    findSocialUserByCode(code: string) {
        const url = `/users/social/find-by/${code}`;
        return api.get<UserDto>(url).then(oneDtoOf(UserDto));
    },
};
