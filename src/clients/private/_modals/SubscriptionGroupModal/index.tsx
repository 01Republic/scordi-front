import React, {memo} from 'react';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SubscriptionSquircle} from '^models/Subscription/components/SubscriptionSquircle';
import {SubscriptionDto} from '^models/Subscription/types';

interface SubscriptionGroupModalProps {
    isOpened: boolean;
    onClose: () => void;
    title: string;
    subscriptions: SubscriptionDto[];
    onItemClick: (subscription: SubscriptionDto) => any;
}

export const SubscriptionGroupModal = memo((props: SubscriptionGroupModalProps) => {
    const {isOpened, onClose, title, subscriptions, onItemClick} = props;

    return (
        <AnimatedModal open={isOpened} onClose={onClose} backdrop={{opacity: 0.25}}>
            <div className="relative mx-auto max-w-screen-sm w-full">
                <div className="mb-2">
                    <h3 className="font-bold text-2xl text-center text-white" style={{textShadow: '0 0 10px #666'}}>
                        {title}
                    </h3>
                </div>

                <div className="modal-box max-w-full w-full h-[500px] no-scrollbar">
                    <div className="grid grid-cols-3 sm:grid-cols-4">
                        {subscriptions.map((subscription, i) => (
                            <div key={i} className="flex items-center justify-center">
                                <SubscriptionSquircle subscription={subscription} onClick={onItemClick} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedModal>
    );
});
SubscriptionGroupModal.displayName = 'SubscriptionGroupModal';
