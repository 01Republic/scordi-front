import {api} from '^api/api';

export const slackScordiOauthApi = {
    // Slack OAuth 인증 페이지 리다이렉션
    authorize(organizationId: number) {
        const url = `/slack/oauth/authorize`;
        const redirect = window.location.href;
        const params = {redirect, organizationId};
        window.location.href = api.getUri({url, params});
    },
};
