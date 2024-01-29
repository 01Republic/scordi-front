import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {ProductSimilarNameListPage} from '^admin/products/AdminProductSimilarNameListPage';

export const AdminProductSimilarNamesPageRoute = pathRoute({
    pathname: '/admin/products/similar',
    path: () => pathReplace(AdminProductSimilarNamesPageRoute.pathname, {}),
});

export default function AdminProductSimilarNamesPage() {
    return <ProductSimilarNameListPage />;
}
