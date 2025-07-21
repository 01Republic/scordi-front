'use client';

import {memo} from 'react';
import {HelpCircle} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {yyyy_mm_dd} from '^utils/dateTime';
import {t_SubscriptionBillingCycleType} from '^models/Subscription/types/BillingCycleOptions';
import {NextImage} from '^components/NextImage';
import {currencyFormat} from '^utils/number';

interface MergeSubscriptionItemProps {
    subscription: SubscriptionDto;
    isChecked?: boolean;
    onCheck?: (checked: boolean) => any;
}

export const MergeSubscriptionItem = memo((props: MergeSubscriptionItemProps) => {
    const {subscription, isChecked, onCheck} = props;

    const {product, billingCycleType, bankAccount, creditCard, currentBillingAmount} = subscription;
    const lastPaidAt = subscription.lastPaidAt ? yyyy_mm_dd(new Date(subscription.lastPaidAt)) : '-';

    const creditCardCompany = creditCard?.company?.displayName;
    const creditCardEndNumber = creditCard?.secretInfo?.number4;

    const bankCompany = bankAccount?.bankName;
    const bankEndNumber = bankAccount?.endNumber();

    const currentAmount = currentBillingAmount?.amount ? currencyFormat(currentBillingAmount.amount) : 0;

    return (
        <li className="w-full">
            <label className="flex justify-between items-center p-2 px-4 rounded-lg cursor-pointer text-16 hover:bg-primaryColor-bg">
                <div className="flex gap-4 items-center">
                    <div className="flex justify-center items-center transition-all">
                        <input
                            type="radio"
                            className="w-5 h-5 cursor-pointer accent-primaryColor-900"
                            checked={isChecked}
                            onChange={(e) => onCheck && onCheck(e.target.checked)}
                        />
                    </div>
                    {product.image ? (
                        <NextImage
                            src={product.image}
                            alt={product.name()}
                            width={30}
                            height={30}
                            loading="lazy"
                            draggable={false}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="flex items-center rounded-full bg-gray-150" style={{width: 30, height: 30}}>
                            <HelpCircle className="p-1 w-full h-full text-gray-300" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 whitespace-nowrap">{product.name()}</span>
                        <section className="flex gap-1 text-gray-500 text-14">
                            {/* 결제 주기 */}
                            <span>{t_SubscriptionBillingCycleType(billingCycleType, true)} |</span>

                            {/* 마지막 결제일 */}
                            <span>{lastPaidAt} |</span>

                            {/* 결제수단 */}
                            <span>
                                {`${creditCardCompany || bankCompany || '알수없음'} 
														(${creditCardEndNumber || bankEndNumber || ''})`}
                            </span>
                        </section>
                    </div>
                </div>
                <span className="font-semibold text-gray-900 whitespace-nowrap">{currentAmount}</span>
            </label>
        </li>
    );
});
