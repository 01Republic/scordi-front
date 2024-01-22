import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface TableProps extends WithChildren {
    isLoading?: boolean;
}

export const Table = memo((props: TableProps) => {
    const {isLoading = false, children} = props;

    return <table className={`table w-full ${isLoading ? 'no-click opacity-50' : ''}`}>{children}</table>;
});
Table.displayName = 'Table';
