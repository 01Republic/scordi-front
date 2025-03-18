import React, {memo, useEffect} from 'react';
import {DateRangeSelect, dateRangeSelectAtom} from '^v3/V3OrgHomePage/InvoiceSearchControllerSection/DateRangeSelect';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {dayAfter, dayBefore, monthBefore} from '^utils/dateTime';
import {endOfWeek, lastDayOfMonth, startOfMonth, startOfWeek} from 'date-fns';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {currentOrgAtom} from '^models/Organization/atom';
import {useTranslation} from 'next-i18next';
import {localeDateHelper} from '^utils/locale-helper';
import {GetBillingHistoriesParams} from '^models/BillingHistory/type';
import {MoreHorizontal} from 'lucide-react';

export const InvoiceSearchControllerSection = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const setDateRange = useSetRecoilState(dateRangeSelectAtom);
    const {query, search} = useBillingHistoriesV3();
    const {t} = useTranslation('org-home');
    const {t: c} = useTranslation('common');
    const {range} = localeDateHelper(c);

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
                {/*<input types="text" className="input input-bordered" />*/}
                {/*<SearchInput placeholder="검색어를 입력해주세요." onSearch={console.log} />*/}
            </div>

            <div className="flex items-center justify-end gap-2">
                <DateRangeSelect
                    startDate={query.startDate ? new Date(query.startDate) : undefined}
                    endDate={query.endDate ? new Date(query.endDate) : undefined}
                    onChange={(range) => {
                        const isSameDate =
                            range.startDate && range.endDate && range.endDate.getTime() === range.startDate.getTime();
                        const modifiedEndDate = isSameDate ? dayAfter(1, range.startDate) : range.endDate;
                        const startDate = range.startDate?.toISOString();
                        const endDate = isSameDate ? modifiedEndDate?.toISOString() : range.endDate?.toISOString();
                        search({...query, startDate, endDate});
                    }}
                />

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn !bg-white !border-slate-300 text-gray-700 m-1">
                        <MoreHorizontal />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a onClick={() => setClear()}>{range.all()}</a>
                        </li>
                        <li>
                            <a onClick={() => setRecent(30)}>{range.recent(30, 'days')}</a>
                        </li>
                        <li>
                            <a onClick={() => setRecent(15)}>{range.recent(15, 'days')}</a>
                        </li>
                        <li>
                            <a onClick={() => setRecent(7)}>{range.recent(7, 'days')}</a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = new Date();
                                    setRange(startOfWeek(date), endOfWeek(date));
                                }}
                            >
                                {range.this('week')}
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = dayBefore(1, startOfWeek(new Date()));
                                    setRange(startOfWeek(date), endOfWeek(date));
                                }}
                            >
                                {range.last('week')}
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = new Date();
                                    setRange(startOfMonth(date), lastDayOfMonth(date));
                                }}
                            >
                                {range.this('month2')}
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    const date = monthBefore(1);
                                    setRange(startOfMonth(date), lastDayOfMonth(date));
                                }}
                            >
                                {range.last('month2')}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
});
