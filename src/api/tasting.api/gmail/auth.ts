import {googleOauthClientId, googleOauthClientSecret} from './constant';
import {NextRouter} from 'next/router';
import axios from 'axios';
import Qs from 'qs';

const buildUrl = (baseUrl: string, params: Record<string, any>) => {
    const queryString = Object.entries(params)
        .map(([k, v]) => [k, v].join('='))
        .join('&');
    return [baseUrl, queryString].join('?');
};

function getExpireAtFromSecond(expiresIn: number) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expiresIn);
    return date;
}

// 구글 로그인 버튼 클릭시 구글로그인 창 호출. (지메일 권한을 포함해서 토큰을 얻어옴)
export function googleAuthForGmail() {
    const baseUrl: string = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = {
        scope: 'https://mail.google.com',
        access_type: 'offline',
        include_granted_scopes: true,
        response_type: 'code',
        // response_type: 'token',
        /**
         prompt=content 옵션은 refreshToken 을 발급해주나 매번 재로그인을 요구함.
         * 실제 서비스 환경에서는 불편할 수 있음.
         */
        prompt: 'consent',
        redirect_uri: `${process.env.NEXT_PUBLIC_SERVICE_HOST}/tasting`,
        client_id: googleOauthClientId,
    };
    const url = buildUrl(baseUrl, params);
    window.open(url, '_self');
}

export type GoogleAccessTokenData = {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expireAt: Date; // 응답을 받은 직후 expire_in 을 통해 계산해서 세팅함.
};

export async function getGoogleAccessTokenByCode(code: string) {
    const baseUrl: string = 'https://oauth2.googleapis.com/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
    };
    const body = Qs.stringify({
        code,
        client_id: googleOauthClientId,
        client_secret: googleOauthClientSecret,
        redirect_uri: `${process.env.NEXT_PUBLIC_SERVICE_HOST}/tasting`,
        grant_type: 'authorization_code',
    });
    return axios.post<GoogleAccessTokenData>(baseUrl, body, {headers}).then((res) => {
        const data = {...res.data};
        data.expireAt = getExpireAtFromSecond(res.data.expires_in);
        return data;
    });
}

export type GoogleRefreshedTokenData = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    expireAt: Date; // 응답을 받은 직후 expire_in 을 통해 계산해서 세팅함.
};

export async function getGoogleAccessTokenByRefreshToken(refreshToken: string) {
    const baseUrl: string = 'https://oauth2.googleapis.com/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
    };
    const body = Qs.stringify({
        client_id: googleOauthClientId,
        client_secret: googleOauthClientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
    });
    return axios.post<GoogleRefreshedTokenData>(baseUrl, body, {headers}).then((res) => {
        const data = {...res.data};
        data.expireAt = getExpireAtFromSecond(res.data.expires_in);
        return data;
    });
}

/**
 * 구글로그인 이후 콜백으로 돌아왔을때,
 * 라우터에서 Query 가 아닌 #access_token 으로 콜백을 받는 경우,
 * 이를 분석하여 토큰을 반환합니다.
 *
 * ---
 *
 * ### 사용하지 않게 된 이유
 * * googleAuthForGmail() 에서 response_type: 'token' 일 때 사용되었으나,
 *   refresh_token 을 활용한 토큰 만료시 갱신 기능을 위해 response_type: 'code' 를 사용하게 됨으로써
 *   현재는 아래 코드를 사용하지 않습니다.
 *
 * ### 남겨둔 이유
 * * router.asPath 로 부터 키/값 쌍을 객체화 하여 가져오는 코드를 구현하고 있습니다.
 *   당장에 사용되는 곳은 없으나 혹시 나중에 필요하면 참고하기 위해 코드를 남겨둡니다.
 */
// export function getAccessTokenOnRouter(router: NextRouter) {
//     const param: Record<string, string> = {};
//     `${router.asPath.split('#')[1]}`.split('&').forEach((pa) => {
//         const [k, v] = pa.split('=');
//         param[k] = v;
//     });
//     return param.access_token as string | undefined;
// }
