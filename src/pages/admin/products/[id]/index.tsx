import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {AdminProductDetailPage} from '^admin/products/AdminProductDetailpage';

export const AdminProductPageRoute = pathRoute({
    pathname: '/admin/products/[id]',
    path: (id: number) => pathReplace(AdminProductPageRoute.pathname, {id}),
});

export default function AdminPrototypePage() {
    const router = useRouter();

    return <AdminProductDetailPage />;
}
