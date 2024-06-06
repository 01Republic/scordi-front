import React, {memo} from 'react';
import {VendorManagerDto} from '^models/VendorManager/type';
import {FaCheck, FaChevronRight} from 'react-icons/fa6';

interface VendorManagerItemProps {
    vendorManager: VendorManagerDto;
    onClick: () => any;
    selected?: boolean;
}

export const VendorManagerItem = memo((props: VendorManagerItemProps) => {
    const {vendorManager, onClick, selected = false} = props;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-3 rounded-btn cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={onClick}
        >
            <div className="flex-auto">
                <p className="text-14">{vendorManager.name}</p>
            </div>
            <div className="flex items-center gap-2">
                <div>{selected && <FaCheck className="text-green-400" />}</div>
                <div>
                    <FaChevronRight className="text-gray-400 group-hover:text-black transition-all" size={10} />
                </div>
            </div>
        </div>
    );
});
VendorManagerItem.displayName = 'VendorManagerItem';
