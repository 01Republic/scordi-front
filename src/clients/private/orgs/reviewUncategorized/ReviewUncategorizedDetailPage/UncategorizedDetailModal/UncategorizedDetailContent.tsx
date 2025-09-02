import {memo, useState} from 'react';
import {ChevronRight, Ellipsis, Pencil} from 'lucide-react';
import {SubscriptionSelectModal} from './SubscriptionSelectModal';
import {InfoRow} from './InfoRow';

interface UncategorizedDetailContentProps {
    item: any;
}

export const UncategorizedDetailContent = memo((props: UncategorizedDetailContentProps) => {
    const {item} = props;
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

    return (
        <section className="px-5 py-6 space-y-10 text-sm font-medium">
            <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                    <Ellipsis className="size-6" />
                    <span className="text-sm">{item.content}</span>
                </div>
                <div className="font-semibold text-2xl">{item.amount}</div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2 flex-col ">
                    <InfoRow
                        label="연결된 구독"
                        value={
                            <button
                                className="text-scordi flex items-center gap-1"
                                onClick={() => setIsSubscriptionModalOpen(true)}
                            >
                                구독 없음 <ChevronRight className="text-gray-800 w-4 h-4" />
                            </button>
                        }
                    />

                    <InfoRow
                        label="메모"
                        value={
                            <button className="flex items-center gap-1 text-gray-300">
                                <Pencil className="w-4 h-4" /> 메모를 남겨보세요
                            </button>
                        }
                    />
                </div>

                <hr />

                {!!item.bankAccount ? (
                    <>
                        <InfoRow label="입금처" value="베스핀글로벌 주식회사" />
                        <InfoRow label="출금처" value="내계좌123546643584903" />
                        <InfoRow label="이체일시" value="2025년 4월 10일 18:28" />
                    </>
                ) : (
                    <>
                        <InfoRow label="적요" value="토스페이먼츠" />
                        <InfoRow label="결제수단" value="신한카드 3309" />
                        <InfoRow label="결제일시" value="2025년 4월 10일 18:28" />
                    </>
                )}
            </div>

            <SubscriptionSelectModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setIsSubscriptionModalOpen(false)}
                item={item}
            />
        </section>
    );
});

UncategorizedDetailContent.displayName = 'UncategorizedDetailContent';
