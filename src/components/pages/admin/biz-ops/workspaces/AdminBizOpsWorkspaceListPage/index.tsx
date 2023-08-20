import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AdminListPageLayout} from '^components/pages/admin/layouts/ListPageLayout';
import {Paginated} from '^types/utils/paginated.dto';
import {OrganizationDto} from '^types/organization.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {bizOpsApi} from '^api/biz-ops';
import {CardTablePanel, DateTimeColumn} from '^components/pages/admin/share/panels/CardTablePanel';
import {ActionColumn} from '^components/pages/admin/share/panels/CardTablePanel/columns/ActionColumn';
import {KBCardExcelToNotionCard, KBCardExcelToNotionModal} from './workflows/KBCardExcelToNotion';

export const AdminBizOpsWorkspaceListPage = memo(() => {
    const router = useRouter();
    const [dataListPage, setDataListPage] = useState<Paginated<OrganizationDto>>({
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 0,
            currentPage: 0,
            itemsPerPage: 0,
        },
    });

    const fetchData = (params: FindAllQueryDto<OrganizationDto>) => {
        bizOpsApi.organizationApi.index(params).then((res) => setDataListPage(res.data));
    };

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
    }, []);

    return (
        <>
            <AdminListPageLayout title="[BizOps] Workspace List" breadcrumbs={[{text: '1'}, {text: '2'}]}>
                <div className="container pt-10 px-2 sm:px-8">
                    <div className="mb-8 flex">
                        <KBCardExcelToNotionCard />
                    </div>

                    <div className="w-full">
                        {/*<CardTablePanel*/}
                        {/*    gridClass="grid-cols-1 lg:grid-cols-8"*/}
                        {/*    entries={dataListPage.items}*/}
                        {/*    columns={[*/}
                        {/*        {th: 'id', render: (org) => org.id},*/}
                        {/*        {th: 'name', render: (org) => org.name},*/}
                        {/*        {th: 'created at', render: (org) => <DateTimeColumn value={String(org.createdAt)} />},*/}
                        {/*        {*/}
                        {/*            th: 'id',*/}
                        {/*            render: (org) => (*/}
                        {/*                <ActionColumn*/}
                        {/*                    item={org}*/}
                        {/*                    onEditButtonClick={() => router.push('')}*/}
                        {/*                    destroyData={() => bizOpsApi.organizationApi.destroy(org.id)}*/}
                        {/*                />*/}
                        {/*            ),*/}
                        {/*        },*/}
                        {/*    ]}*/}
                        {/*    pagination={dataListPage.pagination}*/}
                        {/*    pageMove={(page) => fetchData({order: {id: 'DESC'}, page})}*/}
                        {/*/>*/}
                    </div>
                </div>
            </AdminListPageLayout>
            <div>
                <KBCardExcelToNotionModal />
            </div>
        </>
    );
});
