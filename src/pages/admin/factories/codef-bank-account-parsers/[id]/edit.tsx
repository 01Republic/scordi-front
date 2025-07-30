import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefBankAccountParserEditPage} from '^admin/factories/codef-bank-account-parsers/CodefBankAccountParserEditPage';

export const CodefBankAccountParserEditPageRoute = pathRoute({
    pathname: '/admin/factories/codef-bank-account-parsers/[id]/edit',
    path: (id: number) => pathReplace(CodefBankAccountParserEditPageRoute.pathname, {id}),
});

export default function Page() {
    return <CodefBankAccountParserEditPage />;
}
