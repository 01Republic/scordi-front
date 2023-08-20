import {memo} from 'react';
import {useRouter} from 'next/router';
import {ColumnProps} from '^components/pages/admin/share/panels/CardTablePanel/columns/ColumnProps.type';

export interface ActionColumnProps<T> extends ColumnProps<T> {
    onEditButtonClick: () => any;
    destroyConformMessage?: string;
    destroyData?: () => Promise<any>;
}

export const ActionColumn = memo(<T,>(props: ActionColumnProps<T>) => {
    const {item, onEditButtonClick, destroyConformMessage = 'Are you sure?', destroyData, fetchData} = props;
    const router = useRouter();

    const onDeleteButtonClick = () => {
        if (confirm(destroyConformMessage)) {
            if (destroyData) destroyData();
        }
    };

    return (
        <div className="flex gap-1">
            <button className="btn btn-warning btn-sm" onClick={onEditButtonClick}>
                수정
            </button>

            <button className="btn btn-error btn-sm" onClick={onDeleteButtonClick}>
                삭제
            </button>
        </div>
    );
});
