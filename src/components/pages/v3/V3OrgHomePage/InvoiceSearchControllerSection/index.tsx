import React, {memo, useEffect} from 'react';
import {FiMoreHorizontal} from '^components/react-icons';
import {DateRangeSelect, dateRangeSelectAtom} from '^v3/V3OrgHomePage/InvoiceSearchControllerSection/DateRangeSelect';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {dayBefore, monthBefore} from '^utils/dateTime';
import {endOfWeek, lastDayOfMonth, startOfMonth, startOfWeek} from 'date-fns';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {GetBillingHistoriesParams} from '^types/billing.type';

export const InvoiceSearchControllerSection = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const setDateRange = useSetRecoilState(dateRangeSelectAtom);
    const {query, search} = useBillingHistoriesV3();

    useEffect(() => {
        if (!currentOrg) return;

        // first loaded.
        const params: GetBillingHistoriesParams = {
            where: {organizationId: currentOrg.id},
            order: {issuedAt: 'DESC'},
            page: 1,
            itemsPerPage: 10,
        };
        search(params).then(() => console.log('first loaded billingHistories.'));
        setClear();
    }, [currentOrg]);

    const setRange = (startDate: Date, endDate: Date) => {
        setDateRange((range) => ({...range, startDate, endDate}));
    };

    const setRecent = (dayCount: number) => {
        const today = new Date();
        setRange(dayBefore(dayCount, today), today);
    };

    const setClear = () => {
        setDateRange((range) => ({
            ...range,
            startDate: undefined,
            endDate: undefined,
        }));
    };

    return (
        <section className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
                {/*<input type="text" className="input input-bordered" />*/}
                {/*<SearchInput placeholder="검색어를 입력해주세요." onSearch={console.log} />*/}
            </div>

            <div className="flex items-center justify-end gap-2">
                <DateRangeSelect
                    startDate={query.startDate ? new Date(query.startDate) : undefined}
                    endDate={query.endDate ? new Date(query.endDate) : undefined}
                    onChange={(range) => {
                        const startDate = range.startDate?.toISOString();
                        const endDate = range.startDate?.toISOString();
                        search({...query, startDate, endDate});
                    }}
                />

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn !bg-white !border-slate-300 text-gray-700 m-1">
                        <FiMoreHorizontal />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a onClick={() => setClear()}>전체</a>
                        </li>
                        <li>
                            <a onClick={() => setRecent(30)}>최근 30일</a>
                        </li>
                        <li>
                            <a onClick={() => setRecent(15)}>최근 15일</a>
                        </li>
                        <li>
                            <a onClick={() => setRecent(7)}>최근 7일</a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = new Date();
                                    setRange(startOfWeek(date), endOfWeek(date));
                                }}
                            >
                                이번 주
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = dayBefore(1, startOfWeek(new Date()));
                                    setRange(startOfWeek(date), endOfWeek(date));
                                }}
                            >
                                지난 주
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = new Date();
                                    setRange(startOfMonth(date), lastDayOfMonth(date));
                                }}
                            >
                                이번 달
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = monthBefore(1);
                                    setRange(startOfMonth(date), lastDayOfMonth(date));
                                }}
                            >
                                지난 달
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
});
