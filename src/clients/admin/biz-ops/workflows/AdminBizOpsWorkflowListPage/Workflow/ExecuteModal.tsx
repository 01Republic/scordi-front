import React, {FormEventHandler, memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {RecoilState} from 'recoil';
import {WithChildren} from '^types/global.type';
import {getProgressPercentage, ProgressType} from '^api/biz-ops/progress.api';

interface WorkflowExecuteModalProps<T extends HTMLFormElement> extends WithChildren {
    isShowAtom: RecoilState<boolean>;
    onSubmit: FormEventHandler<T>;
    progress: ProgressType;
    allowBodyScroll?: boolean;
}

export const WorkflowExecuteModal = memo(<T extends HTMLFormElement>(props: WorkflowExecuteModalProps<T>) => {
    const {isShowAtom, progress, onSubmit, allowBodyScroll, children} = props;
    const {isShow, CloseButton} = useModal({isShowAtom, allowBodyScroll});

    const progressPercentage = ((prog: ProgressType) => {
        if (!prog.inProgress || !prog.taskFile) return 0;
        return getProgressPercentage(prog.taskFile);
    })(progress);

    return (
        <div className={`modal ${isShow ? 'modal-open' : ''}`}>
            <div className="modal-box max-w-3xl">
                <CloseButton />

                {progress.inProgress ? (
                    <div>
                        <p>진행중 ... ({progressPercentage}%)</p>
                        <p className="text-slate-500">
                            <small>{progress.taskFile?.data.text || ''}</small>
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <progress
                                    className="progress progress-success w-full"
                                    value={progressPercentage}
                                    max="100"
                                ></progress>
                            </div>

                            <div>{progressPercentage}%</div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        {children}
                        <div className="my-4">
                            <button type="submit" className="btn btn-block btn-primary">
                                Run
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
});
