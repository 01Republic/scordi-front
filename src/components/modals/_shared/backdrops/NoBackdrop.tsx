import React, {forwardRef} from 'react';
import {Dialog} from '@headlessui/react';

export const NoBackdrop = forwardRef<any>((props, ref) => {
    return <Dialog.Overlay ref={ref} className="fixed inset-0 bg-black/25 transition-opacity" />;
});
