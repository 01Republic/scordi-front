import {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {CodefParserListPageRoute} from '^pages/admin/factories/codef-parsers';
import {AdminDetailPageLayout} from '^admin/layouts';
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
    }, [router.isReady]);

    const onSubmit = (dto: CreateCodefParserDto) => {
        return codefParserFactoryApi.create(dto).then((res) => {
            if (confirm('목록으로 돌아갈까요?\n\n그대로 있길 원한다면 [취소]를 눌러주세요 :)')) {
                router.push(CodefParserListPageRoute.path());
            }
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
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <CodefParserForm form={form} onSubmit={onSubmit} />
                </div>
            </div>
        </AdminDetailPageLayout>
    );
});
