import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {EmailParserEditPage} from '^admin/factories/email-parsers/EmailParserEditPage';

export const EmailParserEditPageRoute = pathRoute({
    pathname: '/admin/factories/email-parsers/[id]/edit',
    path: (id: number) => pathReplace(EmailParserEditPageRoute.pathname, {id}),
});

export default function Page() {
    return <EmailParserEditPage />;
}
