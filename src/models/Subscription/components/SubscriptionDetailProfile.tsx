import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {NextImage} from '^components/NextImage';
import {HelpCircle} from 'lucide-react';
import {currencyFormat} from '^utils/number';
import {Avatar} from '^components/Avatar';
import {SubscriptionBillingSummaryLine} from './SubscriptionBillingSummaryLine';

interface SubscriptionDetailProfileProps {
    subscription: SubscriptionDto;
    imageClassName: string;
    tempImageSize: number;
}

export const SubscriptionDetailProfile = memo((props: SubscriptionDetailProfileProps) => {
    const {subscription, imageClassName, tempImageSize} = props;

    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {product, currentBillingAmount} = subscription;

    const symbol = getCurrencySymbol(displayCurrency);
    const billingAmount = currentBillingAmount?.amount ? currentBillingAmount.toDisplayPrice(displayCurrency) : 0;

    return (
        <div className="flex justify-between items-center rounded-lg cursor-pointer text-16">
            <div className="flex gap-4 items-center">
                <section className={`flex gap-1 flex-row items-center ${imageClassName}`}>
                    <Avatar
                        className={imageClassName}
                        src={product.image}
                        alt={product.name()}
                        draggable={false}
                        loading="lazy"
                    >
                        <HelpCircle size={tempImageSize} className="text-gray-300 h-full w-full p-[6px]" />
                    </Avatar>
                </section>
                <div className="flex flex-col">
                    <section>
                        <span className="font-semibold text-gray-900 whitespace-nowrap">{product.name()}</span>

                        {subscription.alias && (
                            <>
                                <span>-</span>
                                <span className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                    {subscription.alias}
                                </span>
                            </>
                        )}
                    </section>

                    <SubscriptionBillingSummaryLine subscription={subscription} />
                </div>
            </div>
            <div className="font-semibold text-gray-900 whitespace-nowrap flex gap-1">
                <span>{symbol}</span>
                <span>{currencyFormat(billingAmount, '')}</span>
            </div>
        </div>
    );
});
