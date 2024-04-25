import {OAuth2Client} from 'google-auth-library';
import {googleOAuth} from '^config/environments';

const client_env = googleOAuth.adminClient;
const redirect_uri = 'YOUR_REDIRECT_URI';
const oauth2Client = new OAuth2Client(client_env.id, client_env.secret, redirect_uri);

export default oauth2Client;
