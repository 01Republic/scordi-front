import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {CodefParserListPage} from '^admin/factories/codef-parser-factories/CodefParserListPage';

export const CodefParserListPageRoute = pathRoute({
    pathname: '/admin/factories/codef-parsers',
    path: () => pathReplace(CodefParserListPageRoute.pathname, {}),
});

export default function Page() {
    console.log('list page rendered');
    return <CodefParserListPage />;
}
