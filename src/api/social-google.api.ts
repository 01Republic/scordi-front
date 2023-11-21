import {api} from '^api/api';
import {oneDtoOf} from '^types/utils/response-of';
import {
    GoogleAccessTokenContainer,
    JwtContainer,
    UserDto,
    UserGoogleSocialSignUpInvitedRequestDto,
    UserGoogleSocialSignUpRequestDtoV2,
} from '^models/User/types';
import {ReportDto} from '^components/pages/LandingPages/TastingPage/tabs/type';

const makeHeaders = (accessToken: string) => ({'X-Google-Token': accessToken});

export const userSocialGoogleApi = {
    token(code: string) {
        const url = `/users/auth/social/google/token?code=${code}`;
        return api.get<GoogleAccessTokenContainer>(url).then((res) => res.data);
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

    subscriptions: {
        usageReport: {
            draft(token: string) {
                // 2023.01.01월 부터 조회
                const from = new Date(2023, 1, 1).toISOString();
                const url = `/subscriptions/usage-report/draft?from=${from}`;
                const headers = makeHeaders(token);
                return api.get<ReportDto>(url, {headers}).then(oneDtoOf(ReportDto));
            },
        },
    },
};
