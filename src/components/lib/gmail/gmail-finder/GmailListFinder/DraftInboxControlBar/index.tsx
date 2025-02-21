import React, {Dispatch, memo, SetStateAction} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {GmailMessageListFetchParamQueryDto} from '^models/InvoiceAccount/type/invoiceAccountGmailTextApi.type';
import {PagePerSelect} from '^components/Paginator';
import {KeywordSearchInput} from './KeywordSearchInput';
import {PageRefreshButton} from './PageRefreshButton';
import {PagesNavigator} from './PagesNavigator';
import {NextPrevNavigator} from './NextPrevNavigator';

interface DraftInboxControlBarProps {
    form: UseFormReturn<GmailMessageListFetchParamQueryDto, any>;
    pageTokens: string[];
    setPageTokens: Dispatch<SetStateAction<string[]>>;
    nextPageToken?: string;
    isLoading: boolean;
    reload: () => any;
}

export const DraftInboxControlBar = memo((props: DraftInboxControlBarProps) => {
    const {form, pageTokens, setPageTokens, nextPageToken, isLoading, reload} = props;
    const params = form.watch();
    const currentPageNum = pageTokens.findIndex((token) => token === params.pageToken) + 1;

    return (
        <div className="flex items-center text-14">
            <KeywordSearchInput
                defaultValue={params.q}
                onSubmit={(value) => {
                    setPageTokens(['']);
                    form.setValue('pageToken', '');
                    form.setValue('maxResults', 20);
                    form.setValue('q', value);
                }}
            />

            <PageRefreshButton isLoading={isLoading} onClick={() => reload()} />

            <div className="flex items-center gap-4">
                <PagesNavigator
                    currentPageNum={currentPageNum}
                    pageTokens={pageTokens}
                    moveTo={(pageToken) => form.setValue('pageToken', pageToken)}
                />

                <NextPrevNavigator
                    currentPageNum={currentPageNum}
                    pageTokens={pageTokens}
                    nextPageToken={nextPageToken}
                    onPrev={(pageToken) => form.setValue('pageToken', pageToken)}
                    onNext={(pageToken) => {
                        setPageTokens((tokens) => {
                            return tokens.includes(pageToken) ? [...tokens] : [...tokens, pageToken];
                        });
                        form.setValue('pageToken', pageToken);
                    }}
                />

                <PagePerSelect
                    className="select-sm"
                    defaultValue={params.maxResults || 20}
                    changePageSize={(size) => {
                        setPageTokens(['']);
                        form.setValue('pageToken', '');
                        form.setValue('maxResults', size);
                    }}
                    perValues={[10, 20, 30, 50, 100]}
                />
            </div>
        </div>
    );
});
DraftInboxControlBar.displayName = 'DraftInboxControlBar';
