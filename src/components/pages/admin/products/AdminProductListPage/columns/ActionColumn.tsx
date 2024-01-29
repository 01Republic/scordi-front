import {memo} from 'react';
import {ColumnProps} from './props';
import {useRouter} from 'next/router';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {productApi} from '^models/Product/api';
import {useAlert} from '^hooks/useAlert';

export const ActionColumn = memo((props: ColumnProps) => {
    const {product, fetchData} = props;
    const router = useRouter();
    const {alert} = useAlert();

    const reload = () => fetchData && fetchData({order: {id: 'DESC'}});

    const onDetailButtonClick = () => router.push(AdminProductPageRoute.path(product.id));

    const onDeleteButtonClick = () => {
        if (confirm('데이터를 복구할 수 없게 됩니다.\n진짜 실행할까요?')) {
            productApi
                .destroy(product.id)
                .then(() => reload())
                .catch((err) => {
                    alert.error('삭제하지 못했어요', err.response.data.message);
                });
        }
    };

    const onBlockButtonClick = () => {
        if (confirm('차단된 서비스 명은 다시 생성되지 않습니다.')) {
            productApi
                .block(product.id)
                .then(() => reload())
                .catch((err) => alert.error('차단에 실패했습니다', err.response.data.message));
        }
    };

    return (
        <div className="flex gap-1">
            <button className="btn btn-info btn-sm" onClick={onDetailButtonClick}>
                상세
            </button>

            <button className="btn btn-error btn-sm" onClick={onDeleteButtonClick}>
                삭제
            </button>

            <button className="btn btn-error btn-sm" onClick={onBlockButtonClick}>
                차단
            </button>
        </div>
    );
});
