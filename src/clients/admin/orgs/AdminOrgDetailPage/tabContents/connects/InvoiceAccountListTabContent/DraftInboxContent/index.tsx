import React, {memo, useState} from 'react';
import {TabPaneProps} from '^components/util/tabs';
import {GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';
import {SelectedInvoiceAccount} from './SelectedInvoiceAccount';
import {DraftInboxControlBar} from './DraftInboxControlBar';
import {DraftInboxDataTable} from './DraftInboxDataTable';
import {GmailDetailModal} from './GmailDetailModal';
import {useDraftInboxController} from './useDraftInboxController';
import {NextPrevNavigator} from './DraftInboxControlBar/NextPrevNavigator';

export const DraftInboxContent = memo((props: TabPaneProps) => {
    const {moveTab = console.log} = props;
    const {form, data, isLoading, isFetching, refetch, pageTokens, setPageTokens} = useDraftInboxController();
    const [detailModalEmail, setDetailModalEmail] = useState<GmailContentReadableDto>();

    const params = form.watch();
    const currentPageNum = pageTokens.findIndex((token) => token === params.pageToken) + 1;

    return (
        <div>
            {/* 현재 선택된 계정 */}
            <SelectedInvoiceAccount onClick={() => moveTab(0)} />

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
            <GmailDetailModal email={detailModalEmail} onClose={() => setDetailModalEmail(undefined)} />
        </div>
    );
});
