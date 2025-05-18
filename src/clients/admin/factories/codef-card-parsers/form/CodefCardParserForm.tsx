import React, {memo, useState} from 'react';
import {FormProvider, UseFormReturn} from 'react-hook-form';
import {ContentForm} from '^layouts/ContentLayout';
import {SearchProductPanel} from './SearchProductPanel';
import {SetParserNamePanel} from './SetParserNamePanel';
import {SearchCodefBillingHistoriesPanel} from './SearchCodefBillingHistoriesPanel';
import {UpdateCodefCardParserRequestDto} from '^models/_codef/CodefCardParser/type/UpdateCodefCardParser.request.dto';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {ProductDto} from '^models/Product/type';

interface FormProps {
    parser?: CodefCardParserDto;
    form: UseFormReturn<UpdateCodefCardParserRequestDto>;
    onSubmit: (data: UpdateCodefCardParserRequestDto) => any;
    readOnly?: boolean;
}

export const CodefCardParserForm = memo((props: FormProps) => {
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
                            console.log('productId', product?.id);
                        }}
                    />
                    <SearchCodefBillingHistoriesPanel />
                </ContentForm>
            </FormProvider>
        </div>
    );
});
