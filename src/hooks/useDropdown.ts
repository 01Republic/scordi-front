import {useRef, useState} from 'react';
import {usePopper} from 'react-popper';
import {Placement} from '@popperjs/core';
import {useId} from 'react-id-generator';

export function useDropdown(placement?: Placement) {
    // const [visible, setVisibility] = useState(false);
    const dropdownId = useId();
    const backdropRef = useRef<HTMLDivElement>(null);
    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
    const [contentRef, setContentRef] = useState<HTMLElement | null>(null);

    const {styles, attributes} = usePopper(triggerRef, contentRef, {
        placement: placement ?? 'bottom',
    });

    const openDropdown = () => {
        if (contentRef) contentRef.classList.add('focus');
        if (backdropRef.current) backdropRef.current.classList.add('focus');
    };

    const closeDropdown = () => {
        if (contentRef) contentRef.classList.remove('focus');
        if (backdropRef.current) backdropRef.current.classList.remove('focus');
    };

    return {
        dropdownId,
        // visible,
        setTriggerRef,
        setContentRef,
        backdropRef,
        openDropdown,
        closeDropdown,
        styles,
        attributes,
    };
}
