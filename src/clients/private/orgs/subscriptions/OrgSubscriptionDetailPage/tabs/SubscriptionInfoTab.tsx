import React, {memo, useEffect} from 'react';
import {SubscriptionBusinessInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBusinessInfoSection';
import {SubscriptionPaymentInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionPaymentInfoSection';
import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/StatusCard';
import {FaRegCreditCard} from 'react-icons/fa6';
import {SubscriptionBasicInfoSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBasicInfoSection';
import {IoMdCalendar, IoMdPerson} from 'react-icons/io';
import {BsCash, BsFillCalendar2EventFill, BsFillPersonFill, BsFolderFill} from 'react-icons/bs';
import {SubscriptionDto} from '^models/Subscription/types';
import {PricingModelValues, t_SubscriptionPricingModel} from '^models/Subscription/types/PricingModelOptions';
import {yyyy_mm_dd} from '^utils/dateTime';
import {atom, useRecoilState} from 'recoil';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountsAtom} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAccountListPanel';
import {useInvoiceAccountsOfSubscription} from '^models/InvoiceAccount/hook';
import {debounce, slice} from 'lodash';

interface SubscriptionInfoTabProps {
    subscriptionInfo: SubscriptionDto;
}

export const SubscriptionInfoTab = memo(function SubscriptionInfoTab(props: SubscriptionInfoTabProps) {
    const {subscriptionInfo} = props;

    const {
        result: isInvoiceAcountResult,
        search: loadInvoiceAccount,
        isLoading: isInvoiceAcountLoding,
    } = useInvoiceAccountsOfSubscription();

    const fetchList = debounce(() => {
        if (!subscriptionInfo) return;
        loadInvoiceAccount({
            relations: ['googleTokenData'],
            where: {
                // @ts-ignore
                subscriptions: {id: subscriptionInfo.id},
            },
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, 500);

    useEffect(() => {
        if (!subscriptionInfo) return;
        fetchList();
    }, [subscriptionInfo]);

    const invoiceAccountName = isInvoiceAcountResult.items.map((invoiceAccount) => invoiceAccount.googleTokenData);

    const showInvoiceAccountName = invoiceAccountName[0]
        ? invoiceAccountName[0]?.name
        : isInvoiceAcountResult.items[0]?.email.split('@')[0];

    const cardEndNumber = subscriptionInfo.creditCard && subscriptionInfo.creditCard.secretInfo?.number4;
    const cardCompany = subscriptionInfo.creditCard && subscriptionInfo.creditCard.company;

    console.log(subscriptionInfo);

    const currencySymbol = subscriptionInfo.currentBillingAmount?.symbol || '₩';
    const currencyText = (num?: number, sep = '') => {
        if (!num) return '-';
        return [currencySymbol, Math.floor(num).toLocaleString()].join(sep);
    };

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
                <StatusCard
                    title={'결제 예정 금액'}
                    titleValue={currencyText(subscriptionInfo.nextBillingAmount, ' ')}
                    icon={<BsCash size={24} />}
                    iconColor={'bg-orange-400'}
                />
                <StatusCard
                    title={'다음 결제 예정일'}
                    titleValue={subscriptionInfo.nextBillingDate || '-'}
                    icon={<BsFillCalendar2EventFill size={20} />}
                    iconColor={'bg-[#F472B6]'}
                />
                <StatusCard
                    title={'결제수단'}
                    titleValue={`${subscriptionInfo.creditCard?.name}(${cardEndNumber})` || '-'}
                    icon={<FaRegCreditCard size={25} />}
                    iconColor={'bg-[#38BDF8]'}
                />
                <StatusCard
                    title="청구서 수신 계정"
                    titleValue={
                        isInvoiceAcountResult.items.length > 1
                            ? `${showInvoiceAccountName} 외 ${invoiceAccountName.length - 1}개`
                            : showInvoiceAccountName || '-'
                    }
                    icon={<BsFillPersonFill fontSize={30} />}
                    iconColor={'bg-[#5C60F6]'}
                />
            </div>
            <SubscriptionBasicInfoSection />
            <SubscriptionPaymentInfoSection />
            <SubscriptionBusinessInfoSection />
        </div>
    );
});
