import {memo, useEffect, useState} from 'react';
import Tippy from '@tippyjs/react';
import {ArrowLeft, Ellipsis, Info, Plus} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {SlideSideModal} from '^components/modals/_shared/SlideSideModal';
import {useSubscriptionListOfBankAccount} from '^models/Subscription/hook';
import {SubscriptionDto} from '^models/Subscription/types';
import {SelectableSubscriptionItem} from './SelectableSubscriptionItem';
import {NewSubscriptionModal} from './NewSubscriptionModal';
import {ConfirmModal} from './ConfirmModal';

interface SubscriptionSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any;
}

export const SubscriptionSelectModal = memo((props: SubscriptionSelectModalProps) => {
    const {isOpen, onClose, item} = props;
    const {result, search} = useSubscriptionListOfBankAccount();
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
            <SlideSideModal
                open={isOpen}
                onClose={onClose}
                modalClassName="rounded-none p-5 flex flex-col h-full"
                size="md"
            >
                <section className="flex-shrink-0">
                    <LinkTo onClick={onClose} className="flex items-center hover:text-scordi cursor-pointer">
                        <ArrowLeft className="size-5" />
                    </LinkTo>
                </section>

                <section className="py-6 space-y-4 px-2 flex-shrink-0">
                    <span className="text-lg font-semibold px-2">연결할 구독을 선택해주세요</span>

                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Ellipsis className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-semibold text-xl">{item.amount}</div>
                            <div className="text-sm text-gray-500 font-normal truncate">
                                내계좌 → {item.description ? item.description : '베스핀글로벌 주식회사'}
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="-mx-5 flex-shrink-0" />

                <section className="py-6 space-y-3  flex-1 overflow-y-auto min-h-0">
                    <Tippy content="신한은행(334)로 이체된 기존 구독이에요.">
                        <div className="text-sm font-normal flex items-center gap-1 w-fit px-2">
                            <span>구독리스트</span>
                            <Info className="w-4 h-4 inline ml-1" />
                        </div>
                    </Tippy>

                    <div className="space-y-2">
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
                            className="w-full p-3 rounded-lg hover:bg-scordi-50 flex items-center gap-4 group hover:text-primaryColor-900"
                            onClick={() => setIsNewSubscriptionModalOpen(true)}
                        >
                            <Plus className="size-6 group-hover:text-primaryColor-900 stroke-2" />
                            <span className="text-sm font-normal">새 구독 추가</span>
                        </button>
                    </div>
                </section>

                {isConfirmModalOpen && selectedSubscription && (
                    <ConfirmModal
                        isOpen={isConfirmModalOpen}
                        onClose={() => {
                            setIsConfirmModalOpen(false);
                            onClose();
                        }}
                        selectedSubscription={selectedSubscription}
                    />
                )}

                {isNewSubscriptionModalOpen && (
                    <NewSubscriptionModal
                        isOpen={isNewSubscriptionModalOpen}
                        onClose={() => setIsNewSubscriptionModalOpen(false)}
                    />
                )}
            </SlideSideModal>
        </>
    );
});

SubscriptionSelectModal.displayName = 'SubscriptionSelectModal';
