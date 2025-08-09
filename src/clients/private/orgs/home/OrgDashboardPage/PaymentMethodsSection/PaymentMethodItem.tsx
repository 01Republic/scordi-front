import {LinkTo} from '^components/util/LinkTo';
import {DashboardCreditCardsSectionItemDto} from '^models/_dashboard/type';
import {CreditCardProfileOption2} from '^models/CreditCard/components';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {currencyFormatWithI18n, roundNumber} from '^utils/number';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface PaymentMethodItemProps {
    item: DashboardCreditCardsSectionItemDto;
}

export const PaymentMethodItem = memo((props: PaymentMethodItemProps) => {
    const {item} = props;
    const {t} = useTranslation('common');

    const {creditCard, organizationId, payAmountSum = 0, payAmountCode, id} = item;

    return (
        <li className="py-4 border-b-[1px] last:border-b-0">
            <LinkTo href={OrgCreditCardShowPageRoute.path(organizationId, id)}>
                <div className="flex items-center justify-between">
                    <CreditCardProfileOption2 item={creditCard} />
                    {/* TODO: 단위 원 고정으로 처리되어 있으나, 데이터로 전달받은 화폐코드에 따라 동적으로 처리되어야 함. */}
                    <p className="font-medium text-16 text-gray-900">
                        {currencyFormatWithI18n(
                            payAmountSum > 0 ? roundNumber(payAmountSum) * -1 : roundNumber(payAmountSum),
                            t,
                        )}
                    </p>
                </div>
            </LinkTo>
        </li>
    );
});
PaymentMethodItem.displayName = 'PaymentMethodItem';
