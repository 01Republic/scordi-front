import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefCardParserEditPage} from '^admin/factories/codef-card-parsers/CodefCardParserEditPage';
import {useSearchProductInCodefCardParser} from '^admin/factories/codef-card-parsers/hooks';
import {useEffect} from 'react';

export const CodefCardParserEditPageRoute = pathRoute({
    pathname: '/admin/factories/codef-card-parsers/[id]/edit',
    path: (id: number) => pathReplace(CodefCardParserEditPageRoute.pathname, {id}),
});

export default function Page() {
    const {reset: resetProductSearchResult} = useSearchProductInCodefCardParser();

    useEffect(() => {
        return () => {
            resetProductSearchResult();
        };
    }, []);

    return <CodefCardParserEditPage />;
}
