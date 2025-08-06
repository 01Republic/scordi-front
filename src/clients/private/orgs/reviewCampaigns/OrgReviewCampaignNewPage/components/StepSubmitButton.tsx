import {Button} from '^public/components/ui/button';
import {ReactNodeElement} from '^types/global.type';
import {LoaderCircle} from 'lucide-react';
import {useTranslation} from 'next-i18next';
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
    const {t} = useTranslation('reviewCampaigns');

    return (
        <Button
            size="xl"
            type={type}
            variant={isLoading || disabled ? 'gray' : `scordi`}
            className={`w-64`}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? (
                <LoaderCircle className="animate-spin" strokeWidth="4px" />
            ) : (
                text || t('components.nextButton')
            )}
        </Button>
    );
});
StepSubmitButton.displayName = 'StepSubmitButton';
