import React, {memo} from 'react';
import {HelpCircle, X} from 'lucide-react';
import {lpp} from '^utils/dateTime';
import {Avatar} from '^components/Avatar';
import {PayAmount} from '^models/BillingHistory/components';
import {SubscriptionDto} from '^models/Subscription/types';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface SplitSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    checkedItems: BillingHistoryDto[];
    subscription: SubscriptionDto;
    onClick: () => void;
    isLoading?: boolean;
}

export const SplitBillingHistoryModal = memo((props: SplitSubscriptionModalProps) => {
    const {isOpen, onClose, checkedItems, onClick, subscription, isLoading} = props;

    const {bankAccount, creditCard} = subscription;

    const latest = checkedItems.reduce((billingHistory, current) => {
        const curDate = (current.paidAt || current.issuedAt).getTime();
        const bestDate = (billingHistory.paidAt ?? billingHistory.issuedAt).getTime();
        return curDate > bestDate ? current : billingHistory;
    });

    const creditCardName = creditCard?.profileName;
    const creditCardLastNumber = creditCard?.numbers.number4;

    const bankName = bankAccount?.bankName || undefined;
    const bankLastNumber = bankAccount?.endNumber(3);

    const lastPayment = `${creditCardName}(${creditCardLastNumber})` || `${bankName}(${bankLastNumber})` || '';

    return (
        <BasicModal open={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-5 justify-between p-8 max-w-xl modal-box keep-all">
                <section className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                        <header className="font-semibold text-20">구독 분리</header>
                        <X className="cursor-pointer size-6" onClick={onClose} />
                    </div>
                    <span className="text-gray-700 text-14">
                        선택된 결제내역을 같은 서비스의 다른 구독으로 새로 생성해요. <br /> 아래와 같이 구독을
                        생성할까요?
                    </span>
                </section>
                <section className="flex flex-col gap-4 w-full border-t border-b border-gray-300 py-4">
                    <div className="flex justify-between items-center rounded-lg cursor-pointer text-16">
                        <div className="flex gap-4 items-center">
                            <section className="flex gap-1 flex-row items-center ">
                                <Avatar
                                    className="w-7 h-7"
                                    src={subscription.product.image}
                                    alt={subscription.product.name()}
                                    draggable={false}
                                    loading="lazy"
                                >
                                    <HelpCircle size={7} className="text-gray-300 h-full w-full p-[6px]" />
                                </Avatar>
                            </section>
                            <div className="flex flex-col">
                                <section>
                                    <span className="font-semibold text-gray-900 whitespace-nowrap">
                                        {subscription.product.name()}
                                    </span>

                                    {subscription.alias && (
                                        <>
                                            <span>-</span>
                                            <span className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                                {subscription.alias}
                                            </span>
                                        </>
                                    )}
                                </section>
                                <section className="flex gap-1 !text-gray-500 text-14">
                                    {/* 마지막 결제일 -> 선택된 결제내역 중 가장 최근 결제된 것 */}
                                    <span>{lpp(latest.paidAt || latest.issuedAt, 'P') || '-'} |</span>

                                    {/* 결제수단 -> 선택된 결제내역 중 가장 최근 결제된 것 */}
                                    <span>{lastPayment}</span>
                                </section>
                            </div>
                        </div>
                        <PayAmount billingHistory={latest} className="font-semibold text-gray-900 whitespace-nowrap" />
                    </div>
                </section>
                <section className="flex gap-2">
                    <button className="btn btn-white btn-md btn-block flex-1" onClick={onClose}>
                        취소
                    </button>
                    <button
                        className={`btn btn-scordi btn-md btn-block flex-1 ${isLoading ? 'link_to-loading' : ''}`}
                        onClick={onClick}
                    >
                        확인
                    </button>
                </section>
            </div>
        </BasicModal>
    );
});
