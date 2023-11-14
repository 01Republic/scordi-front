import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {FindAllProductQuery} from '^models/Product/type';
import {useProductSearch} from '^models/Product/hook';
import {useCurrentUser} from '^hooks/useCurrentUser';

export const SearchInput = memo(() => {
    const {currentUser} = useCurrentUser();
    const {searchProducts} = useProductSearch();
    const form = useForm<FindAllProductQuery>();
    const isLive = useMemo(() => !currentUser?.isAdmin, [currentUser]);

    const searchHandler = useCallback(
        (data: FindAllProductQuery) => {
            searchProducts({name: data.name, isLive});
        },
        [isLive],
    );

    useEffect(() => {
        if (!currentUser) return;
        searchProducts({isLive});
    }, [currentUser, isLive]);

    return (
        <div className="py-0 z-10">
            <form onSubmit={form.handleSubmit(searchHandler)}>
                <input
                    autoComplete={'off'}
                    autoFocus={true}
                    type="text"
                    placeholder="Search Apps..."
                    className="input input-sm input-bordered w-full max-w-xs"
                    {...form.register('name')}
                />
            </form>
        </div>
    );
});
