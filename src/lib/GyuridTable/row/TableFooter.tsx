import Tippy from '@tippyjs/react';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {Button, PagePerSelect} from '^lib/GyuridTable/ui';

export interface TableFooterProps<T> {
    // columnDefs: ColumnDef<T>[];
    // defaultColDef?: DefaultColDef<T>;
    pagination?: PaginationMetaData;
    fetchNextPage?: () => any;
    onPageChange?: (page: number, per: number, force?: boolean) => any;
    perValues?: number[];
    allowAll?: boolean;
}

/**
 * 테이블의 하단 고정 푸터를 렌더링합니다.
 *
 * 페이지 요약(총 항목 수, 전체 페이지, 현재 페이지)을 좌측에 표시하고,
 * 선택적으로 "더 불러오기" 버튼(증분 로드)과 우측의 페이지당 항목 수 선택기를 렌더링합니다.
 *
 * - pagination이 주어지면 해당 메타데이터를 사용하고, 없으면 itemsPerPage = 30, totalPage = 0, currentPage = 0을 기본값으로 사용합니다.
 * - fetchNextPage가 제공되면 "더 불러오기" 버튼을 표시하며, 다음 페이지 유무에 따라 툴팁과 버튼 활성화 상태가 달라집니다.
 * - onPageChange가 제공되면 PagePerSelect를 표시하고 변경 시 onPageChange(1, per, true)를 호출하여 페이지를 1로 리셋한 뒤 새로운 페이지 크기를 적용합니다.
 *
 * @param props - TableFooter 컴포넌트의 props (pagination, fetchNextPage, onPageChange, perValues, allowAll 등을 포함)
 * @returns 테이블 풋터에 렌더되는 React 요소
 */
export function TableFooter<T>(props: TableFooterProps<T>) {
    const {pagination, fetchNextPage, onPageChange, perValues, allowAll} = props;
    const itemsPerPage = pagination?.itemsPerPage ?? 30;
    const totalPage = pagination?.totalPage ?? 0;
    const currentPage = pagination?.currentPage ?? 0;
    const nextPage = currentPage + 1;
    const hasNextPage = nextPage <= totalPage;

    return (
        <div className="flex min-h-[40px] items-center bg-white w-full px-2 sticky bottom-0 border-t z-[1]">
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
                                <Button onClick={fetchNextPage} disabled={!hasNextPage}>
                                    더 불러오기
                                </Button>
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
