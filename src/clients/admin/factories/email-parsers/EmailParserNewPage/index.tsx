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
import {ServiceDetectStep} from './ServiceDetectStep';
import {CreateEmailParserRequestDto} from '^models/EmailParser/types';
import {ParsingOCRSettingStep} from './ParsingOCRSettingStep';
import {gmailInvoiceParsersAdminApi} from '^models/EmailParser/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

export const EmailParserNewPage = memo(function EmailParserNewPage() {
    const router = useRouter();
    const form = useForm<CreateEmailParserRequestDto>({
        defaultValues: {
            isActive: false,
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDto>();
    const [isOCRStepOpened, setIsOCRStepOpened] = useState(false);

    useEffect(() => {
        form.reset({});
    }, []);

    const onSubmit = (data: CreateEmailParserRequestDto) => {
        console.log('data', data);
        data.isActive ??= false;
        gmailInvoiceParsersAdminApi
            .create(data)
            .then(() => toast.success('저장완료.'))
            .then(() => router.push(EmailParserListPageRoute.path()))
            .catch(errorToast);
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
                <LoadableBox isLoading={isLoading} loadingType={2}>
                    <FormProvider {...form}>
                        <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                            <SetParserNamePanel readOnly={isLoading} />
                            <SearchProductPanel
                                defaultValue={selectedProduct}
                                onChange={(product) => {
                                    setSelectedProduct(product);
                                    product ? form.setValue('productId', product.id) : form.resetField('productId');
                                }}
                            />

                            <ServiceDetectStep onNext={() => setIsOCRStepOpened(true)} />

                            <ParsingOCRSettingStep />
                            {/*{isOCRStepOpened && <ParsingOCRSettingStep />}*/}
                        </ContentForm>
                    </FormProvider>
                </LoadableBox>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
