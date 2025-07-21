import React, {memo} from 'react';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';
import {CodefBankAccountParserListPageRoute} from '^pages/admin/factories/codef-bank-account-parsers';
import {SubjectLink} from './SubjectLink';
import {EmailParserListPageRoute} from '^pages/admin/factories/email-parsers';

interface ListPageTitleProps {
    currentSubject: 'card' | 'bank-account' | 'email';
}

export const ListPageTitle = memo((props: ListPageTitleProps) => {
    const {currentSubject} = props;

    return (
        <span className="flex items-center gap-4">
            <SubjectLink
                text="카드 파서"
                href={CodefCardParserListPageRoute.path()}
                active={currentSubject === 'card'}
            />
            <span className="text-gray-300">&middot;</span>
            <SubjectLink
                text="계좌 파서"
                href={CodefBankAccountParserListPageRoute.path()}
                active={currentSubject === 'bank-account'}
            />
            <span className="text-gray-300">&middot;</span>
            <SubjectLink
                text="이메일 파서"
                href={EmailParserListPageRoute.path()}
                active={currentSubject === 'email'}
            />
        </span>
    );
});
ListPageTitle.displayName = 'ListPageTitle';
