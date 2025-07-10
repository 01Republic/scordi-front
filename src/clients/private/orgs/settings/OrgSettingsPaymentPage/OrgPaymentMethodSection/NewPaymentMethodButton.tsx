import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface NewPaymentMethodButtonProps {
    onClick: () => any;
}

export const NewPaymentMethodButton = memo((props: NewPaymentMethodButtonProps) => {
    const {onClick} = props;
    const {t} = useTranslation('workspaceSettings');

    return (
        <button className="btn3" onClick={onClick}>
            {t('payment.cardRegistration')}
        </button>
    );
});
NewPaymentMethodButton.displayName = 'NewPaymentMethodButton';
