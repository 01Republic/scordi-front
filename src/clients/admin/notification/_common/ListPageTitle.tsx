import React, {memo} from 'react';
import {SubjectLink} from '^admin/layouts/_common/SubjectLink';
import {AdminNotificationTemplateListPageRoute} from '^pages/admin/notification/templates';

interface ListPageTitleProps {
    domain: 'templates' | 'messages';
}

export const ListPageTitle = memo((props: ListPageTitleProps) => {
    const {domain} = props;

    return (
        <span className="flex items-center gap-4">
            <SubjectLink
                text="알림 템플릿"
                href={AdminNotificationTemplateListPageRoute.path()}
                active={domain === 'templates'}
            />
            {/*<span className="text-gray-300">&middot;</span>*/}
            {/*<SubjectLink*/}
            {/*    text="계좌 파서"*/}
            {/*    href={CodefBankAccountParserListPageRoute.path()}*/}
            {/*    active={domain === 'messages'}*/}
            {/*/>*/}
        </span>
    );
});
ListPageTitle.displayName = 'ListPageTitle';
