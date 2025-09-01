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
import {errorToast} from '^api/api';
import {BillingHistoryDto, FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';
import {Paginated} from '^types/utils/paginated.dto';

interface BillingHistoryTableControlProps {
    bankAccount: BankAccountDto;
    query: FindAllBillingHistoriesQueryDto;
    search: (params: FindAllBillingHistoriesQueryDto) => any;
    data: Paginated<BillingHistoryDto>;
    isLoading: boolean;
    refetch: () => any;
}

export const BillingHistoryTableControl = memo((props: BillingHistoryTableControlProps) => {
    const {bankAccount} = props;
    const {query, data, search, isLoading, refetch} = props;

    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandlerOfBankAccount />

            <div>
                <div className="flex items-center gap-2">
                    <BillingHistoryManualUploadButton bankAccount={bankAccount} onSaved={() => refetch()} />
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
    onSaved?: () => any;
}

export const BillingHistoryManualUploadButton = memo((props: BillingHistoryManualUploadModalProps) => {
    const {bankAccount, onSaved} = props;
    const orgId = useOrgIdParam();
    const [isOpen, setIsOpen] = useState(false);

    const {mutateAsync, isPending} = useCreateBankAccountBillingHistory(orgId, bankAccount.id);

    const onCreate = async (dto: CreateBillingHistoryByManualRequestDto) => {
        await mutateAsync(dto)
            .then(() => toast.success('결제내역이 등록되었습니다.'))
            .then(() => onSaved && onSaved())
            .catch(errorToast);
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
