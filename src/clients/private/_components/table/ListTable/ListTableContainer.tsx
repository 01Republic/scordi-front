import React, {memo} from 'react';
import {ReactComponentLike} from 'prop-types';
import {WithChildren} from '^types/global.type';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {ListTablePaginator} from './ListTablePaginator';
import {CardContainerTableLayout} from './layouts/CardContainerTableLayout';
import {FcVlc} from 'react-icons/fc';

interface ListTableContainerProps extends WithChildren {
    // data
    pagination: PaginationMetaData;
    movePage?: (page: number, append?: boolean) => any;
    changePageSize?: (itemsPerPage: number) => any;

    // UI Options
    unit?: string;
    hideTopPaginator?: boolean;
    hideBottomPaginator?: boolean;

    // components
    Layout?: ReactComponentLike;
}

export const ListTableContainer = memo((props: ListTableContainerProps) => {
    const {pagination, movePage, changePageSize} = props;
    const {Layout = CardContainerTableLayout} = props;
    const {unit = '개', hideTopPaginator = false, hideBottomPaginator = false} = props;
    const {children} = props;

    return (
        <Layout>
            {!hideTopPaginator && (
                <div className="flex items-center justify-between mb-4">
                    <div></div>
                    <ListTablePaginator
                        pagination={pagination}
                        movePage={movePage}
                        onChangePerPage={changePageSize}
                        unit={unit}
                    />
                </div>
            )}

            <div className="mb-4">{children}</div>

            <div className="flex items-center justify-between">
                <div></div>
                {!hideBottomPaginator && (
                    <ListTablePaginator
                        pagination={pagination}
                        movePage={movePage}
                        onChangePerPage={changePageSize}
                        unit={unit}
                    />
                )}
            </div>
        </Layout>
    );
});
ListTableContainer.displayName = 'ListTableContainer';

export const ListTableContainerNowAllowed = memo(() => (
    <div className="flex items-center justify-center py-10">
        <div className="flex flex-col items-center justify-center gap-4">
            <FcVlc fontSize={40} className="opacity-60" />
            <div className="font-bold text-2xl text-gray-300">공사중이에요</div>
        </div>
    </div>
));
