import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Transition} from '@headlessui/react';

interface FadeUpProps extends WithChildren {
    show?: boolean;
    appear?: boolean;
    delay?: string;
    enderDuration?: string;
    leaveDuration?: string;
    leaveNoEffect?: boolean;
    className?: string;
}

export const FadeUp = memo(
    ({
        show = false,
        appear = false,
        delay = '',
        enderDuration = '',
        leaveDuration = '',
        leaveNoEffect = false,
        className = '',
        children,
    }: FadeUpProps) => (
        <Transition
            show={show}
            appear={appear}
            className={`space-y-4 ${className}`}
            enter={`transition-all ease-in-out ${enderDuration || 'duration-500'} ${delay}`}
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave={`${leaveNoEffect ? '' : 'transition-all ease-in-out'} ${leaveDuration || 'duration-300'}`}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            {children}
        </Transition>
    ),
);
FadeUp.displayName = 'FadeUp';

interface FadeUpChildProps extends WithChildren {
    delay?: string;
}

export const FadeUpChild = memo(({delay = '', children}: FadeUpChildProps) => (
    <Transition.Child
        enter={`transition-all ease-in-out duration-700 ${delay}`}
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        {children}
    </Transition.Child>
));
FadeUpChild.displayName = 'FadeUpChild';
