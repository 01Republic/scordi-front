import {memo} from 'react';
import {ColumnProps} from './props';
import {useRouter} from 'next/router';
import {AdminPrototypePageRoute} from '^pages/admin/prototypes/[id]';
import {productApi} from '^api/product.api';

export const ActionColumn = memo((props: ColumnProps) => {
    const {prototype, fetchData} = props;
    const router = useRouter();

    const onDetailButtonClick = () => router.push(AdminPrototypePageRoute.path(prototype.id));

    const onDeleteButtonClick = () => {
        if (confirm('Are you sure?')) {
            productApi.destroy(prototype.id).then(() => {
                if (fetchData) fetchData({});
            });
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
        </div>
    );
});
