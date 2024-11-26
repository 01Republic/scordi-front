import React, {memo} from 'react';
import {IoClose} from '@react-icons/all-files/io5/IoClose';

interface PaymentPreviewModalHeaderProps {
    className?: string;
    onClose: () => any;
}

export const PaymentPreviewModalHeader = memo((props: PaymentPreviewModalHeaderProps) => {
    const {className = '', onClose} = props;

    return (
        <header className={`flex justify-between items-start ${className}`}>
            <div>
                <h3 className="text-2xl mb-1.5">플랜 결제 정보</h3>
                <p className="text-[#999] font-medium text-16">아래의 내용으로 지금 결제할까요?</p>
            </div>

            <div>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-stroke-gray text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                    <IoClose size={32} />
                </button>
            </div>
        </header>
    );
});
PaymentPreviewModalHeader.displayName = 'PaymentPreviewModalHeader';
