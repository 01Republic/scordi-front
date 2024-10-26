import React, {memo, useEffect} from 'react';
import {FaRegCreditCard} from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import {useUnmount} from '^hooks/useUnmount';
import {useTossPayments} from '^hooks/useTossPayments';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {yyyy_mm_dd} from '^utils/dateTime';
import {Avatar} from '^components/Avatar';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {SettingsPaymentSection} from '../SettingsPaymentSection';
import {NewPaymentMethodButton} from './NewPaymentMethodButton';

interface OrgPaymentMethodSectionProps {
    orgId: number;
}

export const OrgPaymentMethodSection = memo((props: OrgPaymentMethodSectionProps) => {
    const {orgId} = props;
    const {requestBillingAuth} = useTossPayments();
    const {isLoading, fetchAll, result, isEmptyResult, clearCache} = useScordiPaymentMethodsInSettingPage();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        fetchAll();
    }, [orgId]);

    useUnmount(() => {
        clearCache();
    }, [orgId]);

    return (
        <SettingsPaymentSection
            title="카드 정보"
            buttonText="카드 등록"
            buttonOnClick={isEmptyResult ? undefined : () => requestBillingAuth()}
            isLoading={isLoading}
        >
            {isEmptyResult ? (
                <EmptyTable
                    message="등록된 카드 정보가 없어요."
                    Buttons={() => <NewPaymentMethodButton onClick={() => requestBillingAuth()} />}
                />
            ) : (
                <div className="grid grid-cols-1 gap-2">
                    {result.items.map((paymentMethod, i) => {
                        const company = paymentMethod.asCardCompany();
                        const card = paymentMethod.response.card;
                        const isLast = result.items.length === i + 1;
                        return (
                            <div
                                key={i}
                                className={`p-4 bg-slate-50 flex items-center justify-between rounded-lg text-14 ${
                                    isLast ? '' : ''
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-7">
                                        {company ? (
                                            <img src={company.logo} alt="" />
                                        ) : (
                                            <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
                                        )}
                                    </Avatar>
                                    <div className="flex items-center gap-1 font-semibold">
                                        <span>{company?.displayName || paymentMethod.cardCompany}</span>
                                        <Tippy content={paymentMethod.fullCardNumber}>
                                            <span>({paymentMethod.cardNumber.slice(-4)})</span>
                                        </Tippy>
                                    </div>

                                    <div className="text-gray-600">
                                        {card.ownerType} / {card.cardType}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-gray-500">등록일자 :</span>
                                        <span>{yyyy_mm_dd(paymentMethod.createdAt, '. ')}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </SettingsPaymentSection>
    );
});
OrgPaymentMethodSection.displayName = 'OrgPaymentMethodSection';
