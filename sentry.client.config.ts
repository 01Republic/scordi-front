// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import {deployEnv} from '^config/environments';

if (deployEnv === 'production' || deployEnv === 'staging') {
    Sentry.init({
        environment: deployEnv,
        dsn: 'https://92e1cc608c794d3482a377ed860d7010@o1068306.ingest.sentry.io/4505594818002944',

        // Adjust this value in production, or use tracesSampler for greater control
        tracesSampleRate: 1,

        // Setting this option to true will print useful information to the console while you're setting up Sentry.
        debug: false,
    });
}
