import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {AdminPrototypesPageRoute} from '^pages/admin/prototypes';
import {useRouter} from 'next/router';
import {AdminPrototypeEditPage} from '^components/pages/admin/prototypes/AdminPrototypeEditPage';

export const AdminEditPrototypePageRoute = pathRoute({
    pathname: '/admin/prototypes/[id]/edit',
    path: (id: number) => pathReplace(AdminPrototypesPageRoute.pathname, {id}),
});

export default function AdminEditPrototypePage() {
    const router = useRouter();

    return <AdminPrototypeEditPage />;
}
