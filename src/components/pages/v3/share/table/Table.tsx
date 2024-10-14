import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {TableSkeleton} from './TableSkeleton';

interface TableProps extends WithChildren {
    isLoading?: boolean;
}

export const Table = memo((props: TableProps) => {
    const {isLoading = false, children} = props;

    if (isLoading) {
        return <TableSkeleton />;
    }

    return <table className="table w-full">{children}</table>;
});
Table.displayName = 'Table';
