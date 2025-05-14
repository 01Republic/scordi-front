import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';

interface AssetSelectorGridProps extends WithChildren {
    title: string;
    isAllSelected?: boolean;
    onSelectAll?: () => any;
}

export const AssetSelectorGrid = memo((props: AssetSelectorGridProps) => {
    const {title, isAllSelected = false, onSelectAll, children} = props;

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>

                {onSelectAll && <AllSelectInstitutionOptions isAllSelected={isAllSelected} onClick={onSelectAll} />}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {children}
            </div>
        </section>
    );
});
AssetSelectorGrid.displayName = 'AssetSelectorGrid';
