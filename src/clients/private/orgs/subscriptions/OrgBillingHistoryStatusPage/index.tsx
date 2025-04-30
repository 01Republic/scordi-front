import React, {memo, useEffect, useRef, useState} from 'react';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';
import {MonthYearSwitch} from './MonthYearSwitch';
import {YearlyScopeHandler} from './YearlyScopeHandler';
import {BillingHistoryMonthly} from './BillingHistoryMonthly';
import {BillingHistoryYearly} from './BillingHistoryYearly';

interface ViewModeRef {
    downloadExcel: () => any;
    search: (keyword?: string) => void;
}

export enum WideMode {
    Narrow,
    Wide,
    WideHideColumn,
}

export const OrgBillingHistoryStatusPage = memo(function OrgBillingHistoryStatusPage() {
    const monthlyRef = useRef<ViewModeRef>(null);
    const yearlyRef = useRef<ViewModeRef>(null);
    const {years, focusYear, setFocusYear, getMetaData} = useBillingHistoryStatus();
    const [viewUnit, setViewUnit] = useState(BillingCycleOptions.Monthly);
    const [wideMode, setWideMode] = useState(WideMode.Narrow);

    useEffect(() => {
        if (viewUnit === BillingCycleOptions.Yearly) setFocusYear(undefined);
    }, [viewUnit]);

    useEffect(() => {
        const changeWideMode = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key === 'Escape') {
                setWideMode((v) => (v + 1) % 3);
            }
        };

        window.addEventListener('keyup', changeWideMode);
        return () => window.removeEventListener('keyup', changeWideMode);
    }, []);

    return (
        <ListPage
            containerFluid={!!wideMode}
            onReady={getMetaData}
            breadcrumb={['구독', {text: '결제현황', active: true}]}
            titleText="결제현황"
            Buttons={() => (
                <MonthYearSwitch
                    defaultValue={viewUnit}
                    onChange={(value) => {
                        setViewUnit(value);
                        setFocusYear(value === BillingCycleOptions.Monthly ? years[0] : undefined);
                    }}
                />
            )}
            searchInputPosition="right-of-scopes"
            scopeWrapperClass="!items-start"
            searchInputPlaceholder="서비스명 검색"
            ScopeHandler={
                viewUnit === BillingCycleOptions.Monthly ? (
                    <YearlyScopeHandler years={years} value={focusYear} onChange={setFocusYear} />
                ) : (
                    <div />
                )
            }
            onSearch={(keyword) => {
                const ref = viewUnit === BillingCycleOptions.Monthly ? monthlyRef : yearlyRef;
                ref.current?.search(keyword);
            }}
            onDownload={() => {
                const ref = viewUnit === BillingCycleOptions.Monthly ? monthlyRef : yearlyRef;
                ref.current?.downloadExcel();
            }}
        >
            {viewUnit === BillingCycleOptions.Monthly ? (
                focusYear ? (
                    <BillingHistoryMonthly ref={monthlyRef} focusYear={focusYear} wideMode={wideMode} />
                ) : (
                    <div></div>
                )
            ) : (
                <BillingHistoryYearly ref={yearlyRef} years={years} />
            )}
        </ListPage>
    );
});
