import React, {memo} from 'react';
import {Path, useFormContext} from 'react-hook-form';
import {ProductSimilarNameConnectModalFormValues} from '^admin/products/AdminProductListPage/ProductSimilarNameConnectModal/type';

interface BlockFormProps {
    rowIndex: number;
    value: boolean | undefined;
}

export const BlockForm = memo((props: BlockFormProps) => {
    const {rowIndex, value} = props;
    const {register} = useFormContext<ProductSimilarNameConnectModalFormValues>();

    const fieldName = `mappings.${rowIndex}.data.isBlock` as Path<ProductSimilarNameConnectModalFormValues>;
    return (
        <div className="col-span-1 flex items-center justify-center">
            <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                defaultChecked={value}
                {...register(fieldName)}
            />
        </div>
    );
});
