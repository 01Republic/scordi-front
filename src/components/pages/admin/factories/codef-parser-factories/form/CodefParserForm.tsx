import React, {useEffect} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {ContentForm} from '^layouts/ContentLayout';
import {
    CreateCodefParserDto,
    FindOperatorType,
    GroupingMethod,
    UpdateCodefParserDto,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {SearchProductPanel} from './SearchProductPanel';
import {SetParserNamePanel} from './SetParserNamePanel';
import {SearchCodefBillingHistoriesPanel} from './SearchCodefBillingHistoriesPanel';
import {plainToInstance} from 'class-transformer';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {debounce} from 'lodash';
import {CodefParserListPageRoute} from '^pages/admin/factories/codef-parsers';
import {useRouter} from 'next/router';
import {plainToast as toast} from '^hooks/useToast';

export type CodefParserFormValueDto = CreateCodefParserDto | UpdateCodefParserDto;
export type CodefParserFormReturn = UseFormReturn<CreateCodefParserDto> | UseFormReturn<UpdateCodefParserDto>;

interface CodefParserFormProps {
    form: CodefParserFormReturn;
    onSubmit: ((data: CreateCodefParserDto) => Promise<any>) | ((data: UpdateCodefParserDto) => Promise<any>);
}

export const CodefParserForm = (props: CodefParserFormProps) => {
    const {form, onSubmit} = props;
    const router = useRouter();

    const submitHandler = debounce((data: CodefParserFormValueDto) => {
        const dto = plainToInstance(CreateCodefParserDto, data);
        const {searchText, resMemberStoreName} = dto;

        if (searchText.asApiValues) dto.searchText = searchText.asApiValues();
        if (resMemberStoreName.asApiValues) dto.resMemberStoreName = resMemberStoreName.asApiValues();

        toast.promise(onSubmit(dto), {
            loading: '저장하는 중',
            success: '저장 성공!',
            error: '문제가 생겨 저장하지 못했어요 :(',
        });
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
