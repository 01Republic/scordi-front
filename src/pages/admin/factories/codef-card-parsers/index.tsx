import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefCardParserListPage} from '^clients/admin/factories/codef-card-parsers/CodefCardParserListPage';

export const CodefCardParserListPageRoute = pathRoute({
    pathname: '/admin/factories/codef-card-parsers',
    path: () => pathReplace(CodefCardParserListPageRoute.pathname, {}),
});

export default function Page() {
    return <CodefCardParserListPage />;
}
