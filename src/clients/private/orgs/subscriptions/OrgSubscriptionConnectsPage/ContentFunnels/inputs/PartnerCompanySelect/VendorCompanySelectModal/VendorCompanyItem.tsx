import React, {memo} from 'react';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {Check, ChevronRight} from 'lucide-react';

interface VendorCompanyItemProps {
    vendorCompany: VendorCompanyDto;
    onClick: () => any;
    selected?: boolean;
}

export const VendorCompanyItem = memo((props: VendorCompanyItemProps) => {
    const {vendorCompany, onClick, selected = false} = props;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-3 rounded-btn cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={onClick}
        >
            <div className="flex-auto">
                <p className="text-14">{vendorCompany.name}</p>
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
VendorCompanyItem.displayName = 'VendorCompanyItem';
