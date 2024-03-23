import React from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {CodefParserNewPage} from '^admin/factories/codef-parser-factories/CodefParserNewPage';

export const CodefParserNewPageRoute = pathRoute({
    pathname: '/admin/factories/codef-parsers/new',
    path: () => pathReplace(CodefParserNewPageRoute.pathname, {}),
});

export default function Page() {
    return <CodefParserNewPage />;
}
