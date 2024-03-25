import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {ContentForm} from '^layouts/ContentLayout';
import {CreateParserDto} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateParserDto';
import {SearchProductPanel} from './SearchProductPanel';
import {SetParserNamePanel} from './SetParserNamePanel';
import {SearchCodefBillingHistoriesPanel} from './SearchCodefBillingHistoriesPanel';

interface CreateCodefParserFormProps {
    form: UseFormReturn<CreateParserDto>;
}

export const CodefParserForm = (props: CreateCodefParserFormProps) => {
    const {form} = props;

    return (
        <div>
            {/*<div>1</div>*/}

            <ContentForm
                onSubmit={(e) => {
                    console.log('event', event);
                    console.log('e', e);
                    return false;
                }}
            >
                <SetParserNamePanel form={form} />
                <SearchProductPanel form={form} />
                <SearchCodefBillingHistoriesPanel form={form} />
            </ContentForm>
        </div>
    );
};
