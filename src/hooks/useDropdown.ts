import {useState} from 'react';
import {usePopper} from 'react-popper';
import {Placement} from '@popperjs/core';

export function useDropdown(placement?: Placement) {
    const [selectEl, setSelectEl] = useState<HTMLUListElement | null>(null);
    const [referenceEl, setReferenceEl] = useState<HTMLDivElement | null>(null);

    const {styles, attributes} = usePopper(referenceEl, selectEl, {
        placement: placement ?? 'bottom',
    });

    return {setSelectEl, setReferenceEl, styles, attributes};
}
