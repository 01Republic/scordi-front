import {memo} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {CreateCodefParserDto} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {AdminDetailPageLayout} from '^admin/layouts';
import {CodefParserListPageRoute} from '^pages/admin/factories/codef-parsers';
import {CodefParserForm} from '^admin/factories/codef-parser-factories/form/CodefParserForm';

export const CodefParserNewPage = memo(function CodefParserNewPage() {
    const router = useRouter();
    const form = useForm<CreateCodefParserDto>();

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
                    <CodefParserForm form={form} />
                </div>
            </div>
        </AdminDetailPageLayout>
    );
});
