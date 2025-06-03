import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {plainToInstance} from 'class-transformer';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefBankAccountParserListPageRoute} from '^pages/admin/factories/codef-bank-account-parsers';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {LoadableBox} from '^components/util/loading';
import {
    FindOperatorType,
    GroupingMethod,
} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';
import {
    CreateCodefBankAccountParserRequestDto,
    UpdateCodefBankAccountParserRequestDto,
} from '^models/_codef/CodefBankAccountParser/type';
import {CodefBankAccountParserForm} from '../form/CodefBankAccountParserForm';

export const CodefBankAccountParserNewPage = memo(function CodefBankAccountParserNewPage() {
    const router = useRouter();
    const form = useForm<UpdateCodefBankAccountParserRequestDto>();
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

    const onSubmit = (dto: UpdateCodefBankAccountParserRequestDto) => {
        const data = plainToInstance(CreateCodefBankAccountParserRequestDto, dto);
        const {resMemberStoreName} = data;
        if (resMemberStoreName) data.resMemberStoreName = resMemberStoreName.asApiValues!();

        setIsLoading(true);
        adminCodefBankAccountParserApi
            .create({...data, isActive: false})
            .then(() => toast.success('Successfully Saved!'))
            .then(() => router.push(CodefBankAccountParserListPageRoute.path()))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <AdminDetailPageLayout
            title="[코드에프] 새 계좌 파서 추가"
            breadcrumbs={[
                {text: '파서 공장 (신)'},
                {text: '[코드에프] 계좌 파서 목록', href: CodefBankAccountParserListPageRoute.path()},
                {text: `새 계좌 파서 추가`},
            ]}
        >
            <AdminPageContainer fluid>
                <div></div>

                <LoadableBox isLoading={isLoading} loadingType={2}>
                    <CodefBankAccountParserForm form={form} onSubmit={onSubmit} readOnly={isLoading} />
                </LoadableBox>
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
