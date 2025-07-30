import {memo} from 'react';
import {AdminListPageLayout} from '^admin/layouts';
import {ListPageTitle} from '^admin/factories/_common/ListPageTitle';
import {EmailParserNewPageRoute} from '^pages/admin/factories/email-parsers/new';

export const EmailParserListPage = memo(function EmailParserListPage() {
    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="email" />}
            breadcrumbs={[{text: '파서 공장 (신)'}, {text: '[Gmail] 이메일 파서 목록'}]}
            createPageRoute={EmailParserNewPageRoute.path()}
        >
            <div className="pt-10 px-2 sm:px-4">EmailParserListPage</div>
        </AdminListPageLayout>
    );
});
