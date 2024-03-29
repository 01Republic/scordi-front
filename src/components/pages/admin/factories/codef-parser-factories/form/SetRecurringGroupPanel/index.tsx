import React, {memo, useEffect} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {
    ContentPanel,
    ContentPanelBody,
    ContentPanelHeading,
    ContentPanelItem,
    ContentPanelList,
} from '^layouts/ContentLayout';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CreateCodefParserDto, GroupingMethod} from '../../CodefParserFactory/CreateCodefParserDto';
import {Spinner} from '../share/Spinner';
import {LoadableBox} from '../share/LoadableBox';
import {useSearchCodefBillingHistories} from '../share/useSearchCodefBillingHistories';
import {useCodefBillingHistoriesGroup} from '../share/useCodefBillingHistoriesGroup';
import {FetchStep3DataButton} from './FetchStep3DataButton';
import {GroupingMethodRadioGroup} from './GroupingMethodRadioGroup';
import {RecurringGroup} from './RecurringGroup';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

interface SetRecurringGroupPanelProps {
    form: UseFormReturn<CreateCodefParserDto>;
    selectedCodefCard?: CodefCardDto;
}

export const SetRecurringGroupPanel = memo((props: SetRecurringGroupPanelProps) => {
    const {form, selectedCodefCard} = props;
    const {isLoading, codefBillingHistories, search} = useSearchCodefBillingHistories();
    const {isLoading: isGrouping, data: recurringGroups, run: setRecurringGroups} = useCodefBillingHistoriesGroup();

    useEffect(() => {
        setRecurringGroups(codefBillingHistories, form.getValues('groupingMethod') || GroupingMethod.byDate);
    }, [codefBillingHistories]);

    const changeGroupingMethod = (method: GroupingMethod, fixedRecurringType?: BillingCycleOptions) => {
        form.setValue('groupingMethod', method);
        form.setValue('fixedRecurringType', fixedRecurringType);
        setRecurringGroups(codefBillingHistories, method, fixedRecurringType);
    };

    return (
        <ContentPanel bodyWrap={false}>
            <ContentPanelHeading title="[4단계] 감지된 결제내역을 구독단위로 그룹핑 하는 방법을 설정합니다.">
                <div className="ml-auto flex items-center gap-2">
                    {isLoading && <Spinner size={15} />}

                    <FetchStep3DataButton
                        onClick={() => {
                            const values = form.getValues();
                            const {ops, fo, bo, value} = values?.resMemberStoreName || {};
                            search({ops, fo, bo, value}, selectedCodefCard);
                        }}
                    />
                </div>
            </ContentPanelHeading>

            <ContentPanelBody>
                <ContentPanelList>
                    <ContentPanelItem itemsAlign="start">
                        <div className="flex-1 pr-4">
                            <LoadableBox loadingType={2} isLoading={isLoading || isGrouping} noPadding>
                                {recurringGroups.map((group, i) => (
                                    <RecurringGroup key={i} group={group} index={i} />
                                ))}
                            </LoadableBox>
                        </div>

                        <div className="flex-1">
                            <div className="mb-4">
                                <h3 className="text-14 mb-4">
                                    반복결제(구독 워크스페이스)에 따른 그룹을 어떻게 묶을까요?
                                </h3>

                                <div className="flex flex-col gap-3">
                                    <GroupingMethodRadioGroup
                                        onChange={changeGroupingMethod}
                                        defaultValue={GroupingMethod.byDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </ContentPanelItem>
                </ContentPanelList>
            </ContentPanelBody>
        </ContentPanel>
    );
});
SetRecurringGroupPanel.displayName = 'SetRecurringGroupPanel';
