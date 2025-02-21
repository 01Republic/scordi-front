import React, {memo, useState} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';
import {useDraftInboxController} from './useDraftInboxController';
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
    const {form, data, isLoading, isFetching, refetch, pageTokens, setPageTokens} =
        useDraftInboxController(invoiceAccount);
    const [detailModalEmail, setDetailModalEmail] = useState<GmailContentReadableDto>();

    const params = form.watch();
    const currentPageNum = pageTokens.findIndex((token) => token === params.pageToken) + 1;

    return (
        <div>
            {/* 현재 선택된 계정 */}
            <SelectedInvoiceAccount invoiceAccount={invoiceAccount} onClick={() => unSelectHandler()} />

            {/* 인박스 요청 컨트롤바 */}
            <DraftInboxControlBar
                form={form}
                pageTokens={pageTokens}
                setPageTokens={setPageTokens}
                nextPageToken={data?.nextPageToken}
                isLoading={isFetching}
                reload={() => refetch()}
            />

            <br />

            {/* 이메일 데이터 테이블 */}
            <DraftInboxDataTable
                isLoading={isLoading}
                entries={data?.messages || []}
                onClick={(email) => setDetailModalEmail(email)}
            />

            <div className="pt-4 flex items-center justify-center">
                <NextPrevNavigator
                    currentPageNum={currentPageNum}
                    pageTokens={pageTokens}
                    nextPageToken={data?.nextPageToken}
                    onPrev={(pageToken) => form.setValue('pageToken', pageToken)}
                    onNext={(pageToken) => {
                        setPageTokens((tokens) => {
                            return tokens.includes(pageToken) ? [...tokens] : [...tokens, pageToken];
                        });
                        form.setValue('pageToken', pageToken);
                    }}
                />
            </div>

            {/* 상세 모달 */}
            <GmailDetailModal
                invoiceAccount={invoiceAccount}
                email={detailModalEmail}
                onClose={() => setDetailModalEmail(undefined)}
            />
        </div>
    );
});
GmailListFinder.displayName = 'GmailListFinder';
