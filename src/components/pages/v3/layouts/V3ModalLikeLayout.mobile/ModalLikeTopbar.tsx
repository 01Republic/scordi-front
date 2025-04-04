import React, {memo} from 'react';
import {ReactComponentLike} from 'prop-types';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {ArrowLeft} from 'lucide-react';

interface ModalLikeTopbarProps {
    backBtnOnClick: () => any;
    title?: ReactNodeElement;
    topbarPosition?: 'fixed' | 'sticky';
    rightButtons?: ReactComponentLike[];
}

export const ModalLikeTopbar = memo((props: ModalLikeTopbarProps & WithChildren) => {
    const {title, backBtnOnClick, topbarPosition = 'fixed', rightButtons = [], children} = props;
    const mappedButtons = rightButtons.length ? rightButtons.map((RightButton, i) => <RightButton key={i} />) : <br />;

    return (
        <>
            <div
                data-component="ModalLikeTopbar"
                className={`flex container-fluid items-center justify-between no-selectable ${
                    topbarPosition === 'fixed' ? 'fixed w-full' : 'sticky'
                } top-0 h-[50px] min-h-[50px] bg-white z-10`}
            >
                <div className="text-sm h-full flex items-center">
                    <div
                        data-component="CloseModalButton"
                        className="px-5 h-full flex items-center cursor-pointer"
                        onClick={backBtnOnClick}
                    >
                        <ArrowLeft size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <div className="h-full flex-1 flex items-center font-semibold text-16">{children || title}</div>
                <div className={`text-sm ${rightButtons.length ? 'pl-6 pr-3' : 'px-6'} h-full flex items-center`}>
                    {mappedButtons}
                </div>
            </div>
            {topbarPosition === 'fixed' && (
                <div data-component="ModalLikeTopbarBackdrop" className="w-full h-[50px] bg-white" />
            )}
        </>
    );
});
