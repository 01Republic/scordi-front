import React, {memo} from 'react';
import {PaginationMetaData} from '^types/utils/paginated.dto';

interface PageReportProps {
    pagination: PaginationMetaData;
}

export const PageReport = memo((props: PageReportProps) => {
    const {pagination} = props;

    return (
        <div>
            총 {pagination.totalItemCount.toLocaleString()}개의 결과, {pagination.totalPage.toLocaleString()}p 중{' '}
            {pagination.currentPage.toLocaleString()}p
        </div>
    );
});
PageReport.displayName = 'PageReport';
