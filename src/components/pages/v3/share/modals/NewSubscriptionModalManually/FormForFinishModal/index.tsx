import React, {memo, useEffect} from 'react';
import {
    FinishStatus,
    FinishStatusAtom,
    memoAtom,
    newFormForFinishModalAtom,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FinishBody} from '^v3/share/modals/NewSubscriptionModalManually/FormForFinishModal/bodies/FinishBody';
import {MemoBody} from '^v3/share/modals/NewSubscriptionModalManually/FormForFinishModal/bodies/MemoBody';

export const FormForFinishModal = memo(() => {
    const {Modal, isShow, close} = useModal(newFormForFinishModalAtom);
    const finishStatus = useRecoilValue(FinishStatusAtom);
    const setFinishStatus = useSetRecoilState(FinishStatusAtom);
    const setMemo = useSetRecoilState(memoAtom);

    useEffect(() => {
        setFinishStatus(FinishStatus.Finish);
        setMemo('');
    }, [isShow]);

    const onBack = () => {
        if (finishStatus === FinishStatus.Finish) {
            close();
            return;
        }
        if (finishStatus === FinishStatus.Memo) {
            setFinishStatus(FinishStatus.Finish);
            return;
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={onBack} topbarPosition="sticky" />
            <MobileSection.Padding>
                {finishStatus === FinishStatus.Finish && <FinishBody />}
                {finishStatus === FinishStatus.Memo && <MemoBody />}
            </MobileSection.Padding>
            <div className="py-28 flex flex-col"></div>
        </Modal>
    );
});
