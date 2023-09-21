import React from 'react';
import {useRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {bizOpsApi} from '^api/biz-ops';
import {getProgressPercentage, ProgressType} from '^api/biz-ops/progress.api';
import {WorkflowExecuteModal} from '../../Workflow/ExecuteModal';
import {ExecuteStepCard} from '../../Workflow/ExecuteStepCard';
import {FileInput} from '../../Workflow/FileInput';
import {TextInput} from '../../Workflow/TextInput';
import {KBBankExcelToNotionInProgress, KBBankExcelToNotionIsModalShowAtom} from './atom';
import {KBBankExcelToNotionRequestDto} from '^api/biz-ops/workflows/kb_bank_excel_to_notion/dto/request.dto';

export const KBBankExcelToNotionModal = () => {
    const form = useForm<KBBankExcelToNotionRequestDto>();
    const [progress, setProgress] = useRecoilState(KBBankExcelToNotionInProgress);

    const checkProgress = (key: string) => {
        bizOpsApi.progressApi.check(key).then((res) => {
            const taskFile = res.data;

            if (taskFile.data.isFinished) {
                toast.success('Done');
                setProgress({inProgress: false, taskFile: null});
            } else {
                setProgress({inProgress: true, taskFile});
                setTimeout(() => checkProgress(key), 1000);
            }
        });
    };

    const onSubmit = (data: KBBankExcelToNotionRequestDto) => {
        setProgress({inProgress: true, taskFile: null});
        const taskName = 'kb_bank_excel_to_notion';
        bizOpsApi.workflowApi
            .run(taskName, data, true)
            .then((res) => {
                setProgress({inProgress: true, taskFile: res.data});
                checkProgress(res.data.key);
            })
            .catch(() => {
                toast.error('Error. (개발자도구를 확인해주세요)');
                setProgress({inProgress: false, taskFile: null});
            });
    };

    return (
        <WorkflowExecuteModal
            isShowAtom={KBBankExcelToNotionIsModalShowAtom}
            onSubmit={form.handleSubmit(onSubmit)}
            progress={progress}
        >
            <ExecuteStepCard
                title="Excel files"
                logoImg={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png'
                }
            >
                <FileInput
                    label={
                        <p className="leading-[1.2]">
                            <span>국내계좌내역 엑셀 *</span>
                            <small className="block">(KB국민)</small>
                        </p>
                    }
                    multiple={false}
                    onChange={(e) => {
                        // {/*{...form.register('approvedListFile')}*/}
                        const file = e.target.files ? e.target.files[0] : null;
                        console.log('file', file);
                        if (file) form.setValue('koBankingListFile', file);
                        return e;
                    }}
                    required
                />
                <FileInput
                    label={
                        <p className="leading-[1.2]">
                            <span>해외계좌내역 엑셀</span>
                            <small className="block">(KB국민)</small>
                        </p>
                    }
                    multiple={false}
                    onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) form.setValue('overseasBankingListFile', file);
                        return e;
                    }}
                />
            </ExecuteStepCard>

            <div className="divider">To</div>

            <ExecuteStepCard
                title="Notion Database"
                logoImg={'https://assets.stickpng.com/images/5fb6d3336e2d460004a5e31f.png'}
            >
                <TextInput
                    label={
                        <p className="leading-[1.2]">
                            <span>카테고리DB ID</span>
                            <small className="block" />
                        </p>
                    }
                    {...form.register('categoryDBId')}
                    required
                />
                <TextInput
                    label={
                        <p className="leading-[1.2]">
                            <span>카드/계좌DB ID</span>
                            <small className="block" />
                        </p>
                    }
                    {...form.register('bankAccountDBId')}
                    required
                />
                <TextInput
                    label={
                        <p className="leading-[1.2]">
                            <span>집계DB ID</span>
                            <small className="block" />
                        </p>
                    }
                    {...form.register('aggCalendarDBId')}
                    required
                />
                <TextInput
                    label={
                        <p className="leading-[1.2]">
                            <span>입출금내역DB ID</span>
                            <small className="block" />
                        </p>
                    }
                    {...form.register('moneyLogDBId')}
                    required
                />
            </ExecuteStepCard>
        </WorkflowExecuteModal>
    );
};
