import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {LinkTo, LinkToProps} from '^components/util/LinkTo';
import {cn} from '^public/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                scordi: 'bg-scordi text-white shadow hover:bg-primary/90',
                scordiGhost: 'bg-transparent text-white hover:bg-gray-50 hover:text-scordi',
                scordiWhite: 'bg-white text-scordi hover:bg-gray-100',
                ghostGray: 'hover:bg-gray-50 hover:text-accent-foreground',
                gray: 'bg-gray-300 text-black shadow hover:bg-primary/90',
                grayOutline: 'bg-gray-100 text-black hover:bg-primary/90 border',

                /* original variants */
                default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                xl: 'h-12 rounded-md px-12',
                xxl: 'h-14 rounded-lg px-14',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />;
    },
);
Button.displayName = 'Button';

export interface ButtonLinkProps extends VariantProps<typeof buttonVariants>, LinkToProps {
    // asChild?: boolean;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>((props, ref) => {
    const {className, variant, size, ...res} = props;
    // const Comp = asChild ? Slot : Link;
    return <LinkTo ref={ref} className={cn(buttonVariants({variant, size, className}))} {...res} />;
});
ButtonLink.displayName = 'ButtonLink';

export {Button, ButtonLink, buttonVariants};
