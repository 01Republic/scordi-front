import {memo} from 'react';
import {GyuridTable, useSortColumns} from '^lib/GyuridTable';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {ListPageTitle} from '^admin/billing/_common/ListPageTitle';
import {ScordiPlanDto, ScordiPlanStepType, t_planNextStrategy, t_planStepType} from '^models/_scordi/ScordiPlan/type';
import {useAdminScordiPlanList} from './useAdminScordiPlanList';

export const AdminScordiPlanListPage = memo(function AdminScordiPlanListPage() {
    const {result, setParams, fetchNextPage, hasNextPage, onPageChange} = useAdminScordiPlanList({
        order: {id: 'DESC'},
        itemsPerPage: 10,
    });

    const {sortedColumns, setSortedColumns, onSort} = useSortColumns([{field: 'id', sortKey: 'id', sortVal: 'DESC'}], {
        onChange: ({sortKey, sortVal}) => {
            setParams((q) => ({
                ...q,
                order: {[sortKey]: sortVal},
            }));
        },
    });

    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="scordi-plans" />}
            breadcrumbs={[{text: '스코디 빌링관리'}, {text: '플랜 관리'}]}
        >
            <AdminPageContainer>
                <GyuridTable<ScordiPlanDto>
                    entries={result.items}
                    paging={{
                        pagination: result.pagination,
                        fetchNextPage,
                        onPageChange,
                        perValues: [10, 50, 100, 250, 500, 1000, 2500, 5000],
                        allowAll: true,
                    }}
                    onSearch={(value: string) => setParams((q) => ({...q, where: {...q.where, name: value}, page: 1}))}
                    sortedColumns={sortedColumns}
                    setSortedColumns={setSortedColumns}
                    defaultColDef={{width: 100, className: 'bg-white'}}
                    columnDefs={[
                        {field: 'id', headerName: 'Id', onSort},
                        {field: 'name', headerName: '플랜명', onSort, width: 250},
                        {field: 'priority', headerName: '종류', onSort, cellType: {name: 'number'}},
                        {
                            field: 'regularPrice',
                            headerName: '정가',
                            onSort,
                            cellType: {name: 'number', format: 'currency'},
                        },
                        {field: 'price', headerName: '판매가', onSort, cellType: {name: 'number', format: 'currency'}},
                        {field: 'isPublic', headerName: '공개노출', onSort},
                        {field: 'isActive', headerName: '활성상태', onSort},
                        {field: 'isCustomInquired', headerName: '도입문의', onSort, cellType: {name: 'boolean'}},
                        {field: 'stepSize', headerName: '반복주기', onSort, cellType: {name: 'number'}},
                        {
                            field: 'stepType',
                            headerName: '반복주기',
                            cellType: {name: 'mono-select'},
                            onSort,
                            valueGetter: (p) =>
                                t_planStepType(p.data.stepType, {
                                    [ScordiPlanStepType.NO]: '(무관)',
                                    [ScordiPlanStepType.DAY]: '일',
                                    [ScordiPlanStepType.WEEK]: '주',
                                    [ScordiPlanStepType.Month]: '개월',
                                    [ScordiPlanStepType.Year]: '년',
                                }),
                        },
                        {
                            field: 'nextStrategy',
                            headerName: '만기유형',
                            cellType: {name: 'mono-select'},
                            onSort,
                            valueGetter: (p) => t_planNextStrategy(p.data.nextStrategy),
                        },
                        {field: 'secretCode', headerName: '코드', onSort, width: 180},
                        // {field: 'extraData', headerName: '추가 데이터'},
                        {field: 'createdAt', headerName: '생성일시', onSort, cellType: {name: 'date'}},
                        {field: 'updatedAt', headerName: '수정일시', onSort, cellType: {name: 'date'}},
                    ]}
                />
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
