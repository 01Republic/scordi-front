import {ChevronRight, Ellipsis, Pencil} from 'lucide-react';
import {memo, useState} from 'react';
import {SubscriptionSelectModal} from './SubscriptionSelectModal';

interface UncategorizedDetailContentProps {
    item: any;
}

export const UncategorizedDetailContent = memo((props: UncategorizedDetailContentProps) => {
    const {item} = props;
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

    return (
        <>
            <div className="py-6">
                <div className="pb-10 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <Ellipsis className="w-4 h-4" />
                        </div>
                        <span className="text-lg">{item.content}</span>
                    </div>
                    <div className="text-3xl font-medium mb-8">{item.amount}</div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center py-2">
                        <span>연결된 구독</span>
                        <button
                            className="text-scordi flex items-center gap-1"
                            onClick={() => setIsSubscriptionModalOpen(true)}
                        >
                            구독 없음 <ChevronRight className="text-gray-800 w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span>메모</span>
                        <button className="flex items-center gap-1 text-gray-300">
                            <Pencil className="w-4 h-4" /> 메모를 남겨보세요
                        </button>
                    </div>
                    <div className="py-2">
                        <hr />
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span>입금처</span>
                        <span className="text-gray-600">베스핀글로벌 주식회사</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span>출금처</span>
                        <span className="text-gray-600">내계좌123546643584903</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span>이체일시</span>
                        <span className="text-gray-600">2025년 4월 10일 18:28</span>
                    </div>
                </div>
            </div>

            <SubscriptionSelectModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setIsSubscriptionModalOpen(false)}
                item={item}
            />
        </>
    );
});

UncategorizedDetailContent.displayName = 'UncategorizedDetailContent';
