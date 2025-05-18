import { memo, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { ArrowLeft, Ellipsis, Info, Plus } from 'lucide-react';
import { LinkTo } from '^components/util/LinkTo';
import { SlideSideModal } from '^components/modals/_shared/SlideSideModal';
import { useSubscriptionListOfBankAccount } from '^models/Subscription/hook';
import { SubscriptionDto } from '^models/Subscription/types';
import { SelectableSubscriptionItem } from './SelectableSubscriptionItem';
import { NewSubscriptionModal } from './NewSubscriptionModal';
import { ConfirmModal } from './ConfirmModal';

interface SubscriptionSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any;
}

export const SubscriptionSelectModal = memo((props: SubscriptionSelectModalProps) => {
    const { isOpen, onClose, item } = props;
    const { result, search } = useSubscriptionListOfBankAccount();
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDto | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isNewSubscriptionModalOpen, setIsNewSubscriptionModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            search({
                itemsPerPage: 0,
            });
        }
    }, [isOpen]);

    return (
        <>
            <SlideSideModal open={isOpen} onClose={onClose} modalClassName="rounded-none" size="md">
                <div className="relative h-full">
                    <div className="py-3">
                        <LinkTo onClick={onClose} className="flex items-center hover:text-scordi gap-2 cursor-pointer">
                            <ArrowLeft className="w-5 h-5" />
                            <span>구독 선택</span>
                        </LinkTo>
                    </div>

                    <div className="py-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <Ellipsis className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="text-xl font-medium">{item.amount}</div>
                                    <span className="text-sm text-gray-500">{item.content}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mx-[-24px]" />

                    <div className="py-6 overflow-y-auto max-h-[calc(100vh-200px)] hide-scrollbar">
                        <div className="space-y-4">
                            <div className="text-sm pb-3 flex items-center">
                                <Tippy content="신한은행(334)로 이체된 기존 구독이에요.">
                                    <div>
                                        <span>구독리스트</span>
                                        <Info className="w-4 h-4 inline ml-1" />
                                    </div>
                                </Tippy>
                            </div>

                            <div className="space-y-2 pb-40">
                                {result.items.map((item) => (
                                    <SelectableSubscriptionItem
                                        key={item.id}
                                        product={item.product}
                                        isSelected={selectedSubscription?.id === item.id}
                                        onClick={() => {
                                            if (selectedSubscription?.id === item.id) {
                                                setSelectedSubscription(null);
                                                setIsConfirmModalOpen(false);
                                            } else {
                                                setSelectedSubscription(item);
                                                setIsConfirmModalOpen(true);
                                            }
                                        }}
                                    />
                                ))}
                                <button
                                    className="w-full p-4 rounded-lg hover:bg-scordi-50 flex items-center gap-2"
                                    onClick={() => setIsNewSubscriptionModalOpen(true)}
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>새 구독 추가</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <ConfirmModal
                        isOpen={isConfirmModalOpen}
                        onClose={() => {
                            setIsConfirmModalOpen(false);
                            onClose();
                        }}
                        selectedSubscription={selectedSubscription}
                    />

                    <NewSubscriptionModal
                        isOpen={isNewSubscriptionModalOpen}
                        onClose={() => setIsNewSubscriptionModalOpen(false)}
                    />
                </div>
            </SlideSideModal>
        </>
    );
});

SubscriptionSelectModal.displayName = 'SubscriptionSelectModal';
