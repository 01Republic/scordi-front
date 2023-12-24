import {useState} from 'react';
import {usePopper} from 'react-popper';
import {Placement} from '@popperjs/core';

export function useDropdown(placement?: Placement) {
    const [selectEl, setSelectEl] = useState<HTMLElement | null>(null);
    const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);

    const {styles, attributes} = usePopper(referenceEl, selectEl, {
        placement: placement ?? 'bottom',
    });

    const blur = () => referenceEl?.blur();

    return {setSelectEl, setReferenceEl, blur, styles, attributes};
}
