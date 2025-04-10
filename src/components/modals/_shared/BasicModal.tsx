import React, {Fragment, memo, ReactNode} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ModalLayoutProps} from './Modal.types';

export interface BasicModalProps extends ModalLayoutProps {}

export const BasicModal = memo((props: BasicModalProps) => {
    const {name, children, open, onClose, backdrop} = props;
    const backdropOption = backdrop || {};
    backdropOption.opacity ??= 0.25;
    backdropOption.hidden ??= false;
    backdropOption.className ||= '';

    const modalName = `BasicModal/${name}`;

    return (
        <Dialog
            as="div"
            data-modal={modalName}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={onClose}
            open={open}
        >
            <div className="tablet:px-4 flex min-h-screen items-center justify-center">
                {!backdropOption.hidden && (
                    <Dialog.Overlay
                        className={`fixed inset-0 transition-opacity ${backdropOption.className}`}
                        style={{backgroundColor: `rgb(0 0 0 / ${backdropOption.opacity})`}}
                    />
                )}

                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                    &#8203;
                </span>
                {children}
            </div>
        </Dialog>
    );
});
