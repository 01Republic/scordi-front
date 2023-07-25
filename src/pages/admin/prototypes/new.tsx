import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {AdminPrototypeNewPage} from '^components/pages/admin/prototypes/AdminPrototypeNewPage';

export const AdminNewPrototypePageRoute = pathRoute({
    pathname: '/admin/prototypes/new',
    path: () => pathReplace(AdminNewPrototypePageRoute.pathname, {}),
});

export default function AdminNewPrototypePage() {
    const router = useRouter();

    return <AdminPrototypeNewPage />;
}
