import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {EmailParserListPageRoute} from '^pages/admin/factories/email-parsers';
import {EmailParserEditPageRoute} from '^pages/admin/factories/email-parsers/[id]/edit';
import {CreateEmailParserRequestDto} from '^models/EmailParser/types';
import {gmailInvoiceParsersAdminApi} from '^models/EmailParser/api';
import {EmailParserForm} from '../EmailParserForm';

export const EmailParserNewPage = memo(function EmailParserNewPage() {
    const router = useRouter();
    const form = useForm<CreateEmailParserRequestDto>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data: CreateEmailParserRequestDto) => {
        console.log('data', data);
        data.isActive ??= false;
        setIsLoading(true);
        gmailInvoiceParsersAdminApi
            .create(data)
            .then((res) => {
                toast.success('저장완료.');
                return router.push(EmailParserEditPageRoute.path(res.data.id));
            })
            .catch(errorToast)
            .finally(() => setIsLoading(false));
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
                <FormProvider {...form}>
                    <EmailParserForm onSubmit={form.handleSubmit(onSubmit)} isLoading={isLoading} />
                </FormProvider>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
