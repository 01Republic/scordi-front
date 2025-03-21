import React, {memo} from 'react';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';
import {VendorManagerProfile} from '^models/vendor/VendorManager/components/VendorManagerProfile';
import {Check, ChevronRight} from 'lucide-react';

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
                <VendorManagerProfile item={vendorManager} avatarClass="w-8 h-8" />
            </div>
            <div className="flex items-center gap-2">
                <div>{selected && <Check className="text-green-400" />}</div>
                <div>
                    <ChevronRight className="text-gray-400 group-hover:text-black transition-all" size={10} />
                </div>
            </div>
        </div>
    );
});
VendorManagerItem.displayName = 'VendorManagerItem';
