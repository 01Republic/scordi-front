import React, {memo, useState} from 'react';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {FaTimes} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa6';
import {eventCut} from '^utils/event';
import {toast} from 'react-hot-toast';
import {inviteMembershipApi} from '^models/Membership/api';
import {errorToast} from '^api/api';
import {confirm2} from '^components/util/dialog';
import {collectInputs} from '^utils/form';

interface InviteMemberModalProps {
    organizationId: number;
    isOpened: boolean;
    onClose: () => any;
    reload?: () => any;
}

export const InviteMemberModal = memo((props: InviteMemberModalProps) => {
    const {organizationId, isOpened, onClose, reload} = props;
    const [isLoading, setIsLoading] = useState(false);

    const onChange = async (emails: string[]) => {
        if (emails.length < 1) {
            toast.error('이메일을 입력해주세요.');
            return;
        }

        const isConfirmed = await confirm2('초대를 전송할까요?').then((res) => res.isConfirmed);
        if (!isConfirmed) return;

        setIsLoading(true);
        inviteMembershipApi
            .create({
                organizationId,
                invitations: emails.map((email) => ({email})),
            })
            .then(() => {
                reload && reload();
                toast.success('입력하신 이메일로 초대를 보냈습니다.');
                onClose();
            })
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="sm:max-w-lg mx-auto w-full self-start sm:mt-20">
                <div className="w-full"></div>

                <form
                    onSubmit={(e) => {
                        eventCut(e);
                        const inputs = collectInputs(e.currentTarget);
                        const emails = inputs.filter((input) => input.value).map((input) => input.value);
                        return onChange(emails);
                    }}
                >
                    <div className="modal-box max-w-screen-sm sm:max-w-[32rem] w-full scale-100 p-0 rounded-none sm:rounded-box min-h-screen max-h-screen sm:min-h-min sm:max-h-[initial] relative">
                        <div className="px-8 pt-10">
                            <div className="flex items-center justify-between relative">
                                <h3 className="text-2xl">멤버 초대하기</h3>
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

                        {/*<div className="px-8">*/}
                        {/*    <p className="">초대할 사용자의 이메일을 입력해주세요</p>*/}
                        {/*</div>*/}

                        <div className="px-8 py-10">
                            <label className="w-full flex flex-col gap-2">
                                <span className="font-medium text-gray-500">이메일</span>
                                <EmailInput isLoading={isLoading} />
                                <EmailInput isLoading={isLoading} />
                                <EmailInput isLoading={isLoading} />
                            </label>
                        </div>

                        <div className="px-8 pb-10 text-right">
                            <button className={`btn btn-scordi ${isLoading ? 'link_to-loading' : ''}`}>
                                <span>보내기</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AnimatedModal>
    );
});
InviteMemberModal.displayName = 'InviteMemberModal';

interface EmailInputProps {
    onAddButtonClick?: () => any;
    isLoading?: boolean;
}

const EmailInput = (props: EmailInputProps) => {
    const {onAddButtonClick, isLoading = false} = props;

    return (
        <div className="flex items-center gap-2">
            <input
                type="email"
                className="input input-bordered flex-1"
                placeholder="초대할 사용자의 이메일을 입력해주세요"
                disabled={isLoading}
            />

            <button
                type="button"
                className={`btn btn-white btn-square ${isLoading ? 'btn-disabled' : ''}`}
                onClick={onAddButtonClick}
            >
                <FaPlus />
            </button>
        </div>
    );
};
