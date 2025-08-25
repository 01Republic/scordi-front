import {memo, useState} from 'react';
import {useAdminScordiSubscriptionsForOrg} from '^models/_scordi/ScordiSubscription/hook';
import {useIdParam} from '^atoms/common';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {CardTablePanel, ResourceColumn} from '^admin/share';
import {ScordiPlanNextStrategy} from '^models/_scordi/ScordiPlan/type';
import {currencyFormat, unitFormat} from '^utils/number';
import {lpp} from '^utils/dateTime';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {Paginator} from '^components/Paginator';
import {FilterItems, useListFilter} from '^admin/share/list-page/useListFilter';
import {DateTimeColumn} from '^admin/orgs/AdminOrgDetailPage/tabContents/PaymentListTabContent/ScordiSubscriptionTabContent/DateTimeColumn';
import {UpdateScordiSubscriptionModal} from '^models/_scordi/ScordiSubscription/components';

export const ScordiSubscriptionTabContent = memo(function ScordiSubscriptionTabContent() {
    const orgId = useIdParam('id');
    const {data, params, search, clearQuery, refetch} = useAdminScordiSubscriptionsForOrg(orgId, {
        relations: ['organization', 'nextSubscription', 'scordiPayments'],
        order: {id: 'DESC'},
    });
    const {filters, resetFilter, filterRegister} = useListFilter({
        reset: () => clearQuery(),
    });
    const [editResource, setEditResource] = useState<ScordiSubscriptionDto>();

    const {items, pagination} = data;

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                    <div className="text-16 font-semibold">
                        총 <span className="text-scordi">{unitFormat(pagination.totalItemCount, '건')}</span>의 구독
                        이력
                    </div>
                </div>

                <FilterItems filters={filters} onClear={resetFilter} />

                <CardTablePanel
                    gridClass="grid-cols-11"
                    entries={items}
                    columns={[
                        {
                            th: '구독 ID',
                            render: (item: ScordiSubscriptionDto) => <div className="text-13">{item.id}</div>,
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
                            render: (item: ScordiSubscriptionDto) => <div>{currencyFormat(item.scordiPlan.price)}</div>,
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
                            th: '시작일시',
                            className: 'col-span-1',
                            render: (item: ScordiSubscriptionDto) => <DateTimeColumn value={item.startAt} />,
                        },
                        {
                            th: '종료일시',
                            className: 'col-span-1',
                            render: (item: ScordiSubscriptionDto) => <DateTimeColumn value={item.finishAt} />,
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
                                    <div className="text-13">{lastPayment ? lpp(lastPayment.createdAt, 'P') : '-'}</div>
                                );
                            },
                        },
                        {
                            th: '',
                            render: (item: ScordiSubscriptionDto) => {
                                return (
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-scordi"
                                            onClick={() => setEditResource(item)}
                                        >
                                            수정하기
                                        </button>
                                    </div>
                                );
                            },
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

            <UpdateScordiSubscriptionModal
                resource={editResource}
                close={() => setEditResource(undefined)}
                onSaved={() => refetch()}
            />
        </div>
    );
});
