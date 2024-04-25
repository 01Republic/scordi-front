import {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {WorkflowCard} from '../../Workflow/Card';
import {KBBankExcelToNotionInProgress, KBBankExcelToNotionIsModalShowAtom} from './atom';

export const KBBankExcelToNotionCard = memo(() => {
    const setIsModalShow = useSetRecoilState(KBBankExcelToNotionIsModalShowAtom);
    const progress = useRecoilValue(KBBankExcelToNotionInProgress);

    return (
        <WorkflowCard
            title="계좌내역(국민) 엑셀 Notion에 업로드"
            onClick={() => setIsModalShow(true)}
            progress={progress}
        />
    );
});
