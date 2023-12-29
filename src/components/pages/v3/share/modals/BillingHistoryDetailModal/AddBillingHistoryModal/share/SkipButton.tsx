import React, {memo} from 'react';

export const SkipButton = memo((props: {onClick: () => void}) => {
    return (
        <button
            onClick={props.onClick}
            className="btn btn-link btn-sm flex gap-2 !bg-transparent text-slate-400 !no-underline px-0 font-[400]"
        >
            건너뛰기
        </button>
    );
});
