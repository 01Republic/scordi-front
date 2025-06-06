import {memo, useState} from 'react';
import cn from 'classnames';

interface NextStepButtonProps {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    localLoading?: boolean;
}

export const NextStepButton = memo((props: NextStepButtonProps) => {
    const {text = '다음', onClick, disabled, isLoading, localLoading = false, className = ''} = props;
    const [isClicked, setIsClicked] = useState(false);

    const loading = isLoading || (localLoading ? isClicked : false);

    const click = () => {
        if (localLoading) setIsClicked(true);
        onClick && onClick();
    };

    return (
        <button
            type="button"
            onClick={click}
            className={cn(
                'btn btn-lg btn-scordi btn-block sm:btn-wide no-animation btn-animation',
                {
                    'btn-scordi': !disabled,
                    'btn-disabled2 pointer-events-none': disabled,
                    loading: loading,
                },
                className,
            )}
        >
            {text}
        </button>
    );
});
