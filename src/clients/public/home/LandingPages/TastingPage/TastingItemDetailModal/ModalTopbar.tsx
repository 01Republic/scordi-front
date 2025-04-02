import React, {memo} from 'react';
import {ChevronLeft} from 'lucide-react';

interface TastingItemDetailModalTopbarProps {
    backBtnOnClick: () => any;
}

export const ModalTopbar = memo((props: TastingItemDetailModalTopbarProps) => {
    const {backBtnOnClick} = props;

    return (
        <div className="flex container items-center justify-between sticky top-0 h-[50px] bg-white z-10">
            <div className="text-sm h-full flex items-center">
                <div className="px-4 h-full flex items-center cursor-pointer" onClick={backBtnOnClick}>
                    <ChevronLeft />
                </div>
            </div>
            <p className="h-full flex items-center font-bold text-16" />
            <div className="text-sm px-4 h-full flex items-center">
                <br />
            </div>
        </div>
    );
});
