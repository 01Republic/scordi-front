import {api} from '^api/api';

export const slackScordiOauthApi = {
    // Slack OAuth 인증 페이지 URL
    authUrl(organizationId: number) {
        const url = `/slack/oauth/authorize`;
        const redirect = window.location.href;
        const params = {redirect, organizationId};
        return api.getUri({url, params});
    },
};
