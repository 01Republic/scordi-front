import React, {memo, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {UseFormReturn} from 'react-hook-form';
import {ContentPanel, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {LoadableBox} from '^components/util/loading';
import {FindOperatorType} from '../../CodefParserFactory/CreateCodefParserDto';
import {SetRecurringGroupPanel} from '../SetRecurringGroupPanel';
import {ConditionLikeInputGroup} from '../share/ConditionLikeInputGroup';
import {useSearchCodefBillingHistories} from '../share/useSearchCodefBillingHistories';
import {ConditionEqualInputGroup} from '../share/ConditionEqualInputGroup';
import {SearchedCodefBillingHistoryItem} from './SearchedCodefBillingHistoryItem';
import {SelectedCodefCard} from './SelectedCodefCard';
import {SearchCardInput} from './SearchCardInput';
import {CodefParserFormReturn} from '../CodefParserForm';

interface SearchCodefBillingHistoriesPanelProps {
    form: CodefParserFormReturn;
    reloadOnReady?: boolean;
}

export const SearchCodefBillingHistoriesPanel = memo((props: SearchCodefBillingHistoriesPanelProps) => {
    const {form, reloadOnReady = false} = props;
    const [selectedCodefCard, selectCodefCard] = useState<CodefCardDto>();
    const {isLoading, codefBillingHistories, search} = useSearchCodefBillingHistories();

    useEffect(() => {
        if (reloadOnReady) {
            const values = form.getValues();
            const {ops = FindOperatorType.Like, fo, bo, value = ''} = values.resMemberStoreName || {};
            search({ops, fo, bo, value});
        }
    }, [reloadOnReady]);

    const onCardSelect = (codefCard?: CodefCardDto) => {
        selectCodefCard(codefCard);
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, bo, value = ''} = values?.resMemberStoreName || {};
        search({ops, fo, bo, value}, codefCard);
    };

    const onChangeOps = (ops: FindOperatorType) => {
        const values = form.getValues();
        const old = values?.resMemberStoreName;
        const value = old?.value || '';
        let fo = old?.fo;
        let bo = old?.bo;
        switch (ops) {
            case FindOperatorType.Equal:
                fo = false;
                bo = false;
                break;
            case FindOperatorType.Like:
            default:
                fo = false;
                bo = true;
        }
        form.setValue('resMemberStoreName.ops', ops);
        form.setValue('resMemberStoreName.fo', fo);
        form.setValue('resMemberStoreName.bo', bo);
        search({ops, fo, bo, value}, selectedCodefCard);
    };

    const onChangeFo = debounce((fo?: boolean) => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, bo, value = ''} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.fo', fo);
        search({ops, fo, bo, value}, selectedCodefCard);
    }, 500);

    const onChangeBo = debounce((bo?: boolean) => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, value = ''} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.bo', bo);
        search({ops, fo, bo, value}, selectedCodefCard);
    }, 500);

    const onChangeInput = debounce((value: string = '') => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, bo} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.value', value);
        search({ops, fo, bo, value}, selectedCodefCard);
    }, 500);

    const values = form.watch();

    return (
        <>
            <ContentPanel title="[3단계] 카드내역에서 위 서비스의 결제만 추출하는 결제메세지의 패턴을 찾습니다.">
                <ContentPanelList>
                    <ContentPanelItem itemsAlign="start">
                        <div className="flex-1 pr-4 pt-2">
                            <SelectedCodefCard codefCard={selectedCodefCard} onClick={() => onCardSelect(undefined)} />
                            <LoadableBox loadingType={2} isLoading={isLoading} noPadding>
                                <div className="grid grid-cols-7 text-12"></div>
                                {codefBillingHistories.map((codefBillingHistory, i) => (
                                    <SearchedCodefBillingHistoryItem
                                        key={i}
                                        data={codefBillingHistory}
                                        onCardSelect={onCardSelect}
                                    />
                                ))}
                            </LoadableBox>
                        </div>

                        <div className="flex-1">
                            <div className="mb-4">
                                <SearchCardInput onCardSelect={(codefCard) => onCardSelect(codefCard)} />
                            </div>

                            <div className="mb-4">
                                <div className="form-control w-full mb-4">
                                    <label htmlFor="select-resMemberStoreName_condition_type" className="label px-0">
                                        <span className="label-text">결제내역의 텍스트에 변칙이 있나요?</span>
                                    </label>

                                    <select
                                        id="select-resMemberStoreName_condition_type"
                                        className="select select-bordered"
                                        onChange={(e) => onChangeOps(e.currentTarget.value as FindOperatorType)}
                                        defaultValue={values.resMemberStoreName?.ops}
                                    >
                                        <option value={FindOperatorType.Like}>여러 케이스가 있어요.</option>
                                        <option value={FindOperatorType.Equal}>한 가지 케이스만 있어요.</option>
                                    </select>
                                </div>

                                {values.resMemberStoreName?.ops === FindOperatorType.Equal ? (
                                    <ConditionEqualInputGroup
                                        isLoading={isLoading}
                                        value={values.resMemberStoreName?.value}
                                        onChange={onChangeInput}
                                    />
                                ) : (
                                    <ConditionLikeInputGroup
                                        isLoading={isLoading}
                                        fo={{value: values.resMemberStoreName?.fo, onChange: onChangeFo}}
                                        bo={{value: values.resMemberStoreName?.bo, onChange: onChangeBo}}
                                        value={{value: values.resMemberStoreName?.value, onChange: onChangeInput}}
                                    />
                                )}
                            </div>
                        </div>
                    </ContentPanelItem>
                </ContentPanelList>
            </ContentPanel>
            <SetRecurringGroupPanel form={form} selectedCodefCard={selectedCodefCard} reloadOnReady={reloadOnReady} />
        </>
    );
});
SearchCodefBillingHistoriesPanel.displayName = 'SearchCodefBillingHistoriesPanel';
