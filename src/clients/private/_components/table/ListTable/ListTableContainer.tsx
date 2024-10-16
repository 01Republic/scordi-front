import React, {memo} from 'react';
import {ReactComponentLike} from 'prop-types';
import {WithChildren} from '^types/global.type';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {ListTablePaginator} from './ListTablePaginator';
import {CardContainerTableLayout} from './layouts/CardContainerTableLayout';
import {FcVlc} from 'react-icons/fc';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {GiSadCrab} from 'react-icons/gi';
import {HiMiniInbox} from 'react-icons/hi2';

interface ListTableContainerProps extends WithChildren {
    // data
    pagination: PaginationMetaData;
    movePage?: (page: number, append?: boolean) => any;
    changePageSize?: (itemsPerPage: number) => any;
    isLoading?: boolean;
    isNotLoaded?: boolean;
    isEmptyResult?: boolean;

    // UI Options
    unit?: string;
    hideTopPaginator?: boolean;
    hideBottomPaginator?: boolean;

    // components
    Layout?: ReactComponentLike;

    /**
     * Empty State
     */
    EmptyIcon?: () => JSX.Element;
    emptyMessage?: string;
    emptyButtonText?: string;
    emptyButtonOnClick?: () => void;
    EmptyButtons?: ReactComponentLike;
}

export const ListTableContainer = memo((props: ListTableContainerProps) => {
    const {pagination, movePage, changePageSize} = props;
    const {Layout = CardContainerTableLayout} = props;
    const {unit = '개', hideTopPaginator = false, hideBottomPaginator = false} = props;
    const {isLoading = false, isNotLoaded = false, isEmptyResult = false} = props;
    const {children} = props;

    // Empty State Props
    const {EmptyIcon, emptyMessage, emptyButtonText, emptyButtonOnClick, EmptyButtons} = props;

    if (isNotLoaded && !isLoading) return <></>;

    if (isEmptyResult) {
        return (
            <EmptyTable
                Icon={EmptyIcon}
                message={emptyMessage}
                buttonText={emptyButtonText}
                buttonAction={emptyButtonOnClick}
                Buttons={EmptyButtons}
            />
        );
    }

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
