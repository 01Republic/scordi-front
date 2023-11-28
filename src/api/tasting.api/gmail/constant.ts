import {googleOAuth} from '^config/environments';

export const googleOauthClientId = googleOAuth.gmailClient.id;
export const googleOauthClientSecret = googleOAuth.gmailClient.secret;

export const gmailPath = (path: string) => `https://gmail.googleapis.com/${path}`;
