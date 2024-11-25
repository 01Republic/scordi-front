import {memo} from 'react';
import Swal from 'sweetalert2';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto} from '^models/Subscription/types';
import {eventCut} from '^utils/event';
import {swalHTML} from '^components/util/dialog';
import {ProductSearchModal} from '^admin/share/ProductSearchModal';

interface TransferProductButtonProps {
    subscription: SubscriptionDto;
    onFinish: () => any;
}

export const TransferProductButton = memo((props: TransferProductButtonProps) => {
    const {subscription, onFinish} = props;

    const onClick = () => {
        return swalHTML(
            <ProductSearchModal
                title="어느 앱으로 이동시킬까요?"
                onSelect={(product) => {
                    const name = `${product.name()} (ID: ${product.id})`;
                    if (confirm(`${name} 으로 이 구독을 옮길까요?`)) {
                        subscriptionApi
                            .update(subscription.id, {productId: product.id})
                            .then(() => toast.success(`${name} 으로 이동 완료!`))
                            .then(() => Swal.close())
                            .then(() => onFinish())
                            .catch(errorToast);
                    }
                }}
            />,
        );
    };

    return (
        <a
            className="text-indigo-500 hover:bg-indigo-100/70 active:bg-indigo-600 active:text-white"
            onClick={(e) => {
                eventCut(e);
                return onClick();
            }}
        >
            다른 앱으로 옮기기
        </a>
    );
});
TransferProductButton.displayName = 'TransferProductButton';
