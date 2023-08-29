import React, {memo, useEffect} from 'react';
import {AiFillCaretDown} from '^components/react-icons';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {getProductTags} from '^api/productTag.api';

type CategoryDto = {id: number; name: string};
export const categoriesState = atom<CategoryDto[]>({
    key: 'categories',
    default: [
        // {id: 1, name: '생산성'},
        // {id: 2, name: 'IT'},
        // {id: 3, name: '협업'},
        // {id: 4, name: '커뮤니케이션'},
        // {id: 5, name: 'HR'},
        // {id: 6, name: '개발'},
        // {id: 7, name: '디자인'},
        // {id: 8, name: '기획'},
    ],
});

export const selectedCategoriesState = atom<CategoryDto[]>({
    key: 'selectedCategories',
    default: [],
});

export const FilterCategorySelect = memo(() => {
    const [categories, setCategories] = useRecoilState(categoriesState);
    const [cateTags, setCateTags] = useRecoilState(selectedCategoriesState);

    useEffect(() => {
        getProductTags({}).then((res) => setCategories(res.data.items));
    }, []);

    return (
        <div>
            <div className="dropdown dropdown-hover">
                <label
                    tabIndex={0}
                    className="btn btn-sm btn-outline bg-white text-gray-400 border-gray-300 hover:bg-white hover:text-gray-500 hover:border-gray-400 capitalize font-normal flex-nowrap"
                >
                    <span className="mr-1.5 whitespace-nowrap">filter category</span>
                    <AiFillCaretDown className="w-3 h-3" />
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box">
                    {categories.map((category, i) => (
                        <li key={i}>
                            <label className="px-3 py-1.5 bg-white text-gray-500">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm checkbox-primary"
                                    onChange={() => {
                                        const included = cateTags.map((tag) => tag.id).includes(category.id);
                                        if (included) {
                                            setCateTags(cateTags.filter((tag) => tag.id !== category.id));
                                        } else {
                                            setCateTags([...cateTags, category]);
                                        }
                                    }}
                                    checked={!!cateTags.find((tag) => tag.id === category.id)}
                                />
                                <span className="whitespace-nowrap">{category.name}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});
