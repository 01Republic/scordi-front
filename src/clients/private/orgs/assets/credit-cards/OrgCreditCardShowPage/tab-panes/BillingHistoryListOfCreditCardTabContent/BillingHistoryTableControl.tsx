import React, {memo, useState} from 'react';
import Image from 'next/image';
import Tippy from '@tippyjs/react';
import {PencilLine} from 'lucide-react';
import {CreditCardDto} from '^models/CreditCard/type';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistoryDto, FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';
import excelIcon from '^images/icon/excelIcon.png';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';
import {BillingHistoryTableTitle} from './BillingHistoryTableTitle';
import {ManualBillingHistoryModal} from '^clients/private/_modals/ManualBillingHistoryModal';
import {toast} from 'react-hot-toast';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {useCreateCreditCardBillingHistory} from '^models/BillingHistory/hook';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {errorToast} from '^api/api';

interface BillingHistoryTableControlProps {
    creditCard: CreditCardDto;
    excelUploadModalClose: () => void;
    query: FindAllBillingHistoriesQueryDto;
    search: (params: FindAllBillingHistoriesQueryDto) => any;
    data: Paginated<BillingHistoryDto>;
    isLoading: boolean;
    refetch: () => any;
}

export const BillingHistoryTableControl = memo((props: BillingHistoryTableControlProps) => {
    const {creditCard, excelUploadModalClose} = props;
    const {query, data, search, isLoading, refetch} = props;

    return (
        <div>
            {creditCard && (
                <BillingHistoryTableTitle creditCard={creditCard} data={data} isLoading={isLoading} refetch={refetch} />
            )}
            <div className="flex items-center justify-between mb-4">
                <BillingHistoryScopeHandler query={query} search={search} />

                <div>
                    <div className="flex items-center gap-2">
                        <BillingHistoryManualUploadButton creditCard={creditCard} onSaved={() => refetch()} />
                        <ExcelUploadButton excelUploadModalClose={excelUploadModalClose} />
                    </div>
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
        <Tippy content="엑셀로 구독을 한 번에 불러와요.">
            <div>
                <button
                    type="button"
                    onClick={excelUploadModalClose}
                    className="btn btn-sm btn-white gap-2 no-animation btn-animation"
                >
                    <Image src={excelIcon} alt="excelIcon" width={14} height={14} priority />
                    <span>엑셀로 등록하기</span>
                </button>
            </div>
        </Tippy>
    );
});

interface BillingHistoryManualUploadModalProps {
    creditCard: CreditCardDto;
    onSaved?: () => any;
}

export const BillingHistoryManualUploadButton = memo((props: BillingHistoryManualUploadModalProps) => {
    const {creditCard, onSaved} = props;
    const orgId = useOrgIdParam();
    const [isOpen, setIsOpen] = useState(false);

    const {mutateAsync, isPending} = useCreateCreditCardBillingHistory(orgId, creditCard.id);

    const onCreate = async (dto: CreateBillingHistoryByManualRequestDto) => {
        if (!dto.subscriptionId) return;
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
                creditCard={creditCard}
                readonly="결제수단"
            />
        </>
    );
});
