import {Transition} from '@headlessui/react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Check} from 'lucide-react';
import {Fragment, memo, useState} from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSubscription: SubscriptionDto | null;
}

export const ConfirmModal = memo(({isOpen, onClose, selectedSubscription}: ConfirmModalProps) => {
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
            <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-xl shadow-top m-[-24px]">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setChecked(!checked)}>
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                checked ? 'bg-scordi-500' : 'bg-gray-300'
                            }`}
                        >
                            <Check className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm">
                            <b>매월 10일</b>에 결제되는 다른 <b>베스핀글로벌주식회사</b> 내역도{' '}
                            <b>{selectedSubscription?.product.name()}</b> 구독으로 모두 바꾸기
                        </div>
                    </div>
                    <button className="w-full py-4 bg-scordi-500 text-white rounded-xl font-medium" onClick={onClose}>
                        확인
                    </button>
                </div>
            </div>
        </Transition>
    );
});

ConfirmModal.displayName = 'ConfirmModal';
