import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {AdminPrototypeListPage} from '^components/pages/admin/prototypes/AdminPrototypeListPage';

export const AdminPrototypesPageRoute = pathRoute({
    pathname: '/admin/prototypes',
    path: () => pathReplace(AdminPrototypesPageRoute.pathname, {}),
});

export default function AdminPrototypesPage() {
    const router = useRouter();

    return <AdminPrototypeListPage />;
}
