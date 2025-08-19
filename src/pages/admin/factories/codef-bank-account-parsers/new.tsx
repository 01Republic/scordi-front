import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefBankAccountParserNewPage} from '^admin/factories/codef-bank-account-parsers/CodefBankAccountParserNewPage';

export const CodefBankAccountParserNewPageRoute = pathRoute({
    pathname: '/admin/factories/codef-bank-account-parsers/new',
    path: () => pathReplace(CodefBankAccountParserNewPageRoute.pathname, {}),
});

export default function Page() {
    return <CodefBankAccountParserNewPage />;
}
