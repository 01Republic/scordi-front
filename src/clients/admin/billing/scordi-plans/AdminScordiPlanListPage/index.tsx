import {memo, useMemo, useState} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {ListPageTitle} from '^admin/billing/_common/ListPageTitle';
import {GyuridTable, useColumnDefs, useDefaultColDef} from '^lib/GyuridTable';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {useQuery} from '@tanstack/react-query';
import {adminScordiPlansApi} from '^models/_scordi/ScordiPlan/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Paginated} from '^types/utils/paginated.dto';

export const AdminScordiPlanListPage = memo(function AdminScordiPlanListPage() {
    const [params, setParams] = useState<FindAllQueryDto<ScordiPlanDto>>({
        order: {id: 'DESC'},
    });

    const {data, isFetching} = useQuery({
        queryKey: ['admin/scordi-plans', params],
        queryFn: async () => adminScordiPlansApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
    });

    const defaultColDef = useDefaultColDef({
        flex: 2,
        cellStyle: {
            minWidth: '150px',
        },
    });

    const [columnDefs, setColumnDefs] = useColumnDefs<ScordiPlanDto>([
        {field: 'id', headerName: 'Id'},
        {field: 'name', headerName: '플랜명', flex: 3},
        {field: 'regularPrice', headerName: '정가'},
        {field: 'price', headerName: '판매가'},
        {field: 'isPublic', headerName: '공개상태'},
        // {field: 'isActive', headerName: '활성상태'},
        {field: 'isCustomInquired', headerName: '도입문의'},
        // {field: 'stepType', headerName: '반복주기'},
        // {field: 'stepSize', headerName: '반복주기'},
        // {field: 'nextStrategy', headerName: '만기유형'},
        // {field: 'secretCode', headerName: '쿠폰코드'},
        // {field: 'priority', headerName: '정렬 우선순위'},
        // // {field: 'extraData', headerName: '추가 데이터'},
        // {field: 'createdAt', headerName: '생성일시'},
        // {field: 'updatedAt', headerName: '수정일시'},
    ]);

    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="scordi-plans" />}
            breadcrumbs={[{text: '스코디 빌링관리'}, {text: '플랜 관리'}]}
        >
            <AdminPageContainer>
                <GyuridTable
                    entries={data.items}
                    pagination={data.pagination}
                    defaultColDef={{
                        flex: 2,
                        cellStyle: {
                            minWidth: '150px',
                        },
                    }}
                    columnDefs={[
                        {field: 'id', headerName: 'Id'},
                        {field: 'name', headerName: '플랜명', flex: 3},
                        {field: 'regularPrice', headerName: '정가'},
                        {field: 'price', headerName: '판매가'},
                        {field: 'isPublic', headerName: '공개상태'},
                        {field: 'isActive', headerName: '활성상태'},
                        {field: 'isCustomInquired', headerName: '도입문의'},
                        {field: 'stepType', headerName: '반복주기'},
                        {field: 'stepSize', headerName: '반복주기'},
                        {field: 'nextStrategy', headerName: '만기유형'},
                        {field: 'secretCode', headerName: '쿠폰코드'},
                        {field: 'priority', headerName: '정렬 우선순위'},
                        // {field: 'extraData', headerName: '추가 데이터'},
                        {field: 'createdAt', headerName: '생성일시'},
                        {field: 'updatedAt', headerName: '수정일시'},
                    ]}
                />
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
