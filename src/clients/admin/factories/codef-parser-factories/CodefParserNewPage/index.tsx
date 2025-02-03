import {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {CodefParserListPageRoute} from '^pages/admin/factories/codef-parsers';
import {CodefParserEditPageRoute} from '^pages/admin/factories/codef-parsers/[serviceName]/edit';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {CreateCodefParserDto, FindOperatorType, GroupingMethod} from '../CodefParserFactory/CreateCodefParserDto';
import {CodefParserForm} from '../form/CodefParserForm';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {plainToast as toast} from '^hooks/useToast';

export const CodefParserNewPage = memo(function CodefParserNewPage() {
    const router = useRouter();
    const form = useForm<CreateCodefParserDto>();

    useEffect(() => {
        // Create form
        if (!router.isReady) return;

        setFormInitialValue();
    }, [router.isReady]);

    function setFormInitialValue() {
        form.setValue('serviceName', '');
        form.setValue('searchText.ops', FindOperatorType.Like);
        form.setValue('searchText.fo', true);
        form.setValue('searchText.bo', true);
        form.setValue('searchText.value', '');
        form.setValue('resMemberStoreName.ops', FindOperatorType.Like);
        form.setValue('resMemberStoreName.fo', false);
        form.setValue('resMemberStoreName.bo', true);
        form.setValue('resMemberStoreName.value', '');
        form.setValue('groupingMethod', GroupingMethod.byDate);
        form.setValue('fixedRecurringType', undefined);
        console.log(form.getValues());
    }

    const onSubmit = (dto: CreateCodefParserDto) => {
        if (!dto.resMemberStoreName.value) {
            return toast('결제내역의 텍스트 패턴 찾기 입력값이 누락되어있어요!');
        }
        return codefParserFactoryApi.create(dto).then((res) => {
            const editPath = CodefParserEditPageRoute.path(res.data.serviceName);
            return () => router.push(editPath);
        });
    };

    return (
        <AdminDetailPageLayout
            title="[코드에프] 새 파서 추가"
            breadcrumbs={[
                {text: '파서 공장'},
                {text: '[코드에프] 파서 목록', href: CodefParserListPageRoute.path()},
                {text: '새 파서 추가'},
            ]}
        >
            <AdminPageContainer fluid>
                <CodefParserForm form={form} onSubmit={onSubmit} />
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
