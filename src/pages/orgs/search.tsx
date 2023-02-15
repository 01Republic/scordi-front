import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgSearchPage} from '^components/pages/OrgSearchPage';

export const OrgSearchRoute = pathRoute({
    pathname: '/orgs/search',
    path: () => pathReplace(OrgSearchRoute.pathname),
});

export default function OrgSearch() {
    return <OrgSearchPage />;
}
