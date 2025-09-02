import {memo} from 'react';
import {ArrowLeft} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {SlideSideModal} from '^components/modals/_shared/SlideSideModal';
import {UncategorizedDetailContent} from './UncategorizedDetailContent';
import {TransactionItem} from './TransactionItem';

interface UncategorizedDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any;
}

export const UncategorizedDetailModal = memo((props: UncategorizedDetailModalProps) => {
    const {isOpen, onClose, item} = props;

    return (
        <SlideSideModal
            open={isOpen}
            onClose={onClose}
            modalClassName="rounded-none p-0 flex flex-col h-full"
            size="md"
        >
            <section className="p-5 flex-shrink-0">
                <LinkTo onClick={onClose} className="flex items-center hover:text-scordi gap-2 cursor-pointer">
                    <ArrowLeft className="size-5" />
                    <span className="text-sm">상세내역</span>
                </LinkTo>
            </section>

            {item && (
                <div className="flex-shrink-0">
                    <UncategorizedDetailContent item={item} />
                </div>
            )}

            <hr className="flex-shrink-0" />

            <div className="px-5 py-6 space-y-7 flex-1 overflow-y-auto min-h-0">
                {[...Array(6)].map((_, index) => (
                    <TransactionItem
                        key={index}
                        item={{
                            date: '2025년 4월 10일',
                            amount: '-53,900원',
                            description: '내계좌 → 베스핀글로벌 주식회사',
                        }}
                    />
                ))}
            </div>
        </SlideSideModal>
    );
});

UncategorizedDetailModal.displayName = 'UncategorizedDetailModal';
