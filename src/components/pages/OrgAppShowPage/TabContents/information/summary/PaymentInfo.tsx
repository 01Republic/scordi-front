import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ApplicationDto} from '^types/application.type';
import {OutLink} from '^components/OutLink';
import {BsArrowRightShort, BiCreditCard} from '^components/react-icons';
import {IoWarningOutline} from 'react-icons/io5';

interface PaymentInfoProps {
    application: ApplicationDto;
}

export const PaymentInfo = memo((props: PaymentInfoProps & WithChildren) => {
    const {application, children} = props;

    const {prototype} = application;

    const appSlug = application.displayName; // TODO: application.slug
    const paymentInfoUrlStr = 'https://github.com/organizations/${appSlug}/settings/billing';
    const paymentInfoUrl = eval(`\`${paymentInfoUrlStr}\``) as string; // TODO: 프로토타입에 paymentInfoUrl

    return (
        <>
            <div className="stat-figure">
                <BiCreditCard size={36} />
            </div>
            <div className="stat-title mb-2">
                <OutLink
                    href={paymentInfoUrl}
                    icon={
                        <span className="text-gray-900">
                            <BsArrowRightShort size={18} />
                        </span>
                    }
                >
                    <span className="text-gray-900">Payment information</span>
                </OutLink>
            </div>

            {/*<div className="stat-value mb-3">86%</div>*/}

            <div className="stat-actions">
                <button className="btn btn-xs gap-2 capitalize btn-error items-center text-white">
                    <IoWarningOutline size={14} strokeWidth="2" />
                    <span>Update payment method</span>
                </button>
            </div>
        </>
    );
});
