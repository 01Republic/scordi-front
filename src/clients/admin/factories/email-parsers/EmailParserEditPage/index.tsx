import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {UpdateEmailParserRequestDto} from '^models/EmailParser/types';
import {EmailParserListPageRoute} from '^pages/admin/factories/email-parsers';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {useIdParam} from '^atoms/common';
import {LoadableBox} from '^components/util/loading';
import {useEmailParser} from '../hooks';
import {EmailParserForm} from '../EmailParserForm';

export const EmailParserEditPage = memo(function EmailParserEditPage() {
    const id = useIdParam('id');
    const router = useRouter();
    const form = useForm<UpdateEmailParserRequestDto>();
    const {data: parser, isFetching: isLoading, refetch} = useEmailParser(id);

    const onSubmit = (data: UpdateEmailParserRequestDto) => {
        console.log('data', data);
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
            <p
                onClick={() => {
                    console.log('parser', parser);
                    console.log('form', form.getValues());
                }}
            >
                hi
            </p>
            <AdminPageContainer fluid>
                <FormProvider {...form}>
                    <EmailParserForm parser={parser} onSubmit={form.handleSubmit(onSubmit)} isLoading={isLoading} />
                </FormProvider>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
