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
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                data-modal={modalName}
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={onClose}
                // open={open}
            >
                <div className="tablet:px-4 flex min-h-screen items-center justify-center">
                    {!backdropOption.hidden && (
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className={`fixed inset-0 transition-opacity ${backdropOption.className}`}
                                style={{backgroundColor: `rgb(0 0 0 / ${backdropOption.opacity})`}}
                            />
                        </Transition.Child>
                    )}

                    <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {children}
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
});
