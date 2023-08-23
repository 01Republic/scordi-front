import {memo} from 'react';
import {BsSearch} from 'react-icons/bs';
import {useProductPosts} from '^hooks/usePosts';
import {useForm} from 'react-hook-form';

export const ProductPostListContentPanelSearchInput = memo(() => {
    const {search} = useProductPosts();
    const form = useForm<{keyword?: string}>();
    const onSubmit = (query: {keyword?: string}) => search(query);

    return (
        <div className="relative flex-1 sm:flex-none">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input
                    type="text"
                    className="input input-bordered min-w-[300px] w-full pl-[48px]"
                    placeholder="Search ..."
                    {...form.register('keyword')}
                />
                <div className="absolute top-0 bottom-0 m-auto w-[48px] h-[48px] flex items-center justify-center text-gray-400">
                    <BsSearch />
                </div>
            </form>
        </div>
    );
});
