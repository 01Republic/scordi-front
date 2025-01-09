import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {confirm2, confirmed} from '^components/util/dialog';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {productApi} from '^models/Product/api';
import {errorToast} from '^api/api';
import {useRouter} from 'next/router';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';

interface RemoveSubscriptionProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const RemoveSubscription = memo((props: RemoveSubscriptionProps) => {
    const {subscription, reload} = props;
    const {product} = subscription;
    const router = useRouter();

    // 구독 삭제
    const onClick = () => {
        const removeConfirm = () => confirm2('이 구독을 정말 삭제할까요?');
        return confirmed(removeConfirm())
            .then(() => subscriptionApi.destroy(subscription.id))
            .then(() => toast.success('구독 삭제완료'))
            .then(() => removeProduct(`'${product.name()}' 서비스(앱)도 함께 삭제할까요?`))
            .then(() => reload())
            .catch(errorToast);
    };

    // 앱도 함께 삭제
    const removeProduct = (title?: string) => {
        if (product.connectedOrgCount > 0) {
            const moveProductPageAlert = () => {
                return confirm2(
                    title || `'${product.name()}' 서비스(앱)를 진짜 삭제할까요?`,
                    <div>
                        <p className="text-lg font-semibold mb-4">
                            서비스(앱)를 {product.connectedOrgCount}개의 조직에서 사용중이에요
                        </p>
                        <p>앱 페이지로 이동하여 삭제 또는 이관을 해줘야 합니다.</p>
                        <br />
                        <p>지금 바로 이동할까요?</p>
                    </div>,
                );
            };

            return confirmed(moveProductPageAlert())
                .then(() => router.push(AdminProductPageRoute.path(product.id)))
                .catch(errorToast);
        } else {
            const removeConfirm = () => {
                return confirm2(
                    title || `'${product.name()}' 서비스(앱)를 진짜 삭제할까요?`,
                    <div>
                        <p>
                            서비스(앱)를 삭제하면, 앱관리에서도 삭제됩니다. <br />이 서비스(앱)에 연동된 다른
                            워크스페이스의 구독들도 모두 삭제됩니다.
                        </p>
                        <p>그래도 삭제할까요?</p>
                    </div>,
                );
            };

            return confirmed(removeConfirm())
                .then(() => confirmed(confirm2('한 번만 더 확인할게요!! 진짜 삭제 해요???!?!?!')))
                .then(() => productApi.destroy(product.id))
                .then(() => toast.success('서비스(앱) 삭제 완료'))
                .then(() => reload())
                .catch(errorToast);
        }
    };

    return (
        <div className="cursor-pointer px-2 py-1 hover:bg-red-100" onClick={onClick}>
            삭제
        </div>
    );
});
RemoveSubscription.displayName = 'RemoveSubscription';
