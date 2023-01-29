import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {selectedCategoriesState} from './FilterCategorySelect';

export const SelectedCategoryTags = memo(() => {
    const cateTags = useRecoilValue(selectedCategoriesState);

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
