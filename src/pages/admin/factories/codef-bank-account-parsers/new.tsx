import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useSearchProductInCodefBankAccountParser} from '^admin/factories/codef-bank-account-parsers/hooks';
import {useEffect} from 'react';
import {CodefBankAccountParserNewPage} from '^admin/factories/codef-bank-account-parsers/CodefBankAccountParserNewPage';

export const CodefBankAccountParserNewPageRoute = pathRoute({
    pathname: '/admin/factories/codef-bank-account-parsers/new',
    path: () => pathReplace(CodefBankAccountParserNewPageRoute.pathname, {}),
});

export default function Page() {
    const {reset: resetProductSearchResult} = useSearchProductInCodefBankAccountParser();

    useEffect(() => {
        return () => {
            resetProductSearchResult();
        };
    }, []);

    return <CodefBankAccountParserNewPage />;
}
