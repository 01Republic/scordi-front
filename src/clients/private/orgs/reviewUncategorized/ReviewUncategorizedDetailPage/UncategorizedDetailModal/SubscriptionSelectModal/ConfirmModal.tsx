import {Fragment, memo, useState} from 'react';
import {Check, CircleCheck} from 'lucide-react';
import {Transition} from '@headlessui/react';
import {SubscriptionDto} from '^models/Subscription/types';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSubscription: SubscriptionDto;
}

export const ConfirmModal = memo((props: ConfirmModalProps) => {
    const {isOpen, onClose, selectedSubscription} = props;
    const [checked, setChecked] = useState(false);

    return (
        <Transition
            show={isOpen}
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
        >
            <div className="relative bottom-0 bg-white rounded-t-xl shadow-top max-w-md -mx-5 px-6 pt-8 pb-4">
                <div className="space-y-3 ">
                    <button className="flex items-center gap-3 cursor-pointer" onClick={() => setChecked(!checked)}>
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                checked ? 'bg-primaryColor-900' : 'border-2 border-gray-900'
                            }`}
                        >
                            <Check className={`size-3 stroke-[4px] ${checked ? 'text-white' : 'text-gray-900 '}`} />
                        </div>
                        <span className="text-sm break-all break-words text-start">
                            <b>매월 10일</b>에 결제되는 다른 <b>베스핀글로벌주식회사</b> 내역도 <br />
                            <b> {selectedSubscription?.product.name()}</b> 구독으로 모두 바꾸기
                        </span>
                    </button>
                    <button className="btn btn-scordi btn-md btn-block" onClick={onClose}>
                        확인
                    </button>
                </div>
            </div>
        </Transition>
    );
});

ConfirmModal.displayName = 'ConfirmModal';
