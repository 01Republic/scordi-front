import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {AdminProductNewPage} from '^components/pages/admin/products/AdminProductNewPage';

export const AdminNewProductPageRoute = pathRoute({
    pathname: '/admin/products/new',
    path: () => pathReplace(AdminNewProductPageRoute.pathname, {}),
});

export default function AdminNewProductPage() {
    const router = useRouter();

    return <AdminProductNewPage />;
}
