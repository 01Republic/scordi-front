import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type/ReviewCampaignSubscription.dto';
import {
    ReviewResponseSubscriptionUsingStatus,
    t_reviewResponseSubscriptionUsingStatus,
} from '^models/ReviewResponse/type';
import {UpdateReviewResponseSubscriptionRequestDto} from '^models/ReviewResponse/type/UpdateReviewResponseSubscriptionRequest.dto';
import {Tabs, TabsList, TabsTrigger} from '^public/components/ui/tabs';
import {HelpCircle} from 'lucide-react';
import Image from 'next/image';
import {memo} from 'react';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {t_SubscriptionBillingCycleType} from '^models/Subscription/types/BillingCycleOptions';
import {currencyFormat} from '^utils/number';

interface SubscriptionItemOfResponseProps {
    responseSubscription: UpdateReviewResponseSubscriptionRequestDto;
    campaignSubscription: ReviewCampaignSubscriptionDto;
    onChange: (value: ReviewResponseSubscriptionUsingStatus) => void;
    readonly?: boolean;
}

export const SubscriptionItemOfResponse = memo((props: SubscriptionItemOfResponseProps) => {
    const {responseSubscription, campaignSubscription, onChange, readonly = false} = props;
    const {productName, productImage, subscription} = campaignSubscription;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    if (!subscription) return <></>;
    const {bankAccount, creditCard, currentBillingAmount, alias} = subscription;

    const creditCardCompany = creditCard?.company?.displayName;
    const creditCardEndNumber = creditCard?.secretInfo?.number4;

    const bankCompany = bankAccount?.bankName;
    const bankEndNumber = bankAccount?.endNumber();

    const symbol = getCurrencySymbol(displayCurrency);
    const billingAmount = currentBillingAmount?.amount ? currentBillingAmount.toDisplayPrice(displayCurrency) : 0;

    const handleTabChange = (value: ReviewResponseSubscriptionUsingStatus) => {
        onChange(value);
    };

    return (
        <div className="grid sm:grid-cols-2 gap-y-4 items-center py-4 border-b last:border-0">
            <div className="flex items-center gap-3" onClick={() => console.log(responseSubscription)}>
                <div className="w-[30px] h-[30px]">
                    {productImage ? (
                        <Image
                            src={productImage}
                            alt={productName}
                            width={30}
                            height={30}
                            loading="lazy"
                            draggable={false}
                            className={`rounded-full`}
                        />
                    ) : (
                        <div className={`flex items-center bg-gray-100 rounded-full `} style={{width: 30, height: 30}}>
                            <HelpCircle className="text-gray-300 h-full w-full p-1" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex font-semibold text-gray-900 whitespace-nowrap text-16 gap-1">
                        <span>{productName} </span>
                        {alias && <span>-</span>}
                        {alias && <span>{alias}</span>}
                    </div>
                    <section className="flex gap-1 text-gray-500 text-14">
                        {/* 결제수단 */}
                        <span>
                            {`${creditCardCompany || bankCompany || '알수없음'} 
														(${creditCardEndNumber || bankEndNumber || ''})`}
                        </span>
                        <span>|</span>
                        {/* 마지막 결제금액 */}
                        <div className="whitespace-nowrap flex gap-1">
                            <span>{symbol}</span>
                            <span>{currencyFormat(billingAmount, '')}</span>
                        </div>
                    </section>
                </div>
            </div>

            <div className="flex items-center justify-stretch sm:justify-end">
                <Tabs
                    className="w-full sm:w-[initial]"
                    defaultValue={responseSubscription.usingStatus || ReviewResponseSubscriptionUsingStatus.NO_USE}
                >
                    <TabsList className="grid grid-cols-3 bg-gray-100 border border-gray-200 w-full">
                        {[
                            ReviewResponseSubscriptionUsingStatus.IN_USE,
                            ReviewResponseSubscriptionUsingStatus.NO_USE,
                            ReviewResponseSubscriptionUsingStatus.DONT_KNOW,
                        ].map((value, i) => (
                            <TabsTrigger
                                key={i}
                                value={value}
                                className={`min-w-20 data-[state=active]:bg-[#5C5FEE] data-[state=active]:text-white ${
                                    readonly ? 'pointer-events-none opacity-70' : ''
                                }`}
                                onClick={() => {
                                    if (readonly) return;
                                    handleTabChange(value);
                                }}
                            >
                                {t_reviewResponseSubscriptionUsingStatus(value)}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
});
