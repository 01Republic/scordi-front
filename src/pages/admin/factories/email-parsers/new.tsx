import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {EmailParserNewPage} from '^admin/factories/email-parsers/EmailParserNewPage';

export const EmailParserNewPageRoute = pathRoute({
    pathname: '/admin/factories/email-parsers/new',
    path: () => pathReplace(EmailParserNewPageRoute.pathname, {}),
});

export default function Page() {
    return <EmailParserNewPage />;
}
