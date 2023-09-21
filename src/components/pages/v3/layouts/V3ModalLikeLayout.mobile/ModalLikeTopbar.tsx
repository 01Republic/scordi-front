import React, {memo} from 'react';
import {IoChevronBack} from '@react-icons/all-files/io5/IoChevronBack';

interface ModalLikeTopbarProps {
    backBtnOnClick: () => any;
    topbarPosition?: 'fixed' | 'sticky';
}

export const ModalLikeTopbar = memo((props: ModalLikeTopbarProps) => {
    const {backBtnOnClick, topbarPosition = 'fixed'} = props;

    return (
        <>
            <div
                className={`flex container items-center justify-between ${
                    topbarPosition === 'fixed' ? 'fixed' : 'sticky'
                } top-0 h-[50px] bg-white z-10`}
            >
                <div className="text-sm h-full flex items-center">
                    <div className="px-4 h-full flex items-center cursor-pointer" onClick={backBtnOnClick}>
                        <IoChevronBack />
                    </div>
                </div>
                <p className="h-full flex items-center font-bold text-16" />
                <div className="text-sm px-4 h-full flex items-center">
                    <br />
                </div>
            </div>
            {topbarPosition === 'fixed' && <div className="w-full h-[50px] bg-white" />}
        </>
    );
});
