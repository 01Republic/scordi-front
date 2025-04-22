import {memo} from 'react';
import cn from 'classnames';

interface NextStepButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export const NextStepButton = memo((props: NextStepButtonProps) => {
    const {onClick, disabled, isLoading} = props;
    return (
        <button
            type="button"
            onClick={!disabled ? undefined : onClick}
            className={cn('btn btn-lg btn-scordi w-1/3', {
                'btn-scordi': !disabled,
                'bg-neutral-100 text-neutral-300 pointer-events-none': disabled,
                'link_to-loading btn-scordi': isLoading,
            })}
        >
            다음
        </button>
    );
});
