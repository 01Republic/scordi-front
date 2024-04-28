import React, {memo, useState} from 'react';
import {SubscriptionSquircle} from '^models/Subscription/components/SubscriptionSquircle';
import {SubscriptionDto} from '^models/Subscription/types';
import {ProductDto} from '^models/Product/type';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';

interface AppUnitProps {
    product: ProductDto;
}

export const AppUnit = memo((props: AppUnitProps) => {
    const {product} = props;
    const {subscriptions = []} = product;
    const [isOpened, setIsOpened] = useState(false);

    const openSubscriptionSelectModal = () => {
        setIsOpened(true);
    };

    const moveToSubscriptionPage = (subscription: SubscriptionDto) => {
        console.log('subscription', subscription);
    };

    return (
        <div className="flex items-center justify-center">
            <SubscriptionSquircle
                subscription={subscriptions[0]}
                onClick={subscriptions.length > 1 ? openSubscriptionSelectModal : moveToSubscriptionPage}
                etcFlag={subscriptions.length > 1 ? subscriptions.length : undefined}
            />

            <AnimatedModal open={isOpened} onClose={() => setIsOpened(false)} backdrop={{opacity: 0.25}}>
                <div className="relative mx-auto max-w-screen-sm w-full">
                    <div className="mb-2">
                        <h3 className="font-bold text-2xl text-center text-white" style={{textShadow: '0 0 10px #666'}}>
                            {product.name()}
                        </h3>
                    </div>

                    <div className="modal-box max-w-full w-full h-[500px] no-scrollbar">
                        <div className="grid grid-cols-3 sm:grid-cols-4">
                            {subscriptions.map((subscription, i) => (
                                <div key={i} className="flex items-center justify-center">
                                    <SubscriptionSquircle
                                        subscription={subscription}
                                        onClick={moveToSubscriptionPage}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AnimatedModal>
        </div>
    );
});
AppUnit.displayName = 'AppUnit';
