import React, {memo, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {FaQuestion} from 'react-icons/fa6';
import {BsFillXCircleFill} from 'react-icons/bs';
import {useModal} from '^v3/share/modals/useModal';
import {useOnResize2} from '^components/util/onResize2';
import {Avatar} from '^components/Avatar';
import {ReportGroupedByProductItemDto} from '../../dto/view-types/group-by-product/report.grouped-by-product-item.dto';
import {reportItemModalIsShow, subjectReportProductItem, useReportInDemo} from '../../atom';
import {isAddingModeState} from '../ReportItemModal/atom';

interface ProductItemProps {
    item: ReportGroupedByProductItemDto;
}

export const ProductItem = memo((props: ProductItemProps) => {
    const {item} = props;
    const {open: openModal} = useModal({isShowAtom: reportItemModalIsShow});
    const setIsNewMemberAddingMode = useSetRecoilState(isAddingModeState);
    const setSubjectItem = useSetRecoilState(subjectReportProductItem);
    const {productHandler} = useReportInDemo();
    const [isHovered, setIsHovered] = useState(false);
    const {isMobile} = useOnResize2();

    const onClickItem = () => {
        setSubjectItem(item);
        setIsNewMemberAddingMode(false);
        openModal();
    };

    const removeProduct = () => {
        if (!confirm('진짜 이 서비스를 제외할까요?\n\n되돌리려면 새로고침 후\n처음부터 다시 연동해야 해요')) return;
        productHandler.remove(item);
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClickItem()}
            className="card p-4 bg-base-100 shadow-md hover:shadow-lg flex flex-row gap-2 items-start cursor-pointer relative"
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

            {(isMobile || isHovered) && (
                <div className="absolute top-[-3px] right-[-3px]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeProduct();
                        }}
                        className="relative top-[-2px] rounded-full text-red-500 hover:outline outline-offset-2 transition-all"
                    >
                        <BsFillXCircleFill className="" size={16} />
                    </button>
                </div>
            )}
        </div>
    );
});
ProductItem.displayName = 'ProductItem';
