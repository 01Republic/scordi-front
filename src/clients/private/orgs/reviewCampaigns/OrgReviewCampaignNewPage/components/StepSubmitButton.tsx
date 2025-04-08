import React, {memo} from 'react';
import {ReactNodeElement} from '^types/global.type';
import {Button} from '^public/components/ui/button';
import {LoaderCircle} from 'lucide-react';

interface StepSubmitButtonProps {
    text?: ReactNodeElement;
    onClick?: () => any;
    disabled?: boolean;
    isLoading?: boolean;
}

export const StepSubmitButton = memo((props: StepSubmitButtonProps) => {
    const {text, onClick, disabled = false, isLoading = false} = props;

    return (
        <Button
            size="xl"
            variant={isLoading ? 'gray' : `scordi`}
            className={`w-64`}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? <LoaderCircle className="animate-spin" strokeWidth="4px" /> : text || '다음'}
        </Button>
    );
});
StepSubmitButton.displayName = 'StepSubmitButton';
