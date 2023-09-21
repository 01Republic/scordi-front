import React, {memo} from 'react';
import {IoChevronBack} from '@react-icons/all-files/io5/IoChevronBack';
import {FiArrowLeft} from 'react-icons/fi';
import {ReactNodeLike} from 'prop-types';

interface ModalLikeTopbarProps {
    backBtnOnClick: () => any;
    title?: ReactNodeLike;
    topbarPosition?: 'fixed' | 'sticky';
}

export const ModalLikeTopbar = memo((props: ModalLikeTopbarProps) => {
    const {title, backBtnOnClick, topbarPosition = 'fixed'} = props;

    return (
        <>
            <div
                className={`flex container items-center justify-between ${
                    topbarPosition === 'fixed' ? 'fixed' : 'sticky'
                } top-0 h-[50px] bg-white z-10`}
            >
                <div className="text-sm h-full flex items-center">
                    <div className="px-6 h-full flex items-center cursor-pointer" onClick={backBtnOnClick}>
                        <FiArrowLeft size={20} strokeWidth={2.5} />
                    </div>
                </div>
                <div className="h-full flex-1 flex items-center font-semibold text-16">{title}</div>
                <div className="text-sm px-6 h-full flex items-center">
                    <br />
                </div>
            </div>
            {topbarPosition === 'fixed' && <div className="w-full h-[50px] bg-white" />}
        </>
    );
});
