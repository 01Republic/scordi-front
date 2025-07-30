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
                        <BillingHistoryManualUploadButton creditCard={creditCard} />
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
}

export const BillingHistoryManualUploadButton = memo((props: BillingHistoryManualUploadModalProps) => {
    const {creditCard} = props;
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="btn btn-sm btn-white gap-2">
                <PencilLine className="size-3.5" />
                직접 추가
            </button>
            <ManualBillingHistoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} creditCard={creditCard} />
        </>
    );
});
