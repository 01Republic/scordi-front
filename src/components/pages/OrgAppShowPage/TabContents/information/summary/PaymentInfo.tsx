import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {OutLink} from '^components/OutLink';
import {AlertTriangle, ArrowRight, CreditCard, Mail} from 'lucide-react';
interface PaymentInfoProps {
    subscription: SubscriptionDto;
}

export const PaymentInfo = memo((props: PaymentInfoProps & WithChildren) => {
    const {subscription, children} = props;

    const {product} = subscription;

    const {workspace, billingEmail} = subscription;
    const {slug} = workspace || {};
    const paymentInfoUrl = eval(`\`${product.billingInfoPageUrlScheme}\``) as string;
    const updatePaymentMethodUrl = eval(`\`${product.updatePayMethodUrlScheme}\``) as string;
    const open = (url: string) => (url ? window.open(url, '_blank') : alert('This service linkage is not ready :('));

    return (
        <>
            <div className="stat-figure">
                <CreditCard size={36} />
            </div>
            <div className="stat-title mb-2">
                <OutLink
                    href={paymentInfoUrl}
                    icon={
                        <span className="text-gray-900">
                            <ArrowRight size={18} />
                        </span>
                    }
                >
                    <span className="text-gray-900">Payment information</span>
                </OutLink>
            </div>

            <div className="stat-desc">
                <p className="flex items-center gap-2">
                    <Mail size={18} />
                    <span>{billingEmail || 'Email not set'}</span>
                </p>
            </div>

            <div className="stat-actions">
                <button
                    className="btn btn-xs gap-2 capitalize btn-error items-center text-white"
                    onClick={() => open(updatePaymentMethodUrl)}
                >
                    <AlertTriangle size={14} strokeWidth="2" />
                    <span>Update payment method</span>
                </button>
            </div>
        </>
    );
});
