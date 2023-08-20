import React, {memo, useState} from 'react';
import {WorkflowCard} from '../../Workflow/Card';
import {WorkflowExecuteModal} from '../../Workflow/ExecuteModal';
import {ExecuteStepCard} from '../../Workflow/ExecuteStepCard';
import {FileInput} from '../../Workflow/FileInput';
import {TextInput} from '../../Workflow/TextInput';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {RequestDto} from './request.dto';
import {KBCardExcelToNotionInProgress, KBCardExcelToNotionIsModalShowAtom} from './atom';
import {api} from '^api/api';
import {toast} from 'react-toastify';

export const KBCardExcelToNotionCard = memo(() => {
    const setIsModalShow = useSetRecoilState(KBCardExcelToNotionIsModalShowAtom);
    const inProgress = useRecoilValue(KBCardExcelToNotionInProgress);

    return (
        <WorkflowCard
            title="카드내역(국민) 엑셀 Notion에 업로드"
            onClick={() => setIsModalShow(true)}
            inProgress={inProgress}
        />
    );
});

export const KBCardExcelToNotionModal = () => {
    const form = useForm<RequestDto>();
    const [inProgress, setInProgress] = useRecoilState(KBCardExcelToNotionInProgress);

    const onSubmit = (data: RequestDto) => {
        setInProgress(true);
        api.post('/biz-ops/organizations/excel-to-notion', data, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
            .then(() => toast.success('Done'))
            .catch(() => toast.error('Error'))
            .finally(() => setInProgress(false));
    };

    return (
        <WorkflowExecuteModal isShowAtom={KBCardExcelToNotionIsModalShowAtom}>
            {inProgress ? (
                <>진행중 ...</>
            ) : (
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <ExecuteStepCard
                        title="Excel files"
                        logoImg={
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png'
                        }
                    >
                        <FileInput
                            label={
                                <p className="leading-[1.2]">
                                    <span>승인내역조회 엑셀</span>
                                    <small className="block">(KB국민)</small>
                                </p>
                            }
                            multiple={false}
                            onChange={(e) => {
                                // {/*{...form.register('approvedListFile')}*/}
                                const file = e.target.files ? e.target.files[0] : null;
                                console.log('file', file);
                                if (file) form.setValue('approvedListFile', file);
                                return e;
                            }}
                            required
                        />
                        <FileInput
                            label={
                                <p className="leading-[1.2]">
                                    <span>해외매입내역 엑셀</span>
                                    <small className="block">(KB국민)</small>
                                </p>
                            }
                            multiple={false}
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file) form.setValue('overseasPurchaseListFile', file);
                                return e;
                            }}
                            required
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

                    <div className="my-4">
                        <button type="submit" className="btn btn-block btn-primary">
                            Run
                        </button>
                    </div>
                </form>
            )}
        </WorkflowExecuteModal>
    );
};
