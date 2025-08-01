import React, {memo, useState} from 'react';
import Image from 'next/image';
import {PencilLine} from 'lucide-react';
import {toast} from 'react-hot-toast';
import excelIcon from '^images/icon/excelIcon.png';
import {useOrgIdParam} from '^atoms/common';
import {BankAccountDto} from '^models/BankAccount/type';
import {useCreateBankAccountBillingHistory} from '^models/BillingHistory/hook';
import {BillingHistoryScopeHandlerOfBankAccount} from './BillingHistoryScopeHandlerOfBankAccount';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {BankAccountExcelUploadModal} from './BankAccountExcelUploadModal';
import {ManualBillingHistoryModal} from '^clients/private/_modals/ManualBillingHistoryModal';

interface BillingHistoryTableControlProps {
    bankAccount: BankAccountDto;
}

export const BillingHistoryTableControl = memo((props: BillingHistoryTableControlProps) => {
    const {bankAccount} = props;
    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandlerOfBankAccount />

            <div>
                <div className="flex items-center gap-2">
                    <BillingHistoryManualUploadButton bankAccount={bankAccount} />
                    {/* 백엔드 개발 되면 활성화 할 예정 삭제하면 안됨 */}
                    {/* <ExcelUploadButton />*/}
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

interface BillingHistoryManualUploadModalProps {
    bankAccount: BankAccountDto;
}

export const BillingHistoryManualUploadButton = memo((props: BillingHistoryManualUploadModalProps) => {
    const {bankAccount} = props;
    const orgId = useOrgIdParam();
    const [isOpen, setIsOpen] = useState(false);

    const {mutateAsync, isPending} = useCreateBankAccountBillingHistory();

    const onCreate = async (dto: CreateBillingHistoryByManualRequestDto) => {
        await mutateAsync({
            orgId,
            id: bankAccount.id,
            dto: {
                ...dto,
            },
        }).then(() => toast.success('결제내역이 등록되었습니다.'));
    };

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="btn btn-sm btn-white gap-2">
                <PencilLine className="size-3.5" />
                직접 추가
            </button>
            <ManualBillingHistoryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isLoading={isPending}
                onCreate={onCreate}
                bankAccount={bankAccount}
                readonly="결제수단"
            />
        </>
    );
});
