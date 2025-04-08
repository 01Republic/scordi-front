import React, {memo, useState} from 'react';
import Image from 'next/image';
import {BillingHistoryScopeHandlerOfBankAccount} from './BillingHistoryScopeHandlerOfBankAccount';
import {BankAccountExcelUploadModal} from './BankAccountExcelUploadModal';
import excelIcon from '^images/icon/excelIcon.png';

export const BillingHistoryTableControl = memo(() => {
    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandlerOfBankAccount />

            <div>
                <div className="flex items-center gap-2">
                    <ExcelUploadButton />
                </div>
            </div>
        </div>
    );
});

export const ExcelUploadButton = memo(() => {
    const [isExcelUploadModalOpen, setIsExcelUploadModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsExcelUploadModalOpen(true)}
                className="btn btn-sm btn-white gap-2"
            >
                <Image src={excelIcon} alt="excelIcon" width={14} height={14} priority />
                <span>엑셀로 등록하기</span>
            </button>
            <BankAccountExcelUploadModal
                isOpened={isExcelUploadModalOpen}
                onClose={() => setIsExcelUploadModalOpen(false)}
            />
        </>
    );
});
