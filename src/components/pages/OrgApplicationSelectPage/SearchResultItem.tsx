import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {ProductDto, safeImageSrc} from '^models/Product/type';
import {SelectPlanPageRoute} from '^pages/orgs/[id]/apps/new/selectPlan';
import {LinkTo} from '^components/util/LinkTo';
import {BasicButton2} from '^components/v2/ui/buttons/BasicButton2';

interface SearchResultItemProps {
    data: ProductDto;
}

export const SearchResultItem = memo((props: SearchResultItemProps) => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {data: proto} = props;

    return (
        <div className="bs-col-12">
            <LinkTo href={SelectPlanPageRoute.path(organizationId, proto.id)}>
                <div className="btn btn-block btn-lg flex justify-items-stretch px-3 py-3 mb-3 bg-[#F9FAFB] shadow-sm rounded-xl cursor-pointer">
                    <div className="flex items-center px-2">
                        <img
                            width={38}
                            height={38}
                            className="mask mask-squircle"
                            src={safeImageSrc(proto, 38, 38)}
                            alt={`${proto.nameEn} logo image`}
                        />
                    </div>
                    <div className="flex flex-1 items-center px-3">
                        <p className="leading-none text-left text-base font-semibold text-gray-500">{proto.nameEn}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="px-2 text-right">
                            <BasicButton2 text="Add" size="sm" color="secondary" className="no-animation" />
                        </div>
                    </div>
                </div>
            </LinkTo>
        </div>
    );
});
