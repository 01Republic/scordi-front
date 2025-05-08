import {memo} from 'react';
import cn from 'classnames';

interface NextStepButtonProps {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export const NextStepButton = memo((props: NextStepButtonProps) => {
    const {text = '다음', onClick, disabled, isLoading} = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn('btn btn-lg btn-scordi w-1/3', {
                'btn-scordi': !disabled,
                'btn-disabled2': disabled,
                'link_to-loading btn-scordi': isLoading,
            })}
        >
            {text}
        </button>
    );
});
