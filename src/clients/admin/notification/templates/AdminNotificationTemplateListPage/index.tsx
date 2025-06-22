import React, {memo} from 'react';
import {unitFormat} from '^utils/number';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {FilterItems, useListFilter} from '^admin/share/list-page/useListFilter';
import {useAdminNotificationTemplates} from '^models/_notification/NotificationTemplate/hooks/useAdminNotificationTemplates';
import {ListPageTitle} from '../../_common/ListPageTitle';
import {Paginator} from '^components/Paginator';
import {CardTablePanel} from '^admin/share';
import {NotificationTemplateDto} from '^models/_notification/NotificationTemplate/types';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

export const AdminNotificationTemplateListPage = memo(function AdminNotificationTemplateListPage() {
    const {data, params, search, clearQuery} = useAdminNotificationTemplates({
        order: {id: 'DESC'},
    });
    const {filters, resetFilter, filterRegister} = useListFilter({
        reset: () => clearQuery(),
    });

    const {items, pagination} = data;

    return (
        <AdminListPageLayout
            title={<ListPageTitle domain="templates" />}
            breadcrumbs={[{text: '알림 관리'}, {text: '알림 템플릿 목록'}]}
        >
            <AdminPageContainer>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="text-16 font-semibold">총 {unitFormat(pagination.totalItemCount)}</div>
                    </div>

                    <FilterItems filters={filters} onClear={resetFilter} />
                    <br />

                    {pagination.totalItemCount === 0 && <div>검색 결과가 없습니다.</div>}

                    <CardTablePanel
                        gridClass="grid-cols-12"
                        className="text-13"
                        entries={items}
                        columns={[
                            {
                                th: '템플릿 ID',
                                render: (item: NotificationTemplateDto) => <div className="text-13">{item.id}</div>,
                            },
                            {
                                th: '구분(키)',
                                render: (item: NotificationTemplateDto) => <div className="text-13">{item.about}</div>,
                            },
                            {
                                th: '라이브',
                                render: (item: NotificationTemplateDto) => (
                                    <div
                                        className="flex items-center justify-start"
                                        {...filterRegister({
                                            group: '라이브',
                                            label: `"${item.activatedAt ? '활성' : '비활성'}"`,
                                            query() {
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        activatedAt: {op: 'not', val: 'NULL'},
                                                    },
                                                }));
                                            },
                                            notQuery() {
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        activatedAt: 'NULL',
                                                    },
                                                }));
                                            },
                                            reset() {
                                                search((q = {}) => {
                                                    const {activatedAt, ...where} = q.where || {};
                                                    return {...q, where};
                                                });
                                            },
                                        })}
                                    >
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm checkbox-primary"
                                            checked={!!item.activatedAt}
                                            readOnly
                                        />
                                    </div>
                                ),
                            },
                            {
                                th: '이름',
                                className: 'col-span-2',
                                render: (item: NotificationTemplateDto) => (
                                    <div className="text-13 flex flex-col gap-0.5">
                                        <div className="leading-none text-13 font-semibold">{item.title}</div>
                                        <div className="leading-none text-12 text-gray-600">{item.titleTemplate}</div>
                                    </div>
                                ),
                            },
                            {
                                th: '생성일',
                                className: 'col-span-2',
                                render: (item: NotificationTemplateDto) => (
                                    <div className="text-13">{format(item.createdAt, 'Pp', {locale: ko})}</div>
                                ),
                            },
                            {
                                th: '수정일',
                                className: 'col-span-2',
                                render: (item: NotificationTemplateDto) => (
                                    <div className="text-13">{format(item.updatedAt, 'Pp', {locale: ko})}</div>
                                ),
                            },
                            {
                                th: '활성화시각',
                                className: 'col-span-2',
                                render: (item: NotificationTemplateDto) => (
                                    <div className="text-13">
                                        {item.activatedAt ? format(item.activatedAt, 'Pp', {locale: ko}) : '-'}
                                    </div>
                                ),
                            },
                            // 전체메세지 수
                            // 보낸 메세지 수
                            // 대기중 메세지 수
                            // {
                            //     th: '현황 요약',
                            //     render: (item: NotificationTemplateDto) => '',
                            // },
                            {
                                th: '',
                                // className: 'col-span-2',
                                render: () => '',
                            },
                        ]}
                    />

                    {/*<p>알림 템플릿 CRUD</p>*/}
                    {/*<p>알림 템플릿 상세페이지 - 알림 메세지 CRUD</p>*/}

                    {/*<p>알림 메세지 CRUD</p>*/}

                    {/*<p>조직 상세p - 알림 메세지 CRUD</p>*/}
                    {/*<p>조직 상세p - 회원관리 - 알림 메세지 CRUD</p>*/}

                    {/*<p>슬랙</p>*/}
                    {/*<p>이메일</p>*/}
                    {/*/!*<p>sms</p>*!/*/}
                    {/*/!*<p>웹푸시</p>*!/*/}

                    {/*<p>케이스별</p>*/}

                    {/* Paginator */}
                    <div className="flex items-center justify-center w-full gap-4">
                        <div>
                            <select
                                className="select select-bordered"
                                defaultValue={params.itemsPerPage === 0 ? 0 : params.itemsPerPage || 30}
                                onChange={(e) => {
                                    const itemsPerPage = Number(e.target.value);
                                    search((q) => ({...q, itemsPerPage}));
                                }}
                            >
                                {[10, 30, 50, 100].map((value, i) => (
                                    <option key={i} value={value}>
                                        {value} 개씩 보기
                                    </option>
                                ))}
                                <option value={0}>전체 보기</option>
                            </select>
                        </div>

                        <Paginator
                            currentPage={pagination.currentPage}
                            totalPage={pagination.totalPage}
                            onClick={(page) => {
                                search((q) => ({...q, page}));
                            }}
                        />
                    </div>
                </div>
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
