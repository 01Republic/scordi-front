import React, {memo} from 'react';
import cn from 'classnames';

interface TeamScopeButtonProps {
    text?: string;
    onClick?: () => void;
    active: boolean; // 활성화 상태
}

export const TeamScopeButton = memo((props: TeamScopeButtonProps) => {
    const {text, onClick, active} = props;

    return (
        <button
            className={cn('btn btn-sm rounded-full transition-all', {
                '!bg-scordi-50 !border-scordi-300 !text-scordi': active,
                'border-gray-300 bg-white hover:bg-scordi-50 hover:border-scordi-300': !active,
            })}
            onClick={onClick}
        >
            {text}
        </button>
    );
});
TeamScopeButton.displayName = 'ScopeButton';
