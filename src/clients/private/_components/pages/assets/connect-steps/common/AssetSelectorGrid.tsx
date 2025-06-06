import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';

interface AssetSelectorGridProps extends WithChildren {
    title: ReactNode;
    isAllSelected?: boolean;
    onSelectAll?: () => any;
    isLoading?: boolean;
}

export const AssetSelectorGrid = memo((props: AssetSelectorGridProps) => {
    const {title, isAllSelected = false, onSelectAll, isLoading = false, children} = props;

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>

                {onSelectAll && <AllSelectInstitutionOptions isAllSelected={isAllSelected} onClick={onSelectAll} />}
            </div>

            <div
                className={`${
                    isLoading ? 'opacity-30 pointer-events-none' : ''
                } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4`}
            >
                {children}
            </div>
        </section>
    );
});
AssetSelectorGrid.displayName = 'AssetSelectorGrid';
