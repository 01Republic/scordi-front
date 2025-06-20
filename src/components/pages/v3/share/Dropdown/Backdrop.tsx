import Tippy from '@tippyjs/react/headless';
import {Modifier} from '@popperjs/core/lib/types';
import {RefObject} from 'react';

const clientRect = {
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

const applyStyles: Partial<Modifier<any, any>> = {
    name: 'applyStylesCustom',
    enabled: true,
    phase: 'write',
    fn({state}) {
        state.elements.popper.style.pointerEvents = '';
        state.elements.popper.style.width = '100vw';
        state.elements.popper.style.height = '100vh';
        state.elements.popper.style.maxWidth = '100vw';
        state.elements.popper.style.position = 'fixed';
        state.elements.popper.style.transform = '';
        state.elements.popper.style.top = '0';
        state.elements.popper.style.left = '0';
    },
};

interface DropdownBackdropProps {
    visible: boolean;
    hide: () => any;
    triggerRef: RefObject<Element>;
    allowScroll?: boolean; // default: false
}

export const DropdownBackdrop = (props: DropdownBackdropProps) => {
    const {visible, hide, triggerRef, allowScroll = false} = props;

    const scrollLock = () => {
        if (allowScroll) return;
        document.body.classList.add('modal-opened');
    };

    const scrollUnlock = () => {
        if (allowScroll) return;
        const [curr, backdrop2] = Array.from(document.querySelectorAll('[data-allow-scroll="true"]'));
        if (!backdrop2) document.body.classList.remove('modal-opened');
    };

    return (
        <Tippy
            visible={visible}
            reference={document.body}
            interactive={true}
            appendTo={() => document.body}
            placement="bottom-start"
            getReferenceClientRect={() => clientRect as ClientRect}
            popperOptions={{
                modifiers: [applyStyles],
                strategy: 'fixed',
            }}
            onShow={scrollLock}
            onHide={scrollUnlock}
            render={(attrs, content, instance) => (
                <div {...attrs}>
                    <style dangerouslySetInnerHTML={{__html: `body.modal-opened { overflow: visible !important; }`}} />
                    <div
                        className="dropdown-backdrop2"
                        data-allow-scroll={allowScroll}
                        style={{width: '100vw', height: '100vh'}}
                        onClick={(e) => {
                            hide();
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    />
                </div>
            )}
        />
    );
};
DropdownBackdrop.displayName = 'DropdownBackdrop';
