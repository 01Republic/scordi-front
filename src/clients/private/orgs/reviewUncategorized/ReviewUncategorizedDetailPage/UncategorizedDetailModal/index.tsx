import { memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LinkTo } from '^components/util/LinkTo';
import { SlideSideModal } from '^components/modals/_shared/SlideSideModal';
import { UncategorizedDetailContent } from './UncategorizedDetailContent';
import { TransactionItem } from './TransactionItem';

interface UncategorizedDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any;
}

export const UncategorizedDetailModal = memo((props: UncategorizedDetailModalProps) => {
    const { isOpen, onClose, item } = props;

    return (
        <SlideSideModal open={isOpen} onClose={onClose} modalClassName="rounded-none" size="md">
            <div className="py-3">
                <LinkTo onClick={onClose} className="flex items-center hover:text-scordi gap-2 cursor-pointer">
                    <ArrowLeft className="w-5 h-5" />
                    <span>상세내역</span>
                </LinkTo>
            </div>

            {item && <UncategorizedDetailContent item={item} />}

            <hr className="mx-[-24px]" />

            <div className="py-6">
                {[...Array(3)].map((_, index) => (
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
