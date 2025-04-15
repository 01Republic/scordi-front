import {Button} from '^public/components/ui/button';
import {ReactNodeElement} from '^types/global.type';
import {LoaderCircle} from 'lucide-react';
import {ButtonHTMLAttributes, memo} from 'react';

interface StepSubmitButtonProps {
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    text?: ReactNodeElement;
    onClick?: () => any;
    disabled?: boolean;
    isLoading?: boolean;
}

export const StepSubmitButton = memo((props: StepSubmitButtonProps) => {
    const {type = 'button', text, onClick, disabled = false, isLoading = false} = props;

    return (
        <Button
            size="xl"
            type={type}
            variant={isLoading || disabled ? 'gray' : `scordi`}
            className={`w-64`}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? <LoaderCircle className="animate-spin" strokeWidth="4px" /> : text || '다음'}
        </Button>
    );
});
StepSubmitButton.displayName = 'StepSubmitButton';
