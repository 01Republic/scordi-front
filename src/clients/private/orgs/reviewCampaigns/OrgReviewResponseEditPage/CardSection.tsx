import {memo} from 'react';
import {Card} from '^public/components/ui/card';
import {ReactNodeElement, WithChildren} from '^types/global.type';

interface CardSectionProps extends WithChildren {
    title?: ReactNodeElement;
    required?: boolean;
    className?: string;
}

export const CardSection = memo((props: CardSectionProps) => {
    const {title, required = false, className = '', children} = props;

    return (
        <Card className={`bg-white p-4 sm:px-7 sm:py-6 space-y-5 ${className}`}>
            {title && (
                <div className="text-18 font-semibold">
                    {title} {required ? <span className="text-red-400">*</span> : ''}
                </div>
            )}

            {children}
        </Card>
    );
});
CardSection.displayName = 'CardSection';
