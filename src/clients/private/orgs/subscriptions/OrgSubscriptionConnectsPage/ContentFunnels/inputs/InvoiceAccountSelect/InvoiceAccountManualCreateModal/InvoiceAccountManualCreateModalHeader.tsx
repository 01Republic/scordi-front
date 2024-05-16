import React, {memo} from 'react';
import {FaChevronLeft} from 'react-icons/fa6';

interface InvoiceAccountManualCreateModalHeaderProps {
    onClose: () => any;
}

export const InvoiceAccountManualCreateModalHeader = memo((props: InvoiceAccountManualCreateModalHeaderProps) => {
    const {onClose} = props;

    return (
        <header>
            <div className="mb-4">
                <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
            </div>
            <p className="font-medium text-12 text-scordi">직접 추가하기</p>
            <h3 className="font-bold text-xl">청구서를 어디서 받고 계세요?</h3>
        </header>
    );
});
InvoiceAccountManualCreateModalHeader.displayName = 'InvoiceAccountManualCreateModalHeader';
