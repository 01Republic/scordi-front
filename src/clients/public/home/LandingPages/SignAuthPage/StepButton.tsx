import cn from 'classnames';

interface StepButtonProps {
    text: string;
    onClick?: () => void;
    disabled: boolean;
    buttonWhite?: boolean;
    isPending: boolean;
}

export const StepButton = (props: StepButtonProps) => {
    const {text, onClick, disabled} = props;
    const {isPending, buttonWhite = false} = props;

    return (
        <button
            type="button"
            onClick={!disabled ? undefined : onClick}
            className={cn(
                'w-full flex items-center justify-center rounded-lg btn',
                isPending
                    ? 'link_to-loading'
                    : !disabled
                    ? 'bg-neutral-100 text-neutral-300 pointer-events-none'
                    : buttonWhite
                    ? 'btn-white'
                    : ' btn-scordi ',
            )}
        >
            <p className="font-semibold text-16 py-3">{text}</p>
        </button>
    );
};
