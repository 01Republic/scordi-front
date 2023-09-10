import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {KBCardExcelToNotionInProgress, KBCardExcelToNotionIsModalShowAtom} from './atom';
import {WorkflowCard} from '../../Workflow/Card';

export const KBCardExcelToNotionCard = memo(() => {
    const setIsModalShow = useSetRecoilState(KBCardExcelToNotionIsModalShowAtom);
    const progress = useRecoilValue(KBCardExcelToNotionInProgress);

    return (
        <WorkflowCard
            title="카드내역(국민) 엑셀 Notion에 업로드"
            onClick={() => setIsModalShow(true)}
            progress={progress}
        />
    );
});
