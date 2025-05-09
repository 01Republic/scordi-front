import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import {cn} from '^public/lib/utils';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
        indicatorClassName?: string;
        indicatorStyle?: React.CSSProperties;
    }
>(({className, indicatorClassName, indicatorStyle, value, ...props}, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-sm bg-primary/20', className)}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={cn('h-full w-full flex-1 bg-primary transition-all', indicatorClassName)}
            style={{transform: `translateX(-${100 - (value || 0)}%)`, ...indicatorStyle}}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export {Progress};
