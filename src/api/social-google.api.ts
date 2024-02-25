import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    GoogleAccessTokenContainer,
    JwtContainer,
    UserDto,
    UserGoogleSocialSignUpInvitedRequestDto,
    UserGoogleSocialSignUpRequestDtoV2,
} from '^models/User/types';
import {ReportDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report.dto';
import {TeamMemberDto} from '^models/TeamMember/type';
import {Paginated} from '^types/utils/paginated.dto';
import {SaveTokenReportRequestDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/save.report.request.dto';

const makeHeaders = (accessToken: string) => ({'X-Google-Token': accessToken});

export const userSocialGoogleApi = {
    token(dto: GoogleAccessTokenQueryDto) {
        const url = `/users/auth/social/google/token?${makeQueryString(dto)}`;
        // 쿠키를 Request에 담을 수 있도록 설정합니다.
        return api.get<GoogleAccessTokenContainer>(url, {withCredentials: true}).then((res) => res.data);
    },

    login(token: string) {
        const url = `/users/session/social/google`;
        const headers = makeHeaders(token);
        return api.get<JwtContainer>(url, {headers});
    },

    // User 생성 (회원가입) - 구글
    signUp(token: string, data: UserGoogleSocialSignUpRequestDtoV2) {
        const url = `/users/social/google`;
        const headers = makeHeaders(token);
        return api.post<UserDto>(url, data, {headers}).then(oneDtoOf(UserDto));
    },

    // User 생성 (회원가입) - 구글 & 초대
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
                const from = new Date(2023, 0, 1).toISOString();
                const url = `/subscriptions/usage-report/draft?from=${from}`;
                const headers = makeHeaders(token);
                return api.get<ReportDto>(url, {headers}).then(oneDtoOf(ReportDto));
            },
            save(token: string, dto: SaveTokenReportRequestDto) {
                const url = `/subscriptions/usage-report`;
                const headers = makeHeaders(token);
                return api.post<Paginated<TeamMemberDto>>(url, {...dto}, {headers}).then(paginatedDtoOf(TeamMemberDto));
            },
            save2(dto: SaveTokenReportRequestDto) {
                const url = `/subscriptions/usage-report/v2`;
                return api.post<Paginated<TeamMemberDto>>(url, {...dto}).then(paginatedDtoOf(TeamMemberDto));
            },
        },
    },
};

export type GoogleAccessTokenQueryDto = {
    code: string;
    feature?: 'login' | 'gmail' | 'admin';
};

const makeQueryString = (dto: GoogleAccessTokenQueryDto) => {
    const {code, feature} = dto;
    const query = new URLSearchParams({code});
    if (feature) query.append('feature', feature);
    return query.toString();
};
