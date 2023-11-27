export const googleOauthClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_GMAIL_CLIENT_ID!;
export const googleOauthClientSecret = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_GMAIL_CLIENT_SECRET!;

export const gmailPath = (path: string) => `https://gmail.googleapis.com/${path}`;
