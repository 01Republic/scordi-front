import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {plainToInstance} from 'class-transformer';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';
import {CodefBankAccountParserListPageRoute} from '^pages/admin/factories/codef-bank-account-parsers';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {LoadableBox} from '^components/util/loading';
import {useIdParam} from '^atoms/common';
import {
    CreateCodefBankAccountParserRequestDto,
    UpdateCodefBankAccountParserRequestDto,
} from '^models/_codef/CodefBankAccountParser/type';
import {FindOperatorType} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';
import {useCodefBankAccountParser, useCurrentBankAccountParser} from '../hooks';
import {CodefBankAccountParserForm} from '../form/CodefBankAccountParserForm';
import {CodefBankAccountParserActions} from './CodefBankAccountParserActions';

export const CodefBankAccountParserEditPage = memo(function CodefBankAccountParserEditPage() {
    const id = useIdParam('id');
    const router = useRouter();
    const {data: parser, isFetching: isLoading, refetch} = useCodefBankAccountParser(id);
    const [_, setParser] = useCurrentBankAccountParser();
    const form = useForm<UpdateCodefBankAccountParserRequestDto>();

    useEffect(() => {
        setParser(parser || null);

        const {ops = FindOperatorType.Like, fo = false, bo = true, value = ''} = parser?.resMemberStoreName || {};
        form.reset({
            title: parser?.title,
            productId: parser?.productId,
            computedAccountDesc: {ops, fo, bo, value},
            groupingMethod: parser?.groupingMethod,
            fixedRecurringType: parser?.fixedRecurringType,
            isActive: parser?.isActive,
            memo: parser?.memo,
        });
    }, [parser]);

    const onSubmit = (dto: UpdateCodefBankAccountParserRequestDto) => {
        const data = plainToInstance(CreateCodefBankAccountParserRequestDto, dto);
        const {computedAccountDesc} = data;
        if (computedAccountDesc) data.computedAccountDesc = computedAccountDesc.asApiValues!();

        adminCodefBankAccountParserApi
            .update(id, data)
            .then(() => toast.success('Successfully Saved!'))
            .then(() => router.push(CodefBankAccountParserListPageRoute.path()))
            .catch(errorToast);
    };
    console.log('CodefBankAccountParserEditPage.parser', parser);

    return (
        <AdminDetailPageLayout
            title={`[코드에프] 계좌 파서 수정 : ${parser?.title || ''} (#${id})`}
            breadcrumbs={[
                {text: '파서 공장 (신)'},
                {text: '[코드에프] 계좌 파서 목록', href: CodefCardParserListPageRoute.path()},
                {text: `계좌 파서 수정 (#${id})`},
            ]}
        >
            <AdminPageContainer fluid>
                {parser && <CodefBankAccountParserActions parser={parser} refetch={refetch} />}

                <LoadableBox isLoading={isLoading} loadingType={2}>
                    <CodefBankAccountParserForm
                        parser={parser}
                        form={form}
                        onSubmit={onSubmit}
                        readOnly={isLoading || !parser}
                    />
                </LoadableBox>
            </AdminPageContainer>
            <div className="pt-10 px-2 sm:px-8">
                <div className="w-full"></div>
            </div>
        </AdminDetailPageLayout>
    );
});
