import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {HelpCircle, X} from 'lucide-react';
import {SubscriptionProfile, SubscriptionUsingStatusTag} from '^models/Subscription/components';
import {LinkTo} from '^components/util/LinkTo';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {Avatar} from '^components/Avatar';
import {t_SubscriptionBillingCycleType} from '^models/Subscription/types/BillingCycleOptions';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {yyyy_mm_dd} from '^utils/dateTime';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {currencyFormat} from '^utils/number';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';

interface TeamSubscriptionDetailModalProps {
    isOpened: boolean;
    onClose: () => void;
    subscription: SubscriptionDto | null;
}

export const TeamSubscriptionDetailModal = memo((props: TeamSubscriptionDetailModalProps) => {
    const {isOpened, onClose, subscription} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    if (!subscription) return <></>;

    const {product, teamMembers, billingCycleType, bankAccount, creditCard, currentBillingAmount} = subscription;
    if (!teamMembers) return <></>;

    const lastPaidAt = subscription.lastPaidAt ? yyyy_mm_dd(new Date(subscription.lastPaidAt)) : '-';

    const creditCardCompany = creditCard?.company?.displayName;
    const creditCardEndNumber = creditCard?.secretInfo?.number4;

    const bankCompany = bankAccount?.bankName;
    const bankEndNumber = bankAccount?.endNumber();

    const symbol = getCurrencySymbol(displayCurrency);
    const billingAmount = currentBillingAmount?.amount ? currentBillingAmount.toDisplayPrice(displayCurrency) : 0;

    return (
        <BasicModal open={isOpened} onClose={onClose}>
            <div className="flex flex-col gap-5 justify-between p-8 max-w-xl modal-box keep-all">
                <section className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-start w-full">
                        <header className="font-semibold text-20">구독에 연결된 팀멤버 </header>
                        <X className="cursor-pointer size-6" onClick={onClose} />
                    </div>
                    <div className="flex items-start gap-6">
                        <Avatar
                            className="w-14 h-14"
                            src={product.image}
                            alt={product.name()}
                            draggable={false}
                            loading="lazy"
                        >
                            <HelpCircle size={24} className="text-gray-300 h-full w-full p-[6px]" />
                        </Avatar>
                        <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                            <p className="flex gap-2 text-18 font-semibold items-center group-hover:text-scordi leading-none py-1">
                                <span className="truncate">{product.name()}</span>
                            </p>

                            <section className="flex gap-1 text-gray-500 text-14 items-center">
                                {/* 별칭 */}
                                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                    {subscription.alias ? subscription.alias : '-'}
                                </p>
                                <span>|</span>

                                {/* 마지막 결제금액 */}
                                <div className="whitespace-nowrap flex gap-1">
                                    <span>{symbol}</span>
                                    <span>{currencyFormat(billingAmount, '')}</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col w-full">
                    <div className="flex overflow-y-auto flex-col gap-4 py-3 w-full max-h-80 border-t border-gray-300">
                        <span>
                            {' '}
                            총 <b>{teamMembers.length}</b>명의 멤버가 사용중입니다.
                        </span>
                    </div>

                    <ul className="flex overflow-y-auto flex-col gap-4 py-3 w-full max-h-80 border-t border-b border-gray-300">
                        {teamMembers.map((teamMember) => (
                            <TeamMemberProfile item={teamMember} />
                        ))}
                    </ul>
                </section>
                <LinkTo
                    href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                    className="btn btn-md text-16 btn-scordi"
                >
                    구독 상세 바로가기
                </LinkTo>
            </div>
        </BasicModal>
    );
});
