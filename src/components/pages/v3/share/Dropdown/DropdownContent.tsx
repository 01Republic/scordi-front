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

/**
 * DropdownContent - children을 받아서, 드롭다운 메뉴로 보여주는 컴포넌트
 * DropdownBackdrop - 드롭다운을 닫히게 하는 컴포넌트
 * Tippy - 드롭다운 메뉴를 구성하는 컴포넌트
 */
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
                    // render 프로퍼티 - 자신만의 tippy를 render하고 싶을 때 사용
                    render={(attrs, content, instance) => (
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                hide();
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
