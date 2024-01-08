import {memo, ReactNode, RefObject} from 'react';
import Tippy, {TippyProps} from '@tippyjs/react/headless';
import {DropdownBackdrop} from './Backdrop';

interface DropdownContentProps extends Omit<TippyProps, 'children'> {
    visible: boolean;
    hide: () => any;
    triggerRef: RefObject<Element>;
    backdrop?: boolean; // default: true
    children?: ReactNode;
}

export const DropdownContent = memo((props: DropdownContentProps) => {
    const {triggerRef, visible, hide, children, backdrop = true, ...res} = props;

    return (
        <>
            {backdrop && <DropdownBackdrop visible={visible} />}

            {visible && (
                <Tippy
                    placement="bottom"
                    visible={visible}
                    reference={triggerRef}
                    interactive={true}
                    interactiveBorder={30}
                    interactiveDebounce={100}
                    appendTo={() => document.body}
                    onClickOutside={hide}
                    render={(attrs, content, instance) => (
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            {...attrs}
                        >
                            {children}
                        </div>
                    )}
                    {...res}
                />
            )}
        </>
    );
});
DropdownContent.displayName = 'DropdownContent';
