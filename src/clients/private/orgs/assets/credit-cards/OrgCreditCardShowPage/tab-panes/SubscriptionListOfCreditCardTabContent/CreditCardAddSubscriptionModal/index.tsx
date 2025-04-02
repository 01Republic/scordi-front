import {memo} from 'react';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';
import {SubscriptionSelectItem} from '^models/Subscription/components/SubscriptionSelectItem';
import {useAddableSubscriptionsOfCreditCard} from '^models/Subscription/hook';
import {subscriptionApi} from '^models/Subscription/api';
import {ChevronLeft} from 'lucide-react';

interface CreditCardAddSubscriptionModalProps {
    creditCardId: number;
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const CreditCardAddSubscriptionModal = memo((props: CreditCardAddSubscriptionModalProps) => {
    const {isOpened, onClose, onCreate, creditCardId} = props;
    const {search, result, isLoading, reset} = useAddableSubscriptionsOfCreditCard();

    const onSubmit = async (selectedIds: number[]) => {
        const req = selectedIds.map((id) => subscriptionApi.update(id, {creditCardId}));
        await Promise.allSettled(req);
    };

    const addableSubscriptions = result.items.filter((item) => item.creditCardId !== creditCardId);

    return (
        <SlideUpSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onOpened={() => search({})}
            onClosed={() => reset()}
            onCreate={onCreate}
            isLoading={isLoading}
            items={addableSubscriptions}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <SubscriptionSelectItem subscription={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={onSubmit}
            titleCaption="새로운 구독 연결하기"
            title="연결할 구독을 모두 선택해주세요."
            ctaInactiveText="구독 선택"
            ctaActiveText="%n개의 선택된 구독 연결하기"
            successMessage="선택한 구독을 연결했어요."
            emptyText="연결할 구독이 없어요"
        />
    );
    // return (
    //     <SlideUpModal open={isOpened} onClose={onClose} size="md" modalClassName="rounded-none sm:rounded-t-box p-0">
    //         <div className="flex items-center">
    //             <div className="p-6 text-gray-400 hover:text-black transition-all cursor-pointer" onClick={onClose}>
    //                 <ChevronLeft fontSize={16} />
    //             </div>
    //         </div>
    //         <div className="px-6 bg-white flex items-center justify-between">
    //             <div className="">
    //                 <p className="text-12 text-scordi">새로운 구독 연결하기</p>
    //                 <h3 className="text-18">어느 구독을 연결할까요?</h3>
    //             </div>
    //
    //             <div></div>
    //         </div>
    //
    //         <div className="px-6 pt-6">
    //             <div className="-mx-6 px-6 sm:max-h-[60vh] sm:min-h-[40vh] overflow-auto no-scrollbar">
    //                 <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
    //                     {addableSubscriptions.map((subscription, i) => (
    //                         <SubscriptionSelectItem
    //                             key={i}
    //                             subscription={subscription}
    //                             onClick={(selected) => toggleSelect(selected.id)}
    //                             isSelected={selectedIds.includes(subscription.id)}
    //                         />
    //                     ))}
    //                 </LoadableBox>
    //             </div>
    //         </div>
    //
    //         <div className="px-6 pb-4">
    //             {!selectedIds.length ? (
    //                 <button type="button" className="btn btn-scordi btn-block btn-disabled2">
    //                     구독을 선택해주세요
    //                 </button>
    //             ) : (
    //                 <button type="button" className="btn btn-scordi btn-block" onClick={onSubmit}>
    //                     {selectedIds.length}개의 선택된 구독 연결하기
    //                 </button>
    //             )}
    //         </div>
    //     </SlideUpModal>
    // );
});
CreditCardAddSubscriptionModal.displayName = 'CreditCardAddSubscriptionModal';
