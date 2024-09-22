import {memo, useEffect, useState} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useAddableSubscriptionsOfCreditCard} from '^models/Subscription/hook';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {LoadableBox} from '^components/util/loading';
import {SubscriptionSelectItem} from '^models/Subscription/components/SubscriptionSelectItem';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';

interface CreditCardAddSubscriptionModalProps {
    creditCardId: number;
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const CreditCardAddSubscriptionModal = memo((props: CreditCardAddSubscriptionModalProps) => {
    const {isOpened, onClose, onCreate, creditCardId} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, reset} = useAddableSubscriptionsOfCreditCard();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const onOpened = () => {
        searchAddableSubscriptions({});
    };

    const onClosed = () => {
        reset();
        setSelectedIds([]);
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((ids) => {
            return ids.includes(id) ? ids.filter((_id) => _id !== id) : [...ids, id];
        });
    };

    const searchAddableSubscriptions = async (params: FindAllSubscriptionsQuery) => {
        params.where ||= {};
        params.where.organizationId = orgId;
        await search(params);
    };

    const onSubmit = async () => {
        console.log(selectedIds);
        const req = selectedIds.map((id) => subscriptionApi.update(id, {creditCardId}));
        await Promise.allSettled(req);
        toast.success('추가했습니다.');
        onCreate && onCreate();
    };

    useEffect(() => {
        if (isOpened) {
            onOpened();
        } else {
            setTimeout(onClosed, 500);
        }
    }, [isOpened]);

    const addableSubscriptions = result.items.filter((item) => item.creditCardId !== creditCardId);

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md" modalClassName="rounded-none sm:rounded-t-box p-0">
            <div className="px-6 py-4 bg-scordi flex items-center justify-between">
                <div className="text-white">
                    <h3 className="text-18">어떤 구독을 연결할까요?</h3>
                    <p className="text-14 text-slate-100">이미 연결되어있는 구독은 뺐어요</p>
                </div>

                <div></div>
            </div>

            <div className="px-6 pt-6">
                <div className="-mx-6 px-6 sm:max-h-[60vh] sm:min-h-[40vh] overflow-auto no-scrollbar">
                    <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                        {addableSubscriptions.map((subscription, i) => (
                            <SubscriptionSelectItem
                                key={i}
                                subscription={subscription}
                                onClick={(selected) => toggleSelect(selected.id)}
                                isSelected={selectedIds.includes(subscription.id)}
                            />
                        ))}
                    </LoadableBox>
                </div>
            </div>

            <div className="px-6 pb-4">
                {!selectedIds.length ? (
                    <button type="button" className="btn btn-scordi btn-block btn-disabled2">
                        구독을 선택해주세요
                    </button>
                ) : (
                    <button type="button" className="btn btn-scordi btn-block" onClick={onSubmit}>
                        {selectedIds.length}개의 선택된 구독 연결하기
                    </button>
                )}
            </div>
        </SlideUpModal>
    );
});
CreditCardAddSubscriptionModal.displayName = 'CreditCardAddSubscriptionModal';
