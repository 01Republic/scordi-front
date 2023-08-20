import {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {RecoilState} from 'recoil';
import {WithChildren} from '^types/global.type';

interface WorkflowExecuteModalProps extends WithChildren {
    isShowAtom: RecoilState<boolean>;
    allowBodyScroll?: boolean;
}

export const WorkflowExecuteModal = memo((props: WorkflowExecuteModalProps) => {
    const {isShowAtom, allowBodyScroll, children} = props;
    const {isShow, CloseButton} = useModal({isShowAtom, allowBodyScroll});

    return (
        <div className={`modal ${isShow ? 'modal-open' : ''}`}>
            <div className="modal-box max-w-3xl">
                <CloseButton />
                {children}
            </div>
        </div>
    );
});
