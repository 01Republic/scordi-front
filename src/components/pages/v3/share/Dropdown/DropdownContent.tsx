import {memo, ReactNode, RefObject} from 'react';
import Tippy, {TippyProps} from '@tippyjs/react/headless';
import {Placement} from '@popperjs/core';
import {DropdownBackdrop} from './Backdrop';

interface DropdownContentProps extends Omit<TippyProps, 'children'> {
    visible: boolean;
    hide: () => any;
    triggerRef: RefObject<Element>;
    backdrop?: boolean; // default: true
    allowScroll?: boolean; // default: false
    placement?: Placement;
    children?: ReactNode;
}

export const DropdownContent = memo((props: DropdownContentProps) => {
    const {
        triggerRef,
        visible,
        hide,
        children,
        backdrop = true,
        allowScroll = false,
        placement = 'bottom-end',
        ...res
    } = props;

    return (
        <>
            {backdrop && (
                <DropdownBackdrop
                    visible={visible}
                    hide={() => hide()}
                    triggerRef={triggerRef}
                    allowScroll={allowScroll}
                />
            )}

            {visible && (
                <Tippy
                    placement={placement}
                    visible={visible}
                    reference={triggerRef}
                    interactive={true}
                    interactiveBorder={30}
                    interactiveDebounce={100}
                    appendTo={() => document.body}
                    onClickOutside={(instance, event) => {
                        // backdrop 을 사용한다면, hide() 기능은 backdrop 으로 실행을 위임합니다.
                        if (backdrop) return;
                        hide();
                    }}
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
