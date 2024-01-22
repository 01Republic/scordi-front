import {ReactComponentLike, ReactNodeLike} from 'prop-types';
import React, {memo} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {useId} from 'react-id-generator';
import {WithChildren} from '^types/global.type';

interface ModalTopbarProps {
    backBtnOnClick: () => any;
    title?: ReactNodeLike;
    topbarPosition?: 'fixed' | 'sticky';
    rightButtons?: ReactComponentLike[];
}

export const ModalTopbar = memo((props: ModalTopbarProps & WithChildren) => {
    const {title, backBtnOnClick, topbarPosition = 'fixed', rightButtons = [], children} = props;
    const mappedButtons = rightButtons.length ? rightButtons.map((RightButton, i) => <RightButton key={i} />) : <br />;

    return (
        <>
            <div
                data-component="ModalTopbar"
                className={`flex container items-center justify-between no-selectable ${
                    topbarPosition === 'fixed' ? 'fixed' : 'sticky'
                } top-0 h-[50px] min-h-[50px] bg-white z-10`}
            >
                <div className="text-sm h-full flex items-center">
                    <div
                        data-component="CloseModalButton"
                        className="px-5 h-full flex items-center cursor-pointer"
                        onClick={backBtnOnClick}
                    >
                        <FiArrowLeft size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <div className="h-full max-w-full flex-1 flex items-center font-semibold text-16 overflow-x-hidden">
                    <span className="truncate">{children || title}</span>
                </div>
                <div className={`text-sm ${rightButtons.length ? 'pl-6 pr-3' : 'px-6'} h-full flex items-center`}>
                    {mappedButtons}
                </div>
            </div>
            {topbarPosition === 'fixed' && <div className="w-full h-[50px] bg-white" />}
        </>
    );
});
