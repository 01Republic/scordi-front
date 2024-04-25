import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {AdminProductListPage} from '^admin/products/AdminProductListPage';

export const AdminProductsPageRoute = pathRoute({
    pathname: '/admin/products',
    path: () => pathReplace(AdminProductsPageRoute.pathname, {}),
});

export default function AdminProductsPage() {
    const router = useRouter();

    return <AdminProductListPage />;
}
