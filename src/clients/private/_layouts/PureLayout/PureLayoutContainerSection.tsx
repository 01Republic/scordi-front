import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {cn} from '^public/lib/utils';

interface PureLayoutContainerSectionProps extends WithChildren {
    className?: string;
}

export const PureLayoutContainerSection = memo((props: PureLayoutContainerSectionProps) => {
    const {className = '', children} = props;

    return <section className={cn('mx-auto max-w-6xl px-4', className)}>{children}</section>;
});
PureLayoutContainerSection.displayName = 'PureLayoutContainerSection';
