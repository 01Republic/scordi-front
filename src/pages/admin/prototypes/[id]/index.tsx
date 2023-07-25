import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {AdminPrototypeDetailPage} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage';

export const AdminPrototypePageRoute = pathRoute({
    pathname: '/admin/prototypes/[id]',
    path: (id: number) => pathReplace(AdminPrototypePageRoute.pathname, {id}),
});

export default function AdminPrototypePage() {
    const router = useRouter();

    return <AdminPrototypeDetailPage />;
}
