import {memo} from 'react';

interface InvoiceAccountManualCreateSubmitButtonProps {
    onClick?: () => any;
}

export const InvoiceAccountManualCreateSubmitButton = memo((props: InvoiceAccountManualCreateSubmitButtonProps) => {
    const {onClick} = props;

    return (
        <section className="fixed p-4 bottom-0 left-0 right-0">
            <button className="btn btn-lg sm:btn-md btn-scordi btn-block" onClick={onClick}>
                추가하기
            </button>
        </section>
    );
});
InvoiceAccountManualCreateSubmitButton.displayName = 'InvoiceAccountManualCreateSubmitButton';
