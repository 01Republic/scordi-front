import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ContainerProps extends WithChildren {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    className?: string;
}

export const Container = memo(function Container(props: ContainerProps) {
    const {size = 'sm', className = '', children} = props;

    return <section className={`w-full mx-auto max-w-${size} ${className}`}>{children}</section>;
});
