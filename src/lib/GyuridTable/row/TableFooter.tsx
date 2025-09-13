import {PaginationMetaData} from '^types/utils/paginated.dto';
import {PagePerSelect} from '^lib/GyuridTable/ui/PagePerSelect';
import Tippy from '@tippyjs/react';
import {RotateCw} from 'lucide-react';

export interface TableFooterProps<T> {
    // columnDefs: ColumnDef<T>[];
    // defaultColDef?: DefaultColDef<T>;
    pagination?: PaginationMetaData;
    fetchNextPage?: () => any;
    onPageChange?: (page: number, per: number, force?: boolean) => any;
    perValues?: number[];
    allowAll?: boolean;
}

export function TableFooter<T>(props: TableFooterProps<T>) {
    const {pagination, fetchNextPage, onPageChange, perValues, allowAll} = props;
    const itemsPerPage = pagination?.itemsPerPage ?? 30;
    const totalPage = pagination?.totalPage ?? 0;
    const currentPage = pagination?.currentPage ?? 0;
    const nextPage = currentPage + 1;
    const hasNextPage = nextPage <= totalPage;

    return (
        <div className="flex min-h-[40px] items-center bg-white w-full px-2 sticky bottom-0 border-t">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-500">
                    <span>
                        전체 <span className="font-semibold">{pagination?.totalItemCount.toLocaleString()}개</span>의
                        결과
                    </span>
                    <span>&middot;</span>
                    <span>총 {totalPage.toLocaleString()}p</span>
                    <span>중</span>
                    <span>{currentPage.toLocaleString()}p</span>
                </div>

                {fetchNextPage && (
                    <>
                        <Tippy
                            placement="top"
                            arrow={false}
                            offset={[0, 5]}
                            content={
                                hasNextPage
                                    ? nextPage + 1 === totalPage
                                        ? `마지막 페이지 불러오기`
                                        : `${nextPage}페이지 불러오기`
                                    : `모두 불러왔어요`
                            }
                            className="text-12"
                        >
                            <div>
                                <button
                                    type="button"
                                    className={`select-none cursor-pointer inline-flex items-center h-[28px] rounded-[6px] py-[6px] px-[8px] bg-gray-150 hover:bg-gray-300 transition-all duration-[20ms] btn-animation ${
                                        !hasNextPage ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                                    onClick={fetchNextPage}
                                    disabled={!hasNextPage}
                                >
                                    더 불러오기
                                </button>
                            </div>
                        </Tippy>

                        {/*{!hasNextPage && onPageChange && (*/}
                        {/*    <button*/}
                        {/*        type="button"*/}
                        {/*        className={`select-none cursor-pointer inline-flex gap-1 items-center h-[28px] rounded-[6px] py-[6px] px-[8px] hover:bg-gray-150 transition-all duration-[20ms] btn-animation`}*/}
                        {/*        onClick={() => onPageChange(1, itemsPerPage)}*/}
                        {/*    >*/}
                        {/*        <RotateCw />*/}
                        {/*        <span>초기화</span>*/}
                        {/*    </button>*/}
                        {/*)}*/}
                    </>
                )}
            </div>

            <div className="ml-auto flex items-center">
                {onPageChange && itemsPerPage >= 0 && (
                    <PagePerSelect
                        perValues={perValues}
                        className="select-xs"
                        changePageSize={(per: number) => onPageChange(1, per, true)}
                        defaultValue={itemsPerPage}
                        allowAll={allowAll}
                    />
                )}
            </div>
        </div>
    );
}
