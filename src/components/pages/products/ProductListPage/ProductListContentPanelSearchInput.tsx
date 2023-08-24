import {memo} from 'react';
import {BsSearch} from 'react-icons/bs';
import {useForm} from 'react-hook-form';
import {usePrototypeSearch} from '^hooks/useApplicationPrototypes';

export const ProductListContentPanelSearchInput = memo(() => {
    const {search} = usePrototypeSearch();
    const form = useForm<{name?: string}>();
    const onSubmit = (query: {name?: string}) => search(query);

    return (
        <div className="relative flex-1 sm:flex-none">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input
                    type="text"
                    className="input input-bordered min-w-[300px] w-full pl-[48px]"
                    placeholder="Search ..."
                    {...form.register('name')}
                />
                <div className="absolute top-0 bottom-0 m-auto w-[48px] h-[48px] flex items-center justify-center text-gray-400">
                    <BsSearch />
                </div>
            </form>
        </div>
    );
});
