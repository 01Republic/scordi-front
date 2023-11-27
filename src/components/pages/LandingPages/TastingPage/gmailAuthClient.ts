import {OAuth2Client} from 'google-auth-library';

const client_id = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ADMIN_CLIENT_ID as string;
const client_secret = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ADMIN_CLIENT_SECRET as string;
const redirect_uri = 'YOUR_REDIRECT_URI';
const oauth2Client = new OAuth2Client(client_id, client_secret, redirect_uri);

export default oauth2Client;
