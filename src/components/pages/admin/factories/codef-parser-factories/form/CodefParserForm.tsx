import React, {useEffect} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {ContentForm} from '^layouts/ContentLayout';
import {
    CreateCodefParserDto,
    FindOperatorType,
    GroupingMethod,
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

interface CreateCodefParserFormProps {
    form: UseFormReturn<CreateCodefParserDto>;
}

export const CodefParserForm = (props: CreateCodefParserFormProps) => {
    const {form} = props;
    const router = useRouter();

    useEffect(() => {
        // Create form
        form.setValue('searchText.ops', FindOperatorType.Like);
        form.setValue('searchText.fo', true);
        form.setValue('searchText.bo', true);
        form.setValue('resMemberStoreName.ops', FindOperatorType.Like);
        form.setValue('resMemberStoreName.fo', false);
        form.setValue('resMemberStoreName.bo', true);
        form.setValue('groupingMethod', GroupingMethod.byDate);
        form.setValue('fixedRecurringType', undefined);
    }, []);

    const onSubmit = debounce((data: CreateCodefParserDto) => {
        const dto = plainToInstance(CreateCodefParserDto, data);
        const {searchText, resMemberStoreName} = dto;

        if (searchText.asApiValues) dto.searchText = searchText.asApiValues();
        if (resMemberStoreName.asApiValues) dto.resMemberStoreName = resMemberStoreName.asApiValues();
        console.log('dto', dto);

        codefParserFactoryApi.create(dto).then((res) => {
            console.log(res.data);
            toast.success('저장되었어요!', {duration: 1000});
            setTimeout(() => {
                if (confirm('목록으로 돌아갈까요?\n\n그대로 있길 원한다면 [취소]를 눌러주세요 :)')) {
                    router.push(CodefParserListPageRoute.path());
                }
            }, 1000);
        });
    }, 1000);

    return (
        <div>
            <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                <SetParserNamePanel form={form} />
                <SearchProductPanel form={form} />
                <SearchCodefBillingHistoriesPanel form={form} />
            </ContentForm>
        </div>
    );
};
