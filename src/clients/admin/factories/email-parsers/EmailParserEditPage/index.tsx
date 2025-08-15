import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {EmailParserListPageRoute} from '^pages/admin/factories/email-parsers';
import {UpdateEmailParserRequestDto} from '^models/EmailParser/types';
import {gmailInvoiceParsersAdminApi} from '^models/EmailParser/api';
import {useEmailParser} from '../hooks';
import {EmailParserForm} from '../EmailParserForm';

export const EmailParserEditPage = memo(function EmailParserEditPage() {
    const id = useIdParam('id');
    const router = useRouter();
    const form = useForm<UpdateEmailParserRequestDto>();
    const {data: parser, isFetching: isLoading, refetch} = useEmailParser(id);

    const onSubmit = (data: UpdateEmailParserRequestDto) => {
        console.log('data', data);
        gmailInvoiceParsersAdminApi
            .update(id, data)
            .then((res) => {
                toast.success('저장완료.');
                return refetch();
            })
            .catch(errorToast);
    };

    return (
        <AdminDetailPageLayout
            title={`[Gmail] 이메일 파서 수정 : ${parser?.title || ''} (#${id})`}
            breadcrumbs={[
                {text: '파서 공장 (신)'},
                {text: '[Gmail] 이메일 파서 목록', href: EmailParserListPageRoute.path()},
                {text: `이메일 파서 수정 (#${id})`},
            ]}
        >
            <AdminPageContainer fluid>
                <FormProvider {...form}>
                    <EmailParserForm parser={parser} onSubmit={form.handleSubmit(onSubmit)} isLoading={isLoading} />
                </FormProvider>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
