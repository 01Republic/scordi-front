import {memo, useEffect, useState} from 'react';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';
import {useForm} from 'react-hook-form';
import {CreateCodefCardParserRequestDto} from '^models/_codef/CodefCardParser/type/CreateCodefCardParser.request.dto';
import {LoadableBox} from '^components/util/loading';
import {CodefCardParserForm} from '^admin/factories/codef-card-parsers/form/CodefCardParserForm';
import {UpdateCodefCardParserRequestDto} from '^models/_codef/CodefCardParser/type/UpdateCodefCardParser.request.dto';
import {plainToInstance} from 'class-transformer';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useRouter} from 'next/router';
import {FindOperatorType, GroupingMethod} from '../../codef-parser-factories/CodefParserFactory/CreateCodefParserDto';

export const CodefCardParserNewPage = memo(function CodefCardParserNewPage() {
    const router = useRouter();
    const form = useForm<UpdateCodefCardParserRequestDto>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        form.reset({
            title: '',
            productId: undefined,
            resMemberStoreName: {ops: FindOperatorType.Like, fo: false, bo: true, value: ''},
            groupingMethod: GroupingMethod.byDate,
            fixedRecurringType: null,
            isActive: false,
            memo: '',
        });
    }, []);

    const onSubmit = (dto: UpdateCodefCardParserRequestDto) => {
        const data = plainToInstance(CreateCodefCardParserRequestDto, dto);
        const {resMemberStoreName} = data;
        if (resMemberStoreName) data.resMemberStoreName = resMemberStoreName.asApiValues!();

        setIsLoading(true);
        adminCodefCardParserApi
            .create({...data, isActive: false})
            .then(() => toast.success('Successfully Saved!'))
            .then(() => router.push(CodefCardParserListPageRoute.path()))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <AdminDetailPageLayout
            title="[코드에프] 새 카드 파서 추가"
            breadcrumbs={[
                {text: '파서 공장 (신)'},
                {text: '[코드에프] 카드 파서 목록', href: CodefCardParserListPageRoute.path()},
                {text: `새 카드 파서 추가`},
            ]}
        >
            <AdminPageContainer fluid>
                <div></div>

                <LoadableBox isLoading={isLoading} loadingType={2}>
                    <CodefCardParserForm form={form} onSubmit={onSubmit} readOnly={isLoading} />
                </LoadableBox>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
