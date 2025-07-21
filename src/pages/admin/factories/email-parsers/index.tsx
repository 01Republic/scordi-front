import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {EmailParserListPage} from '^admin/factories/email-parsers/EmailParserListPage';

export const EmailParserListPageRoute = pathRoute({
    pathname: '/admin/factories/email-parsers',
    path: () => pathReplace(EmailParserListPageRoute.pathname, {}),
});

export default function Page() {
    return <EmailParserListPage />;
}
