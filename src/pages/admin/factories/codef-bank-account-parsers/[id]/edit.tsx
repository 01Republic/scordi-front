import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useSearchProductInCodefBankAccountParser} from '^admin/factories/codef-bank-account-parsers/hooks';
import {useEffect} from 'react';
import {CodefBankAccountParserEditPage} from '^admin/factories/codef-bank-account-parsers/CodefBankAccountParserEditPage';

export const CodefBankAccountParserEditPageRoute = pathRoute({
    pathname: '/admin/factories/codef-bank-account-parsers/[id]/edit',
    path: (id: number) => pathReplace(CodefBankAccountParserEditPageRoute.pathname, {id}),
});

export default function Page() {
    const {reset: resetProductSearchResult} = useSearchProductInCodefBankAccountParser();

    useEffect(() => {
        return () => {
            resetProductSearchResult();
        };
    }, []);

    return <CodefBankAccountParserEditPage />;
}
