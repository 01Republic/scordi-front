import React, {memo} from 'react';
import {Modal} from '^components/Modal';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from 'react-toastify';
import {Icon} from '^components/Icon';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

interface InviteMemberModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // inviteLink: string;
}
export const InviteMemberModal = memo((props: InviteMemberModalProps) => {
    const {isModalOpen, setIsModalOpen} = props;
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const inviteLink = `${typeof window !== 'undefined' && window.location.origin}/signup/${organizationId}`;

    return (
        <Modal
            type={'info'}
            isOpen={isModalOpen}
            title={'멤버 초대하기'}
            description={'초대할 멤버에게 아래 링크를 전달하세요. 링크를 통해 접속한 사용자는 자동으로 멤버가 됩니다.'}
            buttons={[{text: 'Close', onClick: () => setIsModalOpen(false)}]}
            backdrop={{
                onClick: () => setIsModalOpen(false),
            }}
        >
            <div className={'flex justify-between items-center'}>
                <p>{inviteLink}</p>
                <CopyToClipboard text={inviteLink} onCopy={() => toast.info('복사되었습니다.')}>
                    <button className="btn h-4" onClick={() => setIsModalOpen(true)}>
                        <Icon.File />
                    </button>
                </CopyToClipboard>
            </div>
        </Modal>
    );
});
