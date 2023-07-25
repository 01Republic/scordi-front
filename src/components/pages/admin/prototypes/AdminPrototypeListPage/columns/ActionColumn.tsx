import {memo} from 'react';
import {ColumnProps} from './props';
import {useRouter} from 'next/router';
import {AdminEditPrototypePageRoute} from '^pages/admin/prototypes/[id]/edit';
import {AdminPrototypePageRoute} from '^pages/admin/prototypes/[id]';
import {applicationPrototypeApi} from '^api/applicationPrototype.api';

export const ActionColumn = memo((props: ColumnProps) => {
    const {prototype, fetchData} = props;
    const router = useRouter();

    const onDetailButtonClick = () => router.push(AdminPrototypePageRoute.path(prototype.id));
    const onEditButtonClick = () => router.push(AdminEditPrototypePageRoute.path(prototype.id));

    const onDeleteButtonClick = () => {
        if (confirm('Are you sure?')) {
            applicationPrototypeApi.destroy(prototype.id).then(() => {
                if (fetchData) fetchData({});
            });
        }
    };

    return (
        <div className="flex gap-1">
            <button className="btn btn-info btn-sm" onClick={onDetailButtonClick}>
                상세
            </button>

            <button className="btn btn-warning btn-sm" onClick={onEditButtonClick}>
                수정
            </button>

            <button className="btn btn-error btn-sm" onClick={onDeleteButtonClick}>
                삭제
            </button>
        </div>
    );
});
