import {memo} from 'react';
import {FindAllProductSimilarNameQuery, ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {useRouter} from 'next/router';
import {productSimilarNameApi} from '^models/ProductSimilarName/api';
import {useAlert} from '^hooks/useAlert';

export interface ColumnProps {
    productSimilarName: ProductSimilarNameDto;
    fetchData: (params: FindAllProductSimilarNameQuery) => any;
}

export const ActionColumn = memo((props: ColumnProps) => {
    const {productSimilarName, fetchData} = props;
    const router = useRouter();
    const {alert} = useAlert();

    const onProductDetailButtonClick = () => {
        const {product} = productSimilarName;
        if (!product) return;
        router.push(AdminProductPageRoute.path(product.id));
    };

    const onDeleteButtonClick = () => {
        productSimilarNameApi
            .destroy(productSimilarName.id)
            .then(() => alert.success({title: '차단이 해제되었습니다.'}).then(() => fetchData({order: {id: 'DESC'}})))
            .catch((err) => alert.error('삭제에 실패했습니다.', err.response.data.message));
    };

    return (
        <div className="flex gap-1">
            <button className="btn btn-info btn-sm" onClick={onProductDetailButtonClick}>
                연결된 서비스 상세
            </button>
            <button className="btn btn-error btn-sm" onClick={onDeleteButtonClick}>
                삭제
            </button>
        </div>
    );
});
