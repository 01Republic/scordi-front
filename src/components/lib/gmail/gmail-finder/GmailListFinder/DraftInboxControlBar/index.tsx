import React, {memo} from 'react';
import {PagePerSelect} from '^components/Paginator';
import {GmailListNavigator} from '../useGmailListNavigator';
import {KeywordSearchInput} from './KeywordSearchInput';
import {PageRefreshButton} from './PageRefreshButton';
import {PagesNavigator} from './PagesNavigator';
import {NextPrevNavigator} from './NextPrevNavigator';

interface DraftInboxControlBarProps {
    navigator: GmailListNavigator;
    isLoading: boolean;
    reload: () => any;
}

export const DraftInboxControlBar = memo((props: DraftInboxControlBarProps) => {
    const {isLoading, reload} = props;
    const {navigator} = props;
    const {params, currentPageNum, pageTokens, prevPageToken, nextPageToken} = navigator;

    return (
        <div className="flex items-center text-14">
            <KeywordSearchInput defaultValue={params.q} onSubmit={navigator.searchInputSubmit} />

            <PageRefreshButton isLoading={isLoading} onClick={() => reload()} />

            <div className="flex items-center gap-4">
                <PagesNavigator currentPageNum={currentPageNum} pageTokens={pageTokens} moveTo={navigator.goPage} />

                <NextPrevNavigator
                    prevDisabled={typeof prevPageToken === 'undefined'}
                    nextDisabled={!nextPageToken}
                    onPrev={navigator.goPrevPage}
                    onNext={navigator.goNextPage}
                />

                <PagePerSelect
                    className="select-sm"
                    defaultValue={params.maxResults || 20}
                    changePageSize={navigator.changePageSize}
                    perValues={[10, 20, 30, 50, 100]}
                />
            </div>
        </div>
    );
});
DraftInboxControlBar.displayName = 'DraftInboxControlBar';
