import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {usePrototypeSearch} from '^hooks/useApplicationPrototypes';
import {selectedCategoriesState} from './FilterCategorySelect';

export const SelectedCategoryTags = memo(() => {
    const cateTags = useRecoilValue(selectedCategoriesState);
    const {searchPrototypes} = usePrototypeSearch();

    useEffect(() => {
        const tagIds = cateTags.map((cateTag) => cateTag.id);
        searchPrototypes({tagIds: tagIds});
    }, [cateTags]);

    return (
        <div className="flex items-center gap-1 flex-wrap">
            {cateTags.map((tag, i) => (
                <span key={i} className="badge text-gray-500 border-gray-300 whitespace-nowrap">
                    #{tag.name}
                </span>
            ))}
        </div>
    );
});
