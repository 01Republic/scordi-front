import React, {memo} from 'react';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CodefCardTagUI} from '../share/CodefCardTagUI';
import {SearchedCodefBillingHistoryItem} from '../SearchCodefBillingHistoriesPanel/SearchedCodefBillingHistoryItem';
import {WithChildren} from '^types/global.type';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {GroupingMethod} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {CodefBillingHistoriesGroup} from '^admin/factories/codef-card-parsers/form/share/useCodefBillingHistoriesGroup';

interface RecurringGroupProps {
    group: CodefBillingHistoriesGroup;
    index: number;
    reload?: () => any;
}

export const RecurringGroup = memo((props: RecurringGroupProps) => {
    const {group, index, reload} = props;

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
                        reload={reload}
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
    const recurringText = isRecurring ? '에 반복되는' : '에 발생한';
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

    const {codefCard} = group.metadata;

    return (
        <div className="flex items-center gap-1">
            <div className="text-12 font-semibold pt-[2px] pr-1">Group {index + 1}.</div>
            <div className="flex items-center gap-1">
                <div>
                    <CodefCardTagUI codefCard={codefCard} />
                </div>
                <div className="text-12 pt-[2px]"> 카드에서</div>
            </div>

            <div className="flex items-center pt-[2px]">
                <div className="text-12">{children}</div>
            </div>

            <div className="ml-auto flex items-center">
                <div className="text-12 text-gray-400">Sync at: {yyyy_mm_dd_hh_mm(codefCard.updatedAt)}</div>
            </div>
        </div>
    );
});
