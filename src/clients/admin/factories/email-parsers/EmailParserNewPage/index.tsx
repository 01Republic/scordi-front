import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {LoadableBox} from '^components/util/loading';
import {EmailParserListPageRoute} from '^pages/admin/factories/email-parsers';
import {ContentForm} from '^layouts/ContentLayout';
import {ProductDto} from '^models/Product/type';
import {SetParserNamePanel} from '../../_common/form/SetParserNamePanel';
import {SearchProductPanel} from '../../_common/form/SearchProductPanel';

export const EmailParserNewPage = memo(function EmailParserNewPage() {
    const router = useRouter();
    const form = useForm<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDto>();

    useEffect(() => {
        form.reset({});
    }, []);

    const onSubmit = (data: any) => {
        console.log('data', data);
    };

    return (
        <AdminDetailPageLayout
            title="[Gmail] 새 이메일 파서 추가"
            breadcrumbs={[
                {text: '파서 공장 (신)'},
                {text: '[Gmail] 이메일 파서 목록', href: EmailParserListPageRoute.path()},
                {text: '새 이메일 파서 추가'},
            ]}
        >
            <AdminPageContainer fluid>
                <div></div>

                <LoadableBox isLoading={isLoading} loadingType={2}>
                    <FormProvider {...form}>
                        <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                            <SetParserNamePanel readOnly={isLoading} />
                            <SearchProductPanel
                                defaultValue={selectedProduct}
                                onChange={(product) => {
                                    setSelectedProduct(product);
                                    form.setValue('productId', product?.id);
                                }}
                            />
                        </ContentForm>
                    </FormProvider>
                </LoadableBox>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
