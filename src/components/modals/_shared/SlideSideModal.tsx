import React, {Fragment, memo} from 'react';
import {ModalLayoutProps} from '^components/modals/_shared/Modal.types';
import {WithChildren} from '^types/global.type';
import {Dialog, Transition} from '@headlessui/react';
import {eventCut} from '^utils/event';

interface SlideSideModalProps extends ModalLayoutProps {
    minHeight?: string;
    maxHeight?: string;
}

export const SlideSideModal = memo((props: SlideSideModalProps & WithChildren) => {
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
                <div className="tablet:px-4 flex min-h-screen items-stretch justify-end">
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
                                data-component="SlideSideModal/Backdrop"
                                className={`fixed inset-0 transition-opacity z-50`}
                                style={{backgroundColor: `rgb(0 0 0 / ${backdropOption.opacity})`}}
                            />
                        </Transition.Child>
                    )}

                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="right-[-100%]"
                        enterTo="right-0"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="right-0"
                        leaveTo="right-[-100%]"
                    >
                        <div
                            data-component="SlideUpModal/ModalBox"
                            className={`fixed top-0 bottom-0 modal-box z-50 max-w-${size} mx-auto w-full max-h-full overflow-y-hidden scale-100 rounded-b-none rounded-tr-none ${minHeight} ${maxHeight} ${modalClassName}`}
                        >
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
});
