import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefCardParserNewPage} from '^admin/factories/codef-card-parsers/CodefCardParserNewPage';

export const CodefCardParserNewPageRoute = pathRoute({
    pathname: '/admin/factories/codef-card-parsers/new',
    path: () => pathReplace(CodefCardParserNewPageRoute.pathname, {}),
});

export default function Page() {
    return <CodefCardParserNewPage />;
}
