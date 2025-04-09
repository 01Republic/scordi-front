import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type/ReviewCampaignSubscription.dto';
import {Tabs, TabsList, TabsTrigger} from '^public/components/ui/tabs';
import {HelpCircle} from 'lucide-react';
import Image from 'next/image';

const TAB_OPTIONS = {
    USED: {value: '1', label: '사용'},
    UNUSED: {value: '0', label: '미사용'},
    UNKNOWN: {value: '2', label: '모름'},
} as const;

const STYLES = {
    container: 'flex justify-between items-center py-5 border-b last:border-0',
    tabsList: 'bg-gray-100 border border-gray-200',
    tabTrigger: 'w-20 data-[state=active]:bg-[#5C5FEE] data-[state=active]:text-white',
} as const;

type TabValue = (typeof TAB_OPTIONS)[keyof typeof TAB_OPTIONS]['value'];

interface SubscriptionItemOfResponseProps {
    subscription: ReviewCampaignSubscriptionDto;
    onChange: (value: number) => void;
}

export const SubscriptionItemOfResponse = ({subscription, onChange}: SubscriptionItemOfResponseProps) => {
    const handleTabChange = (value: TabValue) => {
        onChange(Number(value));
    };

    return (
        <div className={STYLES.container}>
            <div className="flex items-center gap-2">
                {subscription.productImage ? (
                    <Image
                        src={subscription.productImage}
                        alt={subscription.productName}
                        width={24}
                        height={24}
                        loading="lazy"
                        draggable={false}
                        className={`rounded-full`}
                    />
                ) : (
                    <div className={`flex items-center bg-gray-100 rounded-full `} style={{width: 24, height: 24}}>
                        <HelpCircle className="text-gray-300 h-full w-full p-1" />
                    </div>
                )}

                <div>{subscription.productName}</div>
            </div>
            <Tabs defaultValue={TAB_OPTIONS.USED.value}>
                <TabsList className={STYLES.tabsList}>
                    {Object.values(TAB_OPTIONS).map(({value, label}) => (
                        <TabsTrigger
                            key={value}
                            value={value}
                            className={STYLES.tabTrigger}
                            onClick={() => handleTabChange(value)}
                        >
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};
