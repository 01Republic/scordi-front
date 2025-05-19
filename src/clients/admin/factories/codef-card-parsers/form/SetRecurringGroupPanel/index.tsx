import React, {memo, useEffect} from 'react';
import {useFormContext, UseFormReturn} from 'react-hook-form';
import {
    ContentPanel,
    ContentPanelBody,
    ContentPanelHeading,
    ContentPanelItem,
    ContentPanelList,
} from '^layouts/ContentLayout';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {Spinner, LoadableBox} from '^components/util/loading';
import {useSearchCodefBillingHistories} from '../share/useSearchCodefBillingHistories';
import {useCodefBillingHistoriesGroup} from '../share/useCodefBillingHistoriesGroup';
import {FetchStep3DataButton} from './FetchStep3DataButton';
import {GroupingMethodRadioGroup} from './GroupingMethodRadioGroup';
import {RecurringGroup} from './RecurringGroup';
import {UpdateCodefCardParserRequestDto} from '^models/_codef/CodefCardParser/type/UpdateCodefCardParser.request.dto';
import {
    FindOperatorType,
    GroupingMethod,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';

interface SetRecurringGroupPanelProps {
    selectedCodefCard?: CodefCardDto;
}

export const SetRecurringGroupPanel = memo((props: SetRecurringGroupPanelProps) => {
    const {selectedCodefCard} = props;
    const form = useFormContext<UpdateCodefCardParserRequestDto>();
    const {isLoading, codefBillingHistories, search} = useSearchCodefBillingHistories();
    const {isLoading: isGrouping, data: recurringGroups, run: setRecurringGroups} = useCodefBillingHistoriesGroup();

    useEffect(() => {
        fetchBeforeStepData();
    }, []);

    useEffect(() => {
        const values = form.getValues();
        setRecurringGroups(codefBillingHistories, values.groupingMethod || GroupingMethod.byDate);
    }, [codefBillingHistories]);

    const fetchBeforeStepData = () => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, bo, value = ''} = values?.resMemberStoreName || {};
        search({ops, fo, bo, value}, selectedCodefCard);
    };

    const changeGroupingMethod = (method: GroupingMethod, fixedRecurringType?: BillingCycleOptions) => {
        form.setValue('groupingMethod', method);
        form.setValue('fixedRecurringType', fixedRecurringType);
        setRecurringGroups(codefBillingHistories, method, fixedRecurringType);
    };

    return (
        <ContentPanel bodyWrap={false} stickyHeader>
            <ContentPanelHeading
                title="[4단계] 감지된 결제내역을 구독단위로 그룹핑 하는 방법을 설정합니다."
                stickyHeader
            >
                <div className="ml-auto flex items-center gap-2">
                    {isLoading && <Spinner size={15} />}

                    <FetchStep3DataButton onClick={fetchBeforeStepData} />
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
                                        defaultValue={form.getValues('groupingMethod')}
                                        defaultFixedRecurringType={form.getValues('fixedRecurringType')}
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
