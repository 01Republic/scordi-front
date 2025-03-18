import React, {memo, useEffect, useState} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {Avatar} from '^components/Avatar';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {debounce} from 'lodash';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';
import {useQuery} from '@tanstack/react-query';
import {subscriptionApi} from '^models/Subscription/api';
import {errorToast} from '^api/api';
import {toast} from 'react-hot-toast';
import {confirm2, confirmed} from '^components/util/dialog';
import {ChevronLeft} from 'lucide-react';

interface MergeSubscriptionModalProps {
    subscription: SubscriptionDto;
    isOpened: boolean;
    onClose: () => any;
    reload: () => any;
}

export const MergeSubscriptionModal = memo((props: MergeSubscriptionModalProps) => {
    const {subscription, isOpened, onClose, reload} = props;
    const [params, setParams] = useState<FindAllSubscriptionsQuery>();
    const queryResult = useQuery({
        queryKey: ['MergeSubscription', subscription.organizationId, subscription.id, params],
        queryFn: () => subscriptionApi.index(params).then((res) => res.data.items),
        enabled: !!params && !!params.where?.organizationId,
        initialData: [],
    });

    useEffect(() => {
        if (isOpened) loadSubscriptions();
    }, [isOpened, subscription]);

    const loadSubscriptions = debounce(() => {
        return setParams({
            where: {
                organizationId: subscription.organizationId,
                productId: subscription.productId,
                id: {op: 'not', val: subscription.id},
            },
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    });

    const onSubmit = (hostSubscription: SubscriptionDto) => {
        console.log('hostSubscription', hostSubscription);
        const mergeConfirm = () => {
            return confirm2(
                '두 개의 구독을 병합할까요?',
                <div>
                    <div>구독 ID 를 확인해주세요.</div>
                    <div>처음 선택한 {subscription.id} 번 구독이</div>
                    <div>방금 선택한 {hostSubscription.id} 번 구독에 흡수됩니다.</div>
                    <div>
                        통합하는 과정에서 {subscription.id} 번 구독의 정보 중 <br />
                        일부를 잃게 될 수 있으며, 그 정보는 복구할 수 없습니다.
                    </div>
                </div>,
            );
        };

        return confirmed(mergeConfirm())
            .then(() => subscriptionApi.merge(subscription.id, hostSubscription.id))
            .then(() => toast.success('구독 합치기 성공'))
            .then(() => reload())
            .then(() => onClose())
            .catch(errorToast);
    };

    const subscriptions = queryResult.data;

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-[var(--modal-height)]"
            maxHeight="max-h-[var(--modal-height)]"
            modalClassName="grid rounded-none sm:rounded-t-box [--modal-height:100vh] sm:[--modal-height:90vh]"
        >
            <div className="h-full flex flex-col">
                <div>
                    <div className="mb-4">
                        <ChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                    </div>
                    <p className="font-medium text-12 text-scordi mb-1">구독 합치기</p>
                    {subscriptions.length > 0 ? (
                        <h3 className="font-bold text-xl leading-tight">
                            어느 구독에 병합할까요? <br /> 선택한 구독에 이 구독이 흡수됩니다!
                        </h3>
                    ) : (
                        <h3 className="font-bold text-xl leading-tight">
                            병합할 수 있는 구독이 없어요 :( <br /> 같은 앱의 구독이 없는 것 같아요.
                        </h3>
                    )}
                </div>

                <div className="py-4 flex-auto">
                    <div
                        className="overflow-auto no-scrollbar"
                        style={{
                            // 화면높이 - 모달_세로패딩 - 모달헤딩_박스높이 - 모달바디_세로패딩
                            maxHeight: 'calc(100vh - 48px - 102px - 32px)',
                        }}
                    >
                        <div className="flex flex-col">
                            {queryResult.data.map((subscription, i) => {
                                const {product} = subscription;
                                return (
                                    <div key={i}>
                                        <div
                                            className="grid grid-cols-12 items-center px-3 py-3 rounded-btn cursor-pointer group hover:bg-scordi-50 transition-all btn-animation"
                                            onClick={() => onSubmit(subscription)}
                                        >
                                            <div className="col-span-2">
                                                <TagUI className="bg-gray-200">{subscription.id}</TagUI>
                                            </div>
                                            <div className="col-span flex gap-2 items-center">
                                                <Avatar
                                                    src={product.image}
                                                    className="w-6 border border-gray-200 rounded-full shadow"
                                                />
                                                <p className="text-left flex flex-col gap-0.5 leading-none text-12">
                                                    <span className="whitespace-nowrap">{product.nameKo}</span>
                                                    {subscription.alias && (
                                                        <small className="whitespace-nowrap text-gray-400">
                                                            {subscription.alias}
                                                        </small>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </SlideUpModal>
    );
});
MergeSubscriptionModal.displayName = 'MergeSubscriptionModal';
