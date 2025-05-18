import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {CodefCardParserEditPage} from '^admin/factories/codef-card-parsers/CodefCardParserEditPage';

export const CodefCardParserEditPageRoute = pathRoute({
    pathname: '/admin/factories/codef-card-parsers/[id]/edit',
    path: (id: number) => pathReplace(CodefCardParserEditPageRoute.pathname, {id}),
});

export default function Page() {
    return <CodefCardParserEditPage />;
}
