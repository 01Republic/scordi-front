import React, {memo, useState} from 'react';
import {FormProvider, UseFormReturn} from 'react-hook-form';
import {
    CodefBankAccountParserDto,
    UpdateCodefBankAccountParserRequestDto,
} from '^models/_codef/CodefBankAccountParser/type';
import {ProductDto} from '^models/Product/type';
import {ContentForm} from '^layouts/ContentLayout';
import {SearchProductPanel} from './SearchProductPanel';
import {SetParserNamePanel} from './SetParserNamePanel';
import {SearchCodefBillingHistoriesPanel} from './SearchCodefBillingHistoriesPanel';

interface FormProps {
    parser?: CodefBankAccountParserDto;
    form: UseFormReturn<UpdateCodefBankAccountParserRequestDto>;
    onSubmit: (data: UpdateCodefBankAccountParserRequestDto) => any;
    readOnly?: boolean;
}

export const CodefBankAccountParserForm = memo((props: FormProps) => {
    const {parser, form, onSubmit, readOnly = false} = props;
    const [selectedProduct, setSelectedProduct] = useState<ProductDto | undefined>(parser?.product);

    return (
        <div>
            <FormProvider {...form}>
                <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                    <SetParserNamePanel readOnly={readOnly} />
                    <SearchProductPanel
                        defaultValue={selectedProduct}
                        onChange={(product) => {
                            setSelectedProduct(product);
                            form.setValue('productId', product?.id);
                        }}
                    />
                    <SearchCodefBillingHistoriesPanel />
                </ContentForm>
            </FormProvider>
        </div>
    );
});
