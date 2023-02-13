import React, {memo} from 'react';
import {ContentPanel} from '^layouts/ContentLayout';
import {SearchInput} from './SearchInput';
import {FilterCategorySelect} from './FilterCategorySelect';
import {SelectedCategoryTags} from './SelectedCategoryTags';
import {SearchResultTable} from './SearchResultTable';
import {PrototypeEditModal} from '^components/pages/OrgAppIndexPage/modals/PrototypeEditModal';
import {PrototypeCreateModal} from '^components/pages/OrgAppIndexPage/modals/PrototypeCreateModal';

export const PrototypeSearchPanel = memo(() => {
    return (
        <>
            <ContentPanel>
                <div className="flex gap-3">
                    <SearchInput />
                    <FilterCategorySelect />
                    <SelectedCategoryTags />
                </div>

                <SearchResultTable />
            </ContentPanel>
            <PrototypeCreateModal />
            <PrototypeEditModal />
        </>
    );
});
