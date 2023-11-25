import React, {memo, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {ReportGroupedByProductItemDto} from '../../dto/view-types/group-by-product/report.grouped-by-product-item.dto';
import {subjectReportProductItem} from '../../atom';
import {AddNewAppService} from './AddNewAppService';
import {ProductItem} from './ProductItem';

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
    const setSubjectItem = useSetRecoilState(subjectReportProductItem);

    useEffect(() => {
        if (!items || !items.length) return;
        setSubjectItem((oldSubject) => {
            if (!oldSubject) return oldSubject;

            const maybeUpdated = items.find((item) => item.key === oldSubject.key);
            if (!maybeUpdated) return oldSubject;

            return plainToInstance(ReportGroupedByProductItemDto, {...maybeUpdated});
        });
    }, [items]);

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sort(items).map((item, i) => (
                <ProductItem item={item} key={i} />
            ))}

            <AddNewAppService />
        </div>
    );
});
ProductItemList.displayName = 'ProductItemList';
