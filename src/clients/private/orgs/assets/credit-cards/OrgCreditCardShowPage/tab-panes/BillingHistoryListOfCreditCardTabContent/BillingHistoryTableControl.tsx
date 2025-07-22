import React, {memo} from 'react';
import Image from 'next/image';
import Tippy from '@tippyjs/react';
import excelIcon from '^images/icon/excelIcon.png';
import {CreditCardDto} from '^models/CreditCard/type';
import {BillingHistoryTableTitle} from './BillingHistoryTableTitle';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistoryDto, FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';

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
