import {memo} from 'react';
import {BsSearch} from 'react-icons/bs';
import {useProductPosts} from '^hooks/usePosts';

export const ProductPostListContentPanelSearchInput = memo(() => {
    const {search} = useProductPosts();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const query = input === '' ? {} : {keyword: input};
        search(query);
    };

    return (
        <div className="relative">
            <form>
                <input
                    type="text"
                    className="input input-bordered min-w-[300px] pl-[48px]"
                    placeholder="Search ..."
                    onChange={onChange}
                />
                <div className="absolute top-0 bottom-0 m-auto w-[48px] h-[48px] flex items-center justify-center text-gray-400">
                    <BsSearch />
                </div>
            </form>
        </div>
    );
});
