import React, {Fragment, memo, ReactNode} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ModalLayoutProps} from './Modal.types';

export interface AnimationLayoutProps extends ModalLayoutProps {
    allowScroll?: boolean;
}

export const AnimatedModal = memo((props: AnimationLayoutProps) => {
    const {name, children, open, onClose, backdrop, allowScroll = false} = props;
    const backdropOption = backdrop || {};
    backdropOption.opacity ??= 0.25;
    backdropOption.hidden ??= false;
    backdropOption.className ||= '';

    const modalName = `AnimatedModal/${name}`;

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" data-modal={modalName} className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
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

                    {allowScroll && <style dangerouslySetInnerHTML={{__html: `html { overflow: auto !important; }`}} />}

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        {children}
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
});
