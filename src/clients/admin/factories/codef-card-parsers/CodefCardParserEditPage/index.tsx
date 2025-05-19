import {memo, MouseEvent, useEffect} from 'react';
import {useIdParam} from '^atoms/common';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {LoadableBox} from '^components/util/loading';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';
import {CodefCardParserForm} from '../form/CodefCardParserForm';
import {useForm} from 'react-hook-form';
import {UpdateCodefCardParserRequestDto} from '^models/_codef/CodefCardParser/type/UpdateCodefCardParser.request.dto';
import {useCodefCardParser, useCurrentCardParser} from '^admin/factories/codef-card-parsers/hooks';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefCardParserActions} from '^admin/factories/codef-card-parsers/CodefCardParserEditPage/CodefCardParserActions';
import {plainToInstance} from 'class-transformer';
import {CreateCodefCardParserRequestDto} from '^models/_codef/CodefCardParser/type/CreateCodefCardParser.request.dto';

export const CodefCardParserEditPage = memo(function CodefCardParserEditPage() {
    const id = useIdParam('id');
    const router = useRouter();
    const {data: parser, isFetching: isLoading, refetch} = useCodefCardParser(id);
    const [_, setParser] = useCurrentCardParser();
    const form = useForm<UpdateCodefCardParserRequestDto>();

    useEffect(() => {
        setParser(parser || null);

        form.reset({
            title: parser?.title,
            productId: parser?.productId,
            resMemberStoreName: parser?.resMemberStoreName,
            groupingMethod: parser?.groupingMethod,
            fixedRecurringType: parser?.fixedRecurringType,
            isActive: parser?.isActive,
            memo: parser?.memo,
        });
    }, [parser]);

    const onSubmit = (dto: UpdateCodefCardParserRequestDto) => {
        const data = plainToInstance(CreateCodefCardParserRequestDto, dto);
        const {resMemberStoreName} = data;
        if (resMemberStoreName) dto.resMemberStoreName = resMemberStoreName.asApiValues!();

        adminCodefCardParserApi
            .update(id, dto)
            .then(() => toast.success('Successfully Saved!'))
            .then(() => router.push(CodefCardParserListPageRoute.path()))
            .catch(errorToast);
    };
    console.log('CodefCardParserEditPage.parser', parser);

    return (
        <AdminDetailPageLayout
            title={`[코드에프] 카드 파서 수정 : ${parser?.title || ''} (#${id})`}
            breadcrumbs={[
                {text: '파서 공장 (신)'},
                {text: '[코드에프] 카드 파서 목록', href: CodefCardParserListPageRoute.path()},
                {text: `카드 파서 수정 (#${id})`},
            ]}
        >
            <AdminPageContainer fluid>
                {parser && <CodefCardParserActions parser={parser} refetch={refetch} />}

                <LoadableBox isLoading={isLoading} loadingType={2}>
                    <CodefCardParserForm
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
