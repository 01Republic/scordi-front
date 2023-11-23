import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {ReportGroupedByProductItemDto} from '../../dto/view-types/group-by-product/report.grouped-by-product-item.dto';
import {useModal} from '^v3/share/modals/useModal';
import {
    reportItemModalIsShow,
    subjectReportProductItem,
} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/atom';
import {useSetRecoilState} from 'recoil';
import {ReportItemModal} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/ReportItemModal';
import {LinkTo} from '^components/util/LinkTo';

interface ProductItemListProps {
    items: ReportGroupedByProductItemDto[];
}

function sort(items: ReportGroupedByProductItemDto[]) {
    return [...items].sort((a, b) => {
        return b.members.length - a.members.length;
    });
}

export const ProductItemList = memo((props: ProductItemListProps) => {
    const {items} = props;
    const {open: openModal} = useModal({isShowAtom: reportItemModalIsShow});
    const setSubjectItem = useSetRecoilState(subjectReportProductItem);

    const onClickItem = (item: ReportGroupedByProductItemDto) => {
        setSubjectItem(item);
        openModal();
    };

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sort(items).map((item, i) => (
                <div
                    key={i}
                    onClick={() => onClickItem(item)}
                    className="card p-4 bg-base-100 shadow-md hover:shadow-lg flex flex-row gap-2 items-start cursor-pointer"
                >
                    <div>
                        <Avatar className="w-8" src={item.product?.image} />
                    </div>
                    <div className="flex-1 h-full flex flex-col items-end gap-2">
                        <p className="text-15 font-semibold text-right leading-none min-h-[30px]">{item.appName}</p>
                        <p className="mt-auto text-sm text-gray-500">{item.members.length}명</p>
                    </div>
                </div>
            ))}

            <LinkTo
                href="#"
                onClick={() => alert('서비스 등록 기능은 곧 도와드릴게요!')}
                className="card p-4 btn-scordi shadow-md hover:shadow-lg flex flex-row gap-2 items-start cursor-pointer"
            >
                혹시 우리가 쓰고 있는 <br /> 서비스가 더 있나요?
            </LinkTo>
        </div>
    );
});
ProductItemList.displayName = 'ProductItemList';
