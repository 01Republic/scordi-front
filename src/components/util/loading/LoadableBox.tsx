import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Spinner} from './Spinner';

interface LoadableBoxProps {
    isLoading: boolean;
    noPadding?: boolean;
    loadingType?: number;
    spinnerSize?: number;
    spinnerPos?: 'top' | 'center' | 'bottom';
    loadingClass?: string;
}

export const LoadableBox = memo((props: LoadableBoxProps & WithChildren) => {
    const {
        loadingType = 1,
        isLoading,
        noPadding = false,
        spinnerSize = 30,
        spinnerPos = 'top',
        loadingClass = '',
        children,
    } = props;

    const ReRenderChildren = () => <>{children}</>;

    if (loadingType === 2) {
        return (
            <div className="relative">
                {isLoading ? (
                    <div className={`${noPadding ? '' : `pt-4`} opacity-30 ${loadingClass}`}>{children}</div>
                ) : (
                    <div className={`${noPadding ? '' : `pt-4`}`}>
                        <ReRenderChildren />
                    </div>
                )}
                {isLoading && (
                    <div
                        className={`absolute top-0 left-0 right-0 ${loadingClass} ${
                            spinnerPos === 'top' ? '' : 'bottom-0'
                        }`}
                    >
                        <Spinner size={spinnerSize} posY={spinnerPos} />
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div>
                {isLoading ? (
                    <div className={`relative ${noPadding ? '' : `pt-4`}`}>
                        <div className={`absolute top-0 left-0 right-0 ${spinnerPos === 'top' ? '' : 'bottom-0'}`}>
                            <Spinner size={spinnerSize} posY={spinnerPos} />
                        </div>
                    </div>
                ) : (
                    <div className={noPadding ? '' : `pt-4`}>{children}</div>
                )}
            </div>
        );
    }
});
LoadableBox.displayName = 'LoadableBox';

interface LoadableBox2Props extends Pick<LoadableBoxProps, 'isLoading'>, WithChildren {
    className?: string;
}

export const LoadableBox2 = (props: LoadableBox2Props) => {
    const {className = '', isLoading, children} = props;

    return isLoading ? (
        <div className={`flex items-center justify-center ${className}`}>
            <div>
                <Spinner />
            </div>
        </div>
    ) : (
        <>{children}</>
    );
};
