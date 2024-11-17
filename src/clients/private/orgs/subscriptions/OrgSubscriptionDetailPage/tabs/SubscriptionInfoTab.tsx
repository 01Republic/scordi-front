import React, {memo} from 'react';
import {SubscriptionBusinessInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBusinessInfoSection';
import {SubscriptionPaymentInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionPaymentInfoSection';
import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/StatusCard';
import {FaRegCreditCard} from 'react-icons/fa6';
import {SubscriptionBasicInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBasicInfoSection';
import {IoMdCalendar} from 'react-icons/io';
import {BsCash, BsFolderFill} from 'react-icons/bs';

export const SubscriptionInfoTab = memo(function SubscriptionInfoTab() {
    return (
        <div className={'py-4 space-y-4'}>
            <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
                <StatusCard
                    title={'구독상태'}
                    titleValue={'유료'}
                    icon={<BsFolderFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-purple-400'}
                />
                <StatusCard
                    title={'결제 예정 금액'}
                    titleValue={'$39,000'}
                    icon={<BsCash size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-orange-400'}
                />
                <StatusCard
                    title={'다음 결제 예정일'}
                    titleValue={'2024-10-04'}
                    icon={<IoMdCalendar size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-pink-400'}
                />
                <StatusCard
                    title={'결제수단'}
                    titleValue={'KB국민(9880)'}
                    icon={<FaRegCreditCard size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-blue-400'}
                />
            </div>
            <SubscriptionBasicInfoSection />
            <SubscriptionPaymentInfoSection />
            <SubscriptionBusinessInfoSection />
        </div>
    );
});
