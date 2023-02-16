import {JoinOrgPage} from '^components/pages/OrgJoinPage/intex';
import {pathReplace, pathRoute} from '^types/pageRoute.type';

export const JoinOrgRoute = pathRoute({
    pathname: '/orgs/joinOrg',
    path: () => pathReplace(JoinOrgRoute.pathname),
});

export default function JoinOrg() {
    return <JoinOrgPage />;
}
