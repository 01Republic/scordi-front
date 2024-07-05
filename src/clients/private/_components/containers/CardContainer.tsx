import {memo} from 'react';
import {WithChildren} from '^types/global.type';

export interface CardContainerProps extends WithChildren {
    className?: string;
}

export const CardContainer = memo((props: CardContainerProps) => {
    const {className = '', children} = props;

    return <div className={`card card-bordered bg-white rounded-md ${className}`}>{children}</div>;
});
CardContainer.displayName = 'CardContainer';
