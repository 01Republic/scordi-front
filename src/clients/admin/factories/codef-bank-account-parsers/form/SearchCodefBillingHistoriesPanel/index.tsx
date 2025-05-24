import React, {memo, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {useFormContext} from 'react-hook-form';
import {ContentPanel, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {UpdateCodefBankAccountParserRequestDto} from '^models/_codef/CodefBankAccountParser/type';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {LoadableBox} from '^components/util/loading';
import {FindOperatorType} from '../../../codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {useSearchCodefBillingHistories} from '../share/useSearchCodefBillingHistories';
import {ConditionEqualInputGroup} from '../share/ConditionEqualInputGroup';
import {ConditionLikeInputGroup} from '../share/ConditionLikeInputGroup';
import {ConditionRegexpInputGroup} from '../share/ConditionRegexpInputGroup';
import {SearchedCodefBillingHistoryItem} from './SearchedCodefBillingHistoryItem';
import {SelectedCodefBankAccount} from './SelectedCodefBankAccount';
import {SearchBankAccountInput} from './SearchBankAccountInput';
import {SetRecurringGroupPanel} from '../SetRecurringGroupPanel';

export const SearchCodefBillingHistoriesPanel = memo(() => {
    const form = useFormContext<UpdateCodefBankAccountParserRequestDto>();
    const [selectedCodefBankAccount, selectCodefBankAccount] = useState<CodefBankAccountDto>();
    const {isLoading, codefBillingHistories, search} = useSearchCodefBillingHistories();

    useEffect(() => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, bo, value = ''} = values.resMemberStoreName || {};
        search({ops, fo, bo, value});
    }, []);

    const onBankAccountSelect = (codefBankAccount?: CodefBankAccountDto) => {
        selectCodefBankAccount(codefBankAccount);
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, bo, value = ''} = values?.resMemberStoreName || {};
        search({ops, fo, bo, value}, codefBankAccount);
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
            case FindOperatorType.Regexp:
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
        search({ops, fo, bo, value}, selectedCodefBankAccount);
    };

    const onChangeFo = debounce((fo?: boolean) => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, bo, value = ''} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.fo', fo);
        search({ops, fo, bo, value}, selectedCodefBankAccount);
    }, 500);

    const onChangeBo = debounce((bo?: boolean) => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, value = ''} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.bo', bo);
        search({ops, fo, bo, value}, selectedCodefBankAccount);
    }, 500);

    const onChangeInput = debounce((value: string = '') => {
        const values = form.getValues();
        const {ops = FindOperatorType.Like, fo, bo} = values?.resMemberStoreName || {};
        form.setValue('resMemberStoreName.value', value);
        search({ops, fo, bo, value}, selectedCodefBankAccount);
    }, 500);

    const values = form.getValues();

    return (
        <>
            <ContentPanel
                title="[3단계] 입출금 내역에서 위 서비스의 결제만 추출하는 결제메세지의 패턴을 찾습니다."
                stickyHeader
            >
                <ContentPanelList>
                    <ContentPanelItem itemsAlign="start">
                        <div className="flex-1 pr-4 pt-2">
                            <SelectedCodefBankAccount
                                codefBankAccount={selectedCodefBankAccount}
                                onClick={() => onBankAccountSelect(undefined)}
                            />
                            <LoadableBox loadingType={2} isLoading={isLoading} noPadding>
                                <div className="grid grid-cols-7 text-12 text-gray-500">
                                    <div>결과: {codefBillingHistories.length}개</div>
                                </div>
                                {codefBillingHistories.map((codefBillingHistory, i) => (
                                    <SearchedCodefBillingHistoryItem
                                        key={i}
                                        data={codefBillingHistory}
                                        onSelect={onBankAccountSelect}
                                    />
                                ))}
                            </LoadableBox>
                        </div>

                        <div className="flex-1">
                            <div className="mb-4">
                                <SearchBankAccountInput onSelect={onBankAccountSelect} />
                            </div>

                            <div className="mb-4">
                                <div className="form-control w-full mb-4">
                                    <label htmlFor="select-resMemberStoreName_condition_type" className="label px-0">
                                        <span className="label-text">입출금 내역의 텍스트에 변칙이 있나요?</span>
                                    </label>

                                    <select
                                        id="select-resMemberStoreName_condition_type"
                                        className="select select-bordered"
                                        onChange={(e) => onChangeOps(e.currentTarget.value as FindOperatorType)}
                                        defaultValue={values.resMemberStoreName?.ops}
                                    >
                                        <option value={FindOperatorType.Like}>여러 케이스가 있어요.</option>
                                        <option value={FindOperatorType.Equal}>한 가지 케이스만 있어요.</option>
                                        <option value={FindOperatorType.Regexp}>정규표현식!</option>
                                    </select>
                                </div>

                                {values.resMemberStoreName?.ops === FindOperatorType.Equal ? (
                                    <ConditionEqualInputGroup
                                        isLoading={isLoading}
                                        value={values.resMemberStoreName?.value}
                                        onChange={onChangeInput}
                                    />
                                ) : values.resMemberStoreName?.ops === FindOperatorType.Regexp ? (
                                    <ConditionRegexpInputGroup
                                        isLoading={isLoading}
                                        value={{value: values.resMemberStoreName?.value, onChange: onChangeInput}}
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
            <SetRecurringGroupPanel selectedCodefBankAccount={selectedCodefBankAccount} />
        </>
    );
});
SearchCodefBillingHistoriesPanel.displayName = 'SearchCodefBillingHistoriesPanel';
