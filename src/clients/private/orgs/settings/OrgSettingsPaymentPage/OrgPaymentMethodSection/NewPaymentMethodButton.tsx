import React, {memo} from 'react';

interface NewPaymentMethodButtonProps {
    onClick: () => any;
}

export const NewPaymentMethodButton = memo((props: NewPaymentMethodButtonProps) => {
    const {onClick} = props;

    return (
        <button className="btn3" onClick={onClick}>
            카드 등록
        </button>
    );
});
NewPaymentMethodButton.displayName = 'NewPaymentMethodButton';
