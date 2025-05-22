import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefBankAccountParserListPage} from '^admin/factories/codef-bank-account-parsers/CodefBankAccountParserListPage';

export const CodefBankAccountParserListPageRoute = pathRoute({
    pathname: '/admin/factories/codef-bank-account-parsers',
    path: () => pathReplace(CodefBankAccountParserListPageRoute.pathname, {}),
});

export default function Page() {
    return <CodefBankAccountParserListPage />;
}
