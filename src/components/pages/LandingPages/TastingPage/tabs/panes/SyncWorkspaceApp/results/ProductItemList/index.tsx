import React, {memo, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {Avatar} from '^components/Avatar';
import {useModal} from '^v3/share/modals/useModal';
import {ReportGroupedByProductItemDto} from '../../dto/view-types/group-by-product/report.grouped-by-product-item.dto';
import {reportItemModalIsShow, subjectReportProductItem} from '../../atom';
import {isAddingModeState} from '../ReportItemModal/atom';
import {AddNewAppService} from './AddNewAppService';
import {FaQuestion} from 'react-icons/fa6';

interface ProductItemListProps {
    items: ReportGroupedByProductItemDto[];
}

function sort(items: ReportGroupedByProductItemDto[]) {
    return [...items].sort((a, b) => {
        const a1 = a.isNew ? 1 : 0;
        const b1 = b.isNew ? 1 : 0;
        if (b1 - a1 !== 0) return a1 - b1;
        return b.members.length - a.members.length;
    });
}

export const ProductItemList = memo((props: ProductItemListProps) => {
    const {items} = props;
    const {open: openModal} = useModal({isShowAtom: reportItemModalIsShow});
    const setIsNewMemberAddingMode = useSetRecoilState(isAddingModeState);
    const setSubjectItem = useSetRecoilState(subjectReportProductItem);

    useEffect(() => {
        if (!items || !items.length) return;
        setSubjectItem((oldSubject) => {
            if (!oldSubject) return oldSubject;

            const maybeUpdated = items.find((item) => item.key === oldSubject.key);
            if (!maybeUpdated) return oldSubject;
            if (oldSubject.members.length === maybeUpdated.members.length) return oldSubject;

            return plainToInstance(ReportGroupedByProductItemDto, {...maybeUpdated});
        });
    }, [items]);

    const onClickItem = (item: ReportGroupedByProductItemDto) => {
        setSubjectItem(item);
        setIsNewMemberAddingMode(false);
        openModal();
    };

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sort(items).map((item, i) => (
                <div
                    key={i}
                    onClick={() => onClickItem(item)}
                    className="card p-4 bg-base-100 shadow-md hover:shadow-lg flex flex-row gap-2 items-start cursor-pointer btn-animation"
                >
                    <div>
                        <Avatar className="w-8" src={item.product?.image}>
                            <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                        </Avatar>
                    </div>
                    <div className="flex-1 h-full flex flex-col items-end gap-2">
                        <p className="text-15 font-semibold text-right leading-none min-h-[30px]">{item.appName}</p>
                        <p className="mt-auto text-sm text-gray-500">{item.memberList.length}명</p>
                    </div>
                </div>
            ))}

            <AddNewAppService />
        </div>
    );
});
ProductItemList.displayName = 'ProductItemList';
