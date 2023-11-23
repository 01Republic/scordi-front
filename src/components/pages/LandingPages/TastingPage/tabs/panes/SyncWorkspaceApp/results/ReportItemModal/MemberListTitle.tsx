import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {subjectReportProductItem} from '../../atom';

export const ReportItemModalMemberListTitle = memo(function ReportItemModalMemberListTitle() {
    const subjectItem = useRecoilValue(subjectReportProductItem);

    return (
        <p className="py-3 text-xl font-semibold flex items-center">
            <span className="mr-2">총</span>
            <span className="font-bold text-scordi">{(subjectItem?.members.length || 0).toLocaleString()} 명</span>
            <span>이 쓰고 있어요</span>
        </p>
    );
});
