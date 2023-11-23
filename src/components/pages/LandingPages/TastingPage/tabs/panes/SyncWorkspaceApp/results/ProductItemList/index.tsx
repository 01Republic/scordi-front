import {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {ReportGroupedByProductItemDto} from '../../dto/view-types/group-by-product/report.grouped-by-product-item.dto';

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

    const onClickItem = (item: ReportGroupedByProductItemDto) => {
        console.log(item);
    };

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
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
        </div>
    );
});
ProductItemList.displayName = 'ProductItemList';
