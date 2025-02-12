import {memo, useState} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {useAdminScordiSubscriptions} from '^models/_scordi/ScordiSubscription/hook/useAdminScordiSubscriptions';
import {CardTablePanel, ResourceColumn} from '^admin/share';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {currencyFormat, unitFormat} from '^utils/number';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {AdminOrgPageRoute} from '^pages/admin/orgs/[id]';
import {ScordiPlanNextStrategy} from '^models/_scordi/ScordiPlan/type';
import {Paginator} from '^components/Paginator';
import {FaTimes} from 'react-icons/fa';

interface Filter {
    key: string | number;
    value?: ReactNodeElement;
    onClick?: () => any;
}

export const AdminScordiSubscriptionListPage = memo(function AdminScordiSubscriptionListPage() {
    const {data, params, search, clearQuery} = useAdminScordiSubscriptions({
        relations: ['organization', 'nextSubscription', 'scordiPayments'],
        order: {id: 'DESC'},
    });
    const [filters, setFilters] = useState<Filter[]>([]);
    const addFilter = (filter: Filter) => setFilters((_filters) => [..._filters, filter]);

    const {items, pagination} = data;

    return (
        <AdminListPageLayout title="구독 내역" breadcrumbs={[{text: '스코디 빌링관리'}, {text: '구독 내역'}]}>
            <AdminPageContainer>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="text-16 font-semibold">총 {unitFormat(pagination.totalItemCount, '건')}</div>

                        {filters.length > 0 && (
                            <button
                                className="btn btn-xs btn-white"
                                onClick={() => {
                                    clearQuery();
                                    setFilters([]);
                                }}
                            >
                                조건 초기화
                            </button>
                        )}
                    </div>

                    {filters.length > 0 && (
                        <div className="flex items-center">
                            {filters.map((filter, i) => {
                                const {key, value, onClick} = filter;
                                const colorClass = getColor(i, palette.notionColors);

                                return (
                                    <TagUI
                                        className={`flex items-center ${colorClass} group`}
                                        onClick={() => {
                                            onClick && onClick();
                                            setFilters((arr) => arr.filter((a) => a.key !== key));
                                        }}
                                    >
                                        <div>{value}</div>
                                        <div className="ml-1 bg-transparent text-gray-500 group-hover:text-gray-800 transition-all">
                                            <FaTimes fontSize={10} />
                                        </div>
                                    </TagUI>
                                );
                            })}
                        </div>
                    )}

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
                                        onClick={() => {
                                            // 필터 뱃지 추가
                                            addFilter({
                                                key: new Date().getTime(),
                                                value: `조직: "${item.organization?.name || '-'}"`,
                                                onClick() {
                                                    // 필터 적용 해제
                                                    search((q = {}) => {
                                                        const {organizationId, ...where} = q.where || {};
                                                        return {...q, where};
                                                    });
                                                },
                                            });

                                            // 필터 적용 실행
                                            search((q = {}) => ({
                                                ...q,
                                                where: {
                                                    ...(q.where || {}),
                                                    organizationId: item.organizationId,
                                                },
                                            }));
                                        }}
                                        onContextMenu={() => {
                                            addFilter({
                                                key: new Date().getTime(),
                                                value: `조직: NOT "${item.organization?.name || '-'}"`,
                                                onClick() {
                                                    search((q = {}) => {
                                                        const {organizationId, ...where} = q.where || {};
                                                        return {...q, where};
                                                    });
                                                },
                                            });
                                            search((q = {}) => ({
                                                ...q,
                                                where: {
                                                    ...(q.where || {}),
                                                    organizationId: {op: 'not', val: item.organizationId},
                                                },
                                            }));
                                        }}
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
                                            onClick={() => {
                                                addFilter({
                                                    key: new Date().getTime(),
                                                    value: `플랜: "${plan.name || '-'}"`,
                                                    onClick() {
                                                        search((q = {}) => {
                                                            const {scordiPlanId, ...where} = q.where || {};
                                                            return {...q, where};
                                                        });
                                                    },
                                                });
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        scordiPlanId: item.scordiPlanId,
                                                    },
                                                }));
                                            }}
                                            onContextMenu={() => {
                                                addFilter({
                                                    key: new Date().getTime(),
                                                    value: `플랜: NOT "${plan.name || '-'}"`,
                                                    onClick() {
                                                        search((q = {}) => {
                                                            const {scordiPlanId, ...where} = q.where || {};
                                                            return {...q, where};
                                                        });
                                                    },
                                                });
                                                search((q = {}) => ({
                                                    ...q,
                                                    where: {
                                                        ...(q.where || {}),
                                                        scordiPlanId: {op: 'not', val: item.scordiPlanId},
                                                    },
                                                }));
                                            }}
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
                                        onClick={() => {
                                            addFilter({
                                                key: new Date().getTime(),
                                                value: `활성여부: "${item.isActive ? '활성' : '비활성'}"`,
                                                onClick() {
                                                    search((q = {}) => {
                                                        const {isActive, ...where} = q.where || {};
                                                        return {...q, where};
                                                    });
                                                },
                                            });
                                            search((q = {}) => ({
                                                ...q,
                                                where: {
                                                    ...(q.where || {}),
                                                    isActive: item.isActive,
                                                },
                                            }));
                                        }}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            addFilter({
                                                key: new Date().getTime(),
                                                value: `활성여부: NOT "${item.isActive ? '활성' : '비활성'}"`,
                                                onClick() {
                                                    search((q = {}) => {
                                                        const {isActive, ...where} = q.where || {};
                                                        return {...q, where};
                                                    });
                                                },
                                            });
                                            search((q = {}) => ({
                                                ...q,
                                                where: {
                                                    ...(q.where || {}),
                                                    isActive: {op: 'not', val: item.isActive},
                                                },
                                            }));
                                        }}
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
                                                시작: {startAt ? `${yyyy_mm_dd(startAt)} ${hh_mm(startAt)}` : '-'}
                                            </p>
                                            <p className="text-11 leading-none">
                                                종료: {finishAt ? `${yyyy_mm_dd(finishAt)} ${hh_mm(finishAt)}` : '-'}
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
                                            {lastPayment ? yyyy_mm_dd(lastPayment.createdAt) : '-'}
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
