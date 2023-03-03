import React, {memo, useCallback, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {usePrototypeSearch} from '^hooks/useApplicationPrototypes';
import {selectedCategoriesState} from './FilterCategorySelect';
import {AiOutlineCloseCircle, AiOutlineTags} from 'react-icons/ai';

export const SelectedCategoryTags = memo(() => {
    const [cateTags, setCateTags] = useRecoilState(selectedCategoriesState);
    const {searchPrototypes} = usePrototypeSearch();

    useEffect(() => {
        const tagIds = cateTags.map((cateTag) => cateTag.id);
        searchPrototypes({tagIds: tagIds});
    }, [cateTags]);

    const removeTag = useCallback(
        (tagId: number) => {
            const tags = cateTags.filter((tag) => tag.id !== tagId);
            const tagIds = tags.map((cateTag) => cateTag.id);
            setCateTags(tags);
            searchPrototypes({tagIds: tagIds});
        },
        [cateTags],
    );

    return (
        <div className="flex items-center gap-1 flex-wrap">
            {cateTags.map((tag, i) => (
                <button
                    key={i}
                    type="button"
                    className="badge text-gray-500 border-gray-300 text-xs hover:text-gray-800 whitespace-nowrap cursor-pointer flex gap-1"
                    onClick={() => removeTag(tag.id)}
                >
                    <span>{tag.name}</span>
                    <AiOutlineCloseCircle />
                </button>
            ))}
        </div>
    );
});
