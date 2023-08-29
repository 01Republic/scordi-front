import React, {memo} from 'react';
import {ProductDto, safeImageSrc} from '^types/product.type';
import {BasicButton2} from '^components/v2/ui/buttons/BasicButton2';
import Link from 'next/link';
import {SelectPlanPageRoute} from '^pages/orgs/[id]/apps/new/selectPlan';
import {useRouter} from 'next/router';

interface SearchResultItemProps {
    data: ProductDto;
}

export const SearchResultItem = memo((props: SearchResultItemProps) => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {data: proto} = props;

    return (
        <div className="bs-col-12">
            <Link href={SelectPlanPageRoute.path(organizationId, proto.id)}>
                <div className="btn btn-block btn-lg flex justify-items-stretch px-3 py-3 mb-3 bg-[#F9FAFB] shadow-sm rounded-xl cursor-pointer">
                    <div className="flex items-center px-2">
                        <img
                            width={38}
                            height={38}
                            className="mask mask-squircle"
                            src={safeImageSrc(proto, 38, 38)}
                            alt={`${proto.name} logo image`}
                        />
                    </div>
                    <div className="flex flex-1 items-center px-3">
                        <p className="leading-none text-left text-base font-semibold text-gray-500">{proto.name}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="px-2 text-right">
                            <BasicButton2 text="Add" size="sm" color="secondary" className="no-animation" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
});
