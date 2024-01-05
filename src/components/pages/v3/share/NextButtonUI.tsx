import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface NextButtonUIProps extends WithChildren {
    isActive: boolean;
    onClick: () => any;
}

export const NextButtonUI = memo((props: NextButtonUIProps) => {
    const {isActive, onClick, children} = props;

    return (
        <button
            disabled={!isActive}
            className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50 disabled:bg-gray-100 disabled:border-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={onClick}
        >
            {children}
        </button>
    );
});
NextButtonUI.displayName = 'NextButtonUI';
