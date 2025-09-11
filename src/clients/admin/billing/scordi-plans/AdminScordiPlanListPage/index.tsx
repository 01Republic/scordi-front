import {memo, useEffect, useState} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {ListPageTitle} from '^admin/billing/_common/ListPageTitle';
import {GyuridTable, useColumnDefs, useDefaultColDef} from '^lib/GyuridTable';
import {ScordiPlanDto, ScordiPlanStepType, t_planNextStrategy, t_planStepType} from '^models/_scordi/ScordiPlan/type';
import {useQuery} from '@tanstack/react-query';
import {adminScordiPlansApi} from '^models/_scordi/ScordiPlan/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Paginated} from '^types/utils/paginated.dto';
import {SortedColumnInterface} from '^lib/GyuridTable/features/sortable';

export const AdminScordiPlanListPage = memo(function AdminScordiPlanListPage() {
    const [params, setParams] = useState<FindAllQueryDto<ScordiPlanDto>>({
        order: {id: 'DESC'},
    });

    const {data, isFetching} = useQuery({
        queryKey: ['admin/scordi-plans', params],
        queryFn: async () => adminScordiPlansApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
    });

    const [sortedColumns, setSortedColumns] = useState<SortedColumnInterface[]>([
        {
            field: 'id',
            sortKey: 'id',
            sortVal: 'DESC',
        },
    ]);

    useEffect(() => {
        const [sortColumn] = sortedColumns;
        const {sortKey, sortVal} = sortColumn || {
            field: 'id',
            sortKey: 'id',
            sortVal: 'DESC',
        };
        setParams((q) => ({...q, order: {[sortKey]: sortVal}}));
    }, [sortedColumns]);

    const sortBy = (sortColumn: SortedColumnInterface) => setSortedColumns([sortColumn]);

    // const defaultColDef = useDefaultColDef({
    //     flex: 2,
    //     cellStyle: {
    //         minWidth: '150px',
    //     },
    // });
    //
    // const [columnDefs, setColumnDefs] = useColumnDefs<ScordiPlanDto>([
    //     {field: 'id', headerName: 'Id'},
    //     {field: 'name', headerName: '플랜명', flex: 3},
    //     {field: 'regularPrice', headerName: '정가', cellType: 'number'},
    //     {field: 'price', headerName: '판매가'},
    //     {field: 'isPublic', headerName: '공개상태'},
    //     // {field: 'isActive', headerName: '활성상태'},
    //     {field: 'isCustomInquired', headerName: '도입문의'},
    //     // {field: 'stepType', headerName: '반복주기'},
    //     // {field: 'stepSize', headerName: '반복주기'},
    //     // {field: 'nextStrategy', headerName: '만기유형'},
    //     // {field: 'secretCode', headerName: '쿠폰코드'},
    //     // {field: 'priority', headerName: '정렬 우선순위'},
    //     // // {field: 'extraData', headerName: '추가 데이터'},
    //     // {field: 'createdAt', headerName: '생성일시'},
    //     // {field: 'updatedAt', headerName: '수정일시'},
    // ]);

    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="scordi-plans" />}
            breadcrumbs={[{text: '스코디 빌링관리'}, {text: '플랜 관리'}]}
        >
            <AdminPageContainer>
                <GyuridTable
                    // className="-mx-8 px-8"
                    entries={data.items}
                    pagination={data.pagination}
                    sortedColumns={sortedColumns}
                    setSortedColumns={setSortedColumns}
                    defaultColDef={{
                        width: 100,
                        className: 'bg-white',
                    }}
                    columnDefs={[
                        {
                            field: 'id',
                            headerName: 'Id',
                            onSort: (direct) => sortBy({field: 'id', sortKey: 'id', sortVal: direct}),
                        },
                        {
                            field: 'name',
                            headerName: '플랜명',
                            width: 250,
                            onSort: (direct) => sortBy({field: 'name', sortKey: 'name', sortVal: direct}),
                        },
                        {
                            field: 'priority',
                            headerName: '종류',
                            cellType: {name: 'number'},
                            onSort: (direct) => sortBy({field: 'priority', sortKey: 'priority', sortVal: direct}),
                        },
                        {
                            field: 'regularPrice',
                            headerName: '정가',
                            cellType: {name: 'number', format: 'currency'},
                            onSort: (direct) =>
                                sortBy({field: 'regularPrice', sortKey: 'regularPrice', sortVal: direct}),
                        },
                        {
                            field: 'price',
                            headerName: '판매가',
                            cellType: {name: 'number', format: 'thousand'},
                            onSort: (direct) => sortBy({field: 'price', sortKey: 'price', sortVal: direct}),
                        },
                        {
                            field: 'isPublic',
                            headerName: '공개노출',
                            onSort: (direct) => sortBy({field: 'isPublic', sortKey: 'isPublic', sortVal: direct}),
                        },
                        {
                            field: 'isActive',
                            headerName: '활성상태',
                            onSort: (direct) => sortBy({field: 'isActive', sortKey: 'isActive', sortVal: direct}),
                        },
                        {
                            field: 'isCustomInquired',
                            headerName: '도입문의',
                            cellType: {name: 'boolean'},
                            onSort: (direct) =>
                                sortBy({field: 'isCustomInquired', sortKey: 'isCustomInquired', sortVal: direct}),
                        },
                        {
                            field: 'stepSize',
                            headerName: '반복주기',
                            cellType: {name: 'number'},
                            onSort: (direct) => sortBy({field: 'stepSize', sortKey: 'stepSize', sortVal: direct}),
                        },
                        {
                            field: 'stepType',
                            headerName: '반복주기',
                            cellType: {name: 'mono-select'},
                            valueGetter: (p) =>
                                t_planStepType(p.data.stepType, {
                                    [ScordiPlanStepType.NO]: '(무관)',
                                    [ScordiPlanStepType.DAY]: '일',
                                    [ScordiPlanStepType.WEEK]: '주',
                                    [ScordiPlanStepType.Month]: '개월',
                                    [ScordiPlanStepType.Year]: '년',
                                }),
                            onSort: (direct) => sortBy({field: 'stepSize', sortKey: 'stepSize', sortVal: direct}),
                        },
                        {
                            field: 'nextStrategy',
                            headerName: '만기유형',
                            cellType: {name: 'mono-select'},
                            valueGetter: (p) => t_planNextStrategy(p.data.nextStrategy),
                            onSort: (direct) =>
                                sortBy({field: 'nextStrategy', sortKey: 'nextStrategy', sortVal: direct}),
                        },
                        {
                            field: 'secretCode',
                            headerName: '코드',
                            width: 180,
                            onSort: (direct) => sortBy({field: 'secretCode', sortKey: 'secretCode', sortVal: direct}),
                        },
                        // {field: 'extraData', headerName: '추가 데이터'},
                        {
                            field: 'createdAt',
                            headerName: '생성일시',
                            cellType: {name: 'date'},
                            onSort: (direct) => sortBy({field: 'createdAt', sortKey: 'createdAt', sortVal: direct}),
                        },
                        {
                            field: 'updatedAt',
                            headerName: '수정일시',
                            cellType: {name: 'date'},
                            onSort: (direct) => sortBy({field: 'updatedAt', sortKey: 'updatedAt', sortVal: direct}),
                        },
                    ]}
                />
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
