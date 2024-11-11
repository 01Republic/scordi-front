import React, {memo, useRef, useState} from 'react';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {FaTimes} from 'react-icons/fa';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {inviteMembershipApi} from '^models/Membership/api';
import {confirm2} from '^components/util/dialog';
import {useInviteInputs} from './useInviteInputs.hook';
import {InviteEmailInput} from './InviteEmailInput';

interface InviteMemberModalProps {
    organizationId: number;
    isOpened: boolean;
    onClose: () => any;
    reload?: () => any;
}

export const InviteMemberModal = memo((props: InviteMemberModalProps) => {
    const {organizationId, isOpened, onClose, reload} = props;
    const [isLoading, setIsLoading] = useState(false);
    const {inputs, addInput, updateInput, removeInput, resetInputs} = useInviteInputs();
    const newInputRef = useRef<HTMLLabelElement>(null);

    const inviteMemberships = async (emails: string[]) => {
        const invitations = emails.map((email) => ({email}));
        return inviteMembershipApi.create({organizationId, invitations});
    };

    const onSubmit = async (emails: string[]) => {
        if (emails.length < 1) {
            toast.error('이메일을 입력해주세요.');
            return;
        }

        const isConfirmed = await confirm2('초대를 전송할까요?').then((res) => res.isConfirmed);
        if (!isConfirmed) return;

        setIsLoading(true);
        inviteMemberships(emails)
            .then(() => {
                reload && reload();
                toast.success('입력하신 이메일로 초대를 보냈습니다.');
                onClose();
                resetInputs();
            })
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="sm:max-w-lg mx-auto w-full self-start sm:mt-20">
                <div className="w-full"></div>

                <div className="modal-box max-w-screen-sm sm:max-w-[32rem] w-full scale-100 p-0 rounded-none sm:rounded-box min-h-screen max-h-screen sm:min-h-min sm:max-h-[initial] relative">
                    <div className="px-8 pt-10">
                        <div className="flex items-center justify-between relative">
                            <div>
                                <p className="font-medium text-12 text-scordi">멤버 초대하기</p>
                                <h3 className="font-bold text-xl">초대할 사용자의 이메일을 입력해주세요</h3>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="btn btn-square btn-sm !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all absolute bottom-0 right-0 z-[1]"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-10">
                        <label ref={newInputRef} className="block mb-6">
                            <InviteEmailInput defaultValue={''} onSubmit={addInput} isLoading={isLoading} />
                        </label>

                        {!!inputs.length && (
                            <div>
                                <div className="pb-1.5">
                                    <p className="text-12 p-0 text-gray-400 font-medium">
                                        등록할 멤버 ({inputs.length})
                                    </p>
                                </div>
                                <div className="border-t border-gray-200">
                                    {inputs.map((input, i) => (
                                        <InviteEmailInput
                                            key={`${input}-${i}`}
                                            defaultValue={input}
                                            onSubmit={(value) => updateInput(input, value)}
                                            onRemove={removeInput}
                                            resetFocus={() => newInputRef.current?.click()}
                                            isLoading={isLoading}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-8 pb-10 text-right">
                        <button
                            onClick={() => onSubmit(inputs)}
                            className={`btn btn-scordi ${isLoading ? 'link_to-loading' : ''}`}
                        >
                            <span>보내기</span>
                        </button>
                    </div>
                </div>
            </div>
        </AnimatedModal>
    );
});
InviteMemberModal.displayName = 'InviteMemberModal';
