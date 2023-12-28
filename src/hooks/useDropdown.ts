import {useRef, useState} from 'react';
import {usePopper} from 'react-popper';
import {Placement} from '@popperjs/core';

export function useDropdown(placement?: Placement) {
    const [visible, setVisibility] = useState(false);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    const {styles, attributes} = usePopper(triggerRef.current, contentRef.current, {
        placement: placement ?? 'bottom',
    });

    const openDropdown = () => {
        setVisibility(true);
    };

    const closeDropdown = () => {
        setVisibility(false);
    };

    return {visible, triggerRef, contentRef, openDropdown, closeDropdown, styles, attributes};
}
