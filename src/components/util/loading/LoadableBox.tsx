import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Spinner} from './Spinner';

interface LoadableBoxProps {
    isLoading: boolean;
    noPadding?: boolean;
    loadingType?: number;
}

export const LoadableBox = memo((props: LoadableBoxProps & WithChildren) => {
    const {loadingType = 1, isLoading, noPadding = false, children} = props;

    const ReRenderChildren = () => <>{children}</>;

    if (loadingType === 2) {
        return (
            <div className="relative">
                {isLoading ? (
                    <div className={`${noPadding ? '' : `pt-4`} opacity-30`}>{children}</div>
                ) : (
                    <div className={`${noPadding ? '' : `pt-4`}`}>
                        <ReRenderChildren />
                    </div>
                )}
                {isLoading && (
                    <div className="absolute top-0 left-0 right-0">
                        <Spinner size={30} />
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div>
                {isLoading ? (
                    <div className="pt-4">loading...</div>
                ) : (
                    <div className={noPadding ? '' : `pt-4`}>{children}</div>
                )}
            </div>
        );
    }
});
LoadableBox.displayName = 'LoadableBox';
