import React, {memo} from 'react';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {GroupingMethod} from '../../CodefParserFactory/CreateCodefParserDto';
import {CodefBillingHistoriesGroup} from '../share/useCodefBillingHistoriesGroup';
import {CodefCardTagUI} from '../share/CodefCardTagUI';
import {SearchedCodefBillingHistoryItem} from '../SearchCodefBillingHistoriesPanel/SearchedCodefBillingHistoryItem';
import {WithChildren} from '^types/global.type';

interface RecurringGroupProps {
    group: CodefBillingHistoriesGroup;
    index: number;
}

export const RecurringGroup = memo((props: RecurringGroupProps) => {
    const {group, index} = props;

    const {groupMethod} = group.metadata;

    return (
        <div className="mb-4">
            {groupMethod === GroupingMethod.byDate && <RecurringGroupTitleByDate {...props} />}
            {groupMethod === GroupingMethod.byCard && <RecurringGroupTitleByCard {...props} />}

            <div className="pl-3 border-l-2">
                {group.entries.map((codefBillingHistory, i) => (
                    <SearchedCodefBillingHistoryItem
                        key={i}
                        data={codefBillingHistory}
                        onCardSelect={() => 0}
                        preventHidden
                    />
                ))}
            </div>
        </div>
    );
});
RecurringGroup.displayName = 'RecurringGroup';

const RecurringGroupTitleByDate = memo((props: RecurringGroupProps) => {
    const {metadata, entries} = props.group;
    const {groupKey: dateName, billingCycleType} = metadata;

    const isRecurring = [BillingCycleOptions.Yearly, BillingCycleOptions.Monthly].includes(billingCycleType);
    const recurringText = isRecurring ? '마다 반복되는' : '에 발생한';
    const recurringTypeText = {
        [BillingCycleOptions.None]: '일반',
        [BillingCycleOptions.Onetime]: '일회성',
        [BillingCycleOptions.Monthly]: '월간',
        [BillingCycleOptions.Yearly]: '연간',
    }[billingCycleType || BillingCycleOptions.None];

    return (
        <RecurringGroupTitleCommon {...props}>
            <mark>{dateName}일</mark>
            {recurringText} <mark>{recurringTypeText}</mark>결제 - {entries.length}건
        </RecurringGroupTitleCommon>
    );
});

const RecurringGroupTitleByCard = memo((props: RecurringGroupProps) => {
    const {metadata, entries} = props.group;

    const recurringTypeText = {
        [BillingCycleOptions.None]: '일반',
        [BillingCycleOptions.Onetime]: '일회성',
        [BillingCycleOptions.Monthly]: '월간',
        [BillingCycleOptions.Yearly]: '연간',
    }[metadata.billingCycleType || BillingCycleOptions.None];

    return (
        <RecurringGroupTitleCommon {...props}>
            발견된 <mark>{recurringTypeText}</mark>결제 - {entries.length}건
        </RecurringGroupTitleCommon>
    );
});

const RecurringGroupTitleCommon = memo((props: RecurringGroupProps & WithChildren) => {
    const {group, index, children} = props;

    return (
        <div className="flex items-center gap-1">
            <div className="text-12 font-semibold pt-[2px] pr-1">Group {index + 1}.</div>
            <div className="flex items-center gap-1">
                <div>
                    <CodefCardTagUI codefCard={group.metadata.codefCard} />
                </div>
                <div className="text-12 pt-[2px]"> 카드에서</div>
            </div>

            <div className="flex items-center pt-[2px]">
                <div className="text-12">{children}</div>
            </div>
        </div>
    );
});
