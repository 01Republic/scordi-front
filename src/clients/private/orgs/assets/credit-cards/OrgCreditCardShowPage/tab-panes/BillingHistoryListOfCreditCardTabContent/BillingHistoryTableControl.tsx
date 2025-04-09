import React, {memo} from 'react';
import Image from 'next/image';
import excelIcon from '^images/icon/excelIcon.png';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';

interface BillingHistoryTableControlProps {
    excelUploadModalClose: () => void;
}

export const BillingHistoryTableControl = memo((props: BillingHistoryTableControlProps) => {
    const {excelUploadModalClose} = props;
    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandler />

            <div>
                <div className="flex items-center gap-2">
                    <ExcelUploadButton excelUploadModalClose={excelUploadModalClose} />
                </div>
            </div>
        </div>
    );
});

interface ExcelUploadButtonProps {
    excelUploadModalClose: () => void;
}

export const ExcelUploadButton = memo((props: ExcelUploadButtonProps) => {
    const {excelUploadModalClose} = props;
    return (
        <>
            <button type="button" onClick={excelUploadModalClose} className="btn btn-sm btn-white gap-2 ">
                <Image src={excelIcon} alt="excelIcon" width={14} height={14} priority />
                <span>엑셀로 등록하기</span>
            </button>
        </>
    );
});
