import React, {memo} from 'react';
import {useSubscriptionMenuSummaryV2} from '^models/SubscsriptionSummary/hook';
import {NewSubscriptionDropdown} from '^v3/V3OrgAppsPage/SubscriptionListPageTitle/NewSubscriptionDropdown';

export const SubscriptionListPageTitle = memo(function SubscriptionListPageTitle() {
    const {isLoading, result} = useSubscriptionMenuSummaryV2();

    return (
        <section className="mb-6 flex justify-between flex-col md:flex-row">
            <h1>
                {isLoading ? (
                    <span className="animate-pulse rounded-full bg-slate-200 inline-block w-[300px] h-[38px]" />
                ) : (
                    <span className="block">
                        <span className="text-scordi">{result.total?.toLocaleString()}개</span>의 구독이 등록되어있어요
                    </span>
                )}
            </h1>

            <NewSubscriptionDropdown />
        </section>
    );
});
