import React, {memo} from 'react';

interface PagesNavigatorProps {
    currentPageNum: number;
    pageTokens: string[];
    moveTo: (pageToken: string) => any;
}

export const PagesNavigator = memo((props: PagesNavigatorProps) => {
    const {currentPageNum, pageTokens, moveTo} = props;

    return (
        <div className="flex items-center gap-1">
            <div onClick={() => console.log('prevPageTokens', pageTokens)}>현재 {currentPageNum}p /</div>

            <div>이동</div>

            {pageTokens.map((pageToken, i) => (
                <div key={pageToken} className="link link-primary underline-offset-2" onClick={() => moveTo(pageToken)}>
                    {i + 1}p
                </div>
            ))}
        </div>
    );
});
PagesNavigator.displayName = 'PagesNavigator';
