import React, {Fragment, memo} from 'react';
import {ModalLayoutProps} from '^components/modals/_shared/Modal.types';
import {WithChildren} from '^types/global.type';
import {Dialog, Transition} from '@headlessui/react';

interface SlideUpModalProps extends ModalLayoutProps {
    minHeight?: string;
    maxHeight?: string;
}

export const SlideUpModal = memo((props: SlideUpModalProps & WithChildren) => {
    const {
        children,
        open,
        onClose,
        backdrop,
        size = 'screen-sm',
        modalClassName = '',
        minHeight = '',
        maxHeight = '',
    } = props;

    const backdropOption = backdrop || {};
    backdropOption.opacity ??= 0.25;
    backdropOption.hidden ??= false;

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-hidden" onClose={onClose}>
                <div className="tablet:px-4 flex min-h-screen items-end justify-center">
                    {!backdropOption.hidden && (
                        <Transition.Child
                            as={Fragment}
                            enter="transition-all ease-in-out"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-all ease-in-out"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className={`fixed inset-0 transition-opacity`}
                                style={{backgroundColor: `rgb(0 0 0 / ${backdropOption.opacity})`}}
                            />
                        </Transition.Child>
                    )}

                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="bottom-[-100%]"
                        enterTo="bottom-0"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="bottom-0"
                        leaveTo="bottom-[-100%]"
                    >
                        <div
                            className={`fixed left-0 right-0 modal-box max-w-${size} mx-auto w-full max-h-full overflow-y-hidden scale-100 rounded-b-none ${minHeight} ${maxHeight} ${modalClassName}`}
                        >
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
});
SlideUpModal.displayName = 'SlideUpModal';
