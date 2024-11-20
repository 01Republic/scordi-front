import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {eventCut} from '^utils/event';
import {swalHTML} from '^components/util/dialog';
import {ProductSearchModal} from './ProductSearchModal';

interface TransferProductButtonProps {
    subscription: SubscriptionDto;
    onFinish: () => any;
}

export const TransferProductButton = memo((props: TransferProductButtonProps) => {
    const {subscription, onFinish} = props;

    const onClick = () => {
        return swalHTML(<ProductSearchModal subscription={subscription} onFinish={onFinish} />);
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
