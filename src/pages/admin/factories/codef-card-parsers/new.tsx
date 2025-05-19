import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefCardParserNewPage} from '^admin/factories/codef-card-parsers/CodefCardParserNewPage';
import {useSearchProductInCodefCardParser} from '^admin/factories/codef-card-parsers/hooks';
import {useEffect} from 'react';

export const CodefCardParserNewPageRoute = pathRoute({
    pathname: '/admin/factories/codef-card-parsers/new',
    path: () => pathReplace(CodefCardParserNewPageRoute.pathname, {}),
});

export default function Page() {
    const {reset: resetProductSearchResult} = useSearchProductInCodefCardParser();

    useEffect(() => {
        return () => {
            resetProductSearchResult();
        };
    }, []);

    return <CodefCardParserNewPage />;
}
