import {memo} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {useAdminScordiSubscriptions} from '^models/_scordi/ScordiSubscription/hook/useAdminScordiSubscriptions';
import {CardTablePanel, ResourceColumn} from '^admin/share';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {currencyFormat, unitFormat} from '^utils/number';
import {lpp, yyyy_mm_dd} from '^utils/dateTime';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {ScordiPlanNextStrategy} from '^models/_scordi/ScordiPlan/type';
import {Paginator} from '^components/Paginator';
import {FilterItems, useListFilter} from '^admin/share/list-page/useListFilter';
import {ListPageTitle} from '^admin/billing/_common/ListPageTitle';

export const AdminScordiSubscriptionListPage = memo(function AdminScordiSubscriptionListPage() {
    const {data, params, search, clearQuery} = useAdminScordiSubscriptions({
        relations: ['organization', 'nextSubscription', 'scordiPayments'],
        order: {id: 'DESC'},
    });
    const {filters, resetFilter, filterRegister} = useListFilter({
        reset: () => clearQuery(),
    });

    const {items, pagination} = data;

    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="scordi-subscriptions" />}
            breadcrumbs={[{text: '스코디 빌링관리'}, {text: '구독 내역'}]}
        >
            <AdminPageContainer>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="text-16 font-semibold">총 {unitFormat(pagination.totalItemCount, '건')}</div>
                    </div>

                    <FilterItems filters={filters} onClear={resetFilter} />
                    <br />

                    {pagination.totalItemCount === 0 && <div>검색 결과가 없습니다.</div>}

                    <CardTablePanel
                        gridClass="grid-cols-13"
                        entries={items}
                        columns={[
                            {
                                th: '구독 ID',
                                render: (item: ScordiSubscriptionDto) => <div className="text-13">{item.id}</div>,
                            },
                            {
                                th: '조직',
                                className: 'col-span-2',
                                render: (item: ScordiSubscriptionDto) => (
                                    <ResourceColumn
                                        resource={item.organization}
                                        {...filterRegister({
                                            group: '조직',
                                            label: `"${item.organization?.name || '-'}"`,
                                            query() {
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        organizationId: item.organizationId,
                                                    },
                                                }));
                                            },
                                            notQuery() {
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        organizationId: {op: 'not', val: item.organizationId},
                                                    },
                                                }));
                                            },
                                            reset() {
                                                search((q = {}) => {
                                                    const {organizationId, ...where} = q.where || {};
                                                    return {...q, where};
                                                });
                                            },
                                        })}
                                    >
                                        {item.organization?.name}
                                    </ResourceColumn>
                                ),
                            },
                            {
                                th: '플랜',
                                className: 'col-span-2',
                                render: (item: ScordiSubscriptionDto) => {
                                    const plan = item.scordiPlan;
                                    return (
                                        <ResourceColumn
                                            resource={plan}
                                            {...filterRegister({
                                                group: '플랜',
                                                label: `"${plan.name || '-'}"`,
                                                query() {
                                                    search((q = {}) => ({
                                                        ...q,
                                                        where: {
                                                            ...(q.where || {}),
                                                            scordiPlanId: item.scordiPlanId,
                                                        },
                                                    }));
                                                },
                                                notQuery() {
                                                    search((q = {}) => ({
                                                        ...q,
                                                        where: {
                                                            ...(q.where || {}),
                                                            scordiPlanId: {op: 'not', val: item.scordiPlanId},
                                                        },
                                                    }));
                                                },
                                                reset() {
                                                    search((q = {}) => {
                                                        const {scordiPlanId, ...where} = q.where || {};
                                                        return {...q, where};
                                                    });
                                                },
                                            })}
                                        >
                                            <p className="text-13 leading-none mb-0.5">{plan.name}</p>
                                            <p className="text-11 leading-none">
                                                {plan.getStepText()}{' '}
                                                {plan.nextStrategy === ScordiPlanNextStrategy.RECURRING
                                                    ? '마다 반복결제'
                                                    : plan.nextStrategy === ScordiPlanNextStrategy.BLOCK
                                                    ? '한정판'
                                                    : ''}
                                            </p>
                                        </ResourceColumn>
                                    );
                                },
                            },
                            {
                                th: '금액',
                                className: 'text-right',
                                render: (item: ScordiSubscriptionDto) => (
                                    <div>{currencyFormat(item.scordiPlan.price)}</div>
                                ),
                            },
                            {
                                th: '활성여부',
                                className: 'text-center',
                                render: (item: ScordiSubscriptionDto) => (
                                    <div
                                        className="flex items-center justify-center"
                                        {...filterRegister({
                                            group: '활성여부',
                                            label: `"${item.isActive ? '활성' : '비활성'}"`,
                                            query() {
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        isActive: item.isActive,
                                                    },
                                                }));
                                            },
                                            notQuery() {
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        isActive: {op: 'not', val: item.isActive},
                                                    },
                                                }));
                                            },
                                            reset() {
                                                search((q = {}) => {
                                                    const {isActive, ...where} = q.where || {};
                                                    return {...q, where};
                                                });
                                            },
                                        })}
                                    >
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm checkbox-primary"
                                            checked={item.isActive}
                                            readOnly
                                        />
                                    </div>
                                ),
                            },
                            {
                                th: '적용기간',
                                className: 'col-span-2',
                                render: (item: ScordiSubscriptionDto) => {
                                    const {startAt, finishAt} = item;
                                    return (
                                        <div className="whitespace-nowrap">
                                            <p className="text-11 leading-none mb-0.5">
                                                시작: {startAt ? `${lpp(startAt)}` : '-'}
                                            </p>
                                            <p className="text-11 leading-none">
                                                종료: {finishAt ? `${lpp(finishAt)}` : '-'}
                                            </p>
                                        </div>
                                    );
                                },
                            },
                            {
                                th: '다음 구독',
                                render: (item: ScordiSubscriptionDto) => {
                                    if (item.scordiPlan.isFreeTrial) {
                                        return <TagUI className="bg-yellow-200">체험종료</TagUI>;
                                    }
                                    if (!item.nextSubscriptionId) {
                                        return <TagUI className="bg-red-200">중단예정</TagUI>;
                                    }
                                    if (item.nextSubscriptionId === item.id) {
                                        return <TagUI className="bg-green-200">SELF</TagUI>;
                                    }
                                    return <TagUI className="bg-cyan-200">{item.nextSubscriptionId}</TagUI>;
                                },
                            },
                            {
                                th: '결제 횟수',
                                className: 'text-center',
                                render: (item: ScordiSubscriptionDto) => {
                                    const {scordiPayments = []} = item;
                                    return <div>{unitFormat(scordiPayments.length, '회')}</div>;
                                },
                            },
                            {
                                th: '최근결제일',
                                render: (item: ScordiSubscriptionDto) => {
                                    const {scordiPayments = []} = item;
                                    const [lastPayment] = scordiPayments
                                        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                                        .reverse();
                                    return (
                                        <div className="text-13">
                                            {lastPayment ? lpp(lastPayment.createdAt, 'P') : '-'}
                                        </div>
                                    );
                                },
                            },
                            {
                                th: '',
                                render: () => '',
                            },
                        ]}
                    />

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
