import React, {memo, useState} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';
import {useDraftInboxController} from './useDraftInboxController';
import {useGmailListNavigator} from './useGmailListNavigator';
import {SelectedInvoiceAccount} from './SelectedInvoiceAccount';
import {DraftInboxControlBar} from './DraftInboxControlBar';
import {DraftInboxDataTable} from './DraftInboxDataTable';
import {NextPrevNavigator} from './DraftInboxControlBar/NextPrevNavigator';
import {GmailDetailModal} from '../GmailDetailModal';

interface GmailListFinderProps {
    invoiceAccount?: InvoiceAccountDto;
    unSelectHandler: () => any;
}

export const GmailListFinder = memo((props: GmailListFinderProps) => {
    const {invoiceAccount, unSelectHandler} = props;
    const {form, data, isLoading, isFetching, refetch} = useDraftInboxController(invoiceAccount);
    const [detailModalEmail, setDetailModalEmail] = useState<GmailContentReadableDto>();
    const navigator = useGmailListNavigator({
        data,
        form,
        currentEmail: detailModalEmail,
        setCurrentEmail: setDetailModalEmail,
    });

    return (
        <div>
            {/* 현재 선택된 계정 */}
            <SelectedInvoiceAccount invoiceAccount={invoiceAccount} onClick={() => unSelectHandler()} />

            {/* 인박스 요청 컨트롤바 */}
            <DraftInboxControlBar navigator={navigator} isLoading={isFetching} reload={() => refetch()} />

            <br />

            {/* 이메일 데이터 테이블 */}
            <DraftInboxDataTable
                isLoading={isLoading}
                entries={data?.messages || []}
                onClick={(email) => setDetailModalEmail(email)}
            />

            <div className="pt-4 flex items-center justify-center">
                <NextPrevNavigator
                    prevDisabled={typeof navigator.prevPageToken === 'undefined'}
                    nextDisabled={!navigator.nextPageToken}
                    onPrev={navigator.goPrevPage}
                    onNext={navigator.goNextPage}
                />
            </div>

            {/* 상세 모달 */}
            <GmailDetailModal
                invoiceAccount={invoiceAccount}
                email={detailModalEmail}
                onClose={() => setDetailModalEmail(undefined)}
                navigator={navigator}
            />
        </div>
    );
});
GmailListFinder.displayName = 'GmailListFinder';
