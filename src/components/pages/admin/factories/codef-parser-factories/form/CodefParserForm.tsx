import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {plainToInstance} from 'class-transformer';
import {debounce} from 'lodash';
import {savingToast} from '^hooks/useToast';
import {ContentForm} from '^layouts/ContentLayout';
import {CreateCodefParserDto, UpdateCodefParserDto} from '../CodefParserFactory/CreateCodefParserDto';
import {SearchProductPanel} from './SearchProductPanel';
import {SetParserNamePanel} from './SetParserNamePanel';
import {SearchCodefBillingHistoriesPanel} from './SearchCodefBillingHistoriesPanel';
import {FieldValues} from 'react-hook-form/dist/types/fields';

export type CodefParserFormValueDto = CreateCodefParserDto | UpdateCodefParserDto;
export type CodefParserFormReturn = UseFormReturn<CreateCodefParserDto> | UseFormReturn<UpdateCodefParserDto>;

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    /**
     * onSubmit
     * ---
     * 1. 폼을 제출하는 API 요청에 대한 promise 를 리턴해야 하며,
     * 2. 이 promise 는 실행 결과로서 콜백 함수를 리턴해야 합니다.
     */
    onSubmit: (data: T) => Promise<() => any>;
}

interface CreateFormProps extends FormProps<CreateCodefParserDto> {}
interface UpdateFormProps extends FormProps<UpdateCodefParserDto> {}

export const CodefParserForm = (props: CreateFormProps | UpdateFormProps) => {
    const {form, onSubmit} = props;

    const submitHandler = debounce((data: CodefParserFormValueDto) => {
        const dto = plainToInstance(CreateCodefParserDto, data);
        const {searchText, resMemberStoreName} = dto;

        if (searchText.asApiValues) dto.searchText = searchText.asApiValues();
        if (resMemberStoreName.asApiValues) dto.resMemberStoreName = resMemberStoreName.asApiValues();

        savingToast(onSubmit(dto)).then((cbFn) => cbFn && cbFn());
    }, 1000);

    return (
        <div>
            <ContentForm onSubmit={form.handleSubmit(submitHandler)}>
                <SetParserNamePanel form={form} />
                <SearchProductPanel form={form} />
                <SearchCodefBillingHistoriesPanel form={form} />
            </ContentForm>
        </div>
    );
};
