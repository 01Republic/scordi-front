import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {FindAllProductQuery} from '^models/Product/type';
import {useProductsV2} from '^models/Product/hook';
import {useCurrentUser} from '^models/User/hook';
import {debounce} from 'lodash';

export const SearchInput = memo(() => {
    const {currentUser} = useCurrentUser();
    const {search} = useProductsV2();
    const form = useForm<FindAllProductQuery>();
    const isLive = useMemo(() => !currentUser?.isAdmin, [currentUser]);

    const onChange = debounce((name?: string) => {
        search({name, isLive});
    });

    useEffect(() => {
        if (!currentUser) return;
        search({isLive});
    }, [currentUser, isLive]);

    return (
        <div className="py-0 z-10">
            <form>
                <input
                    autoComplete={'off'}
                    autoFocus={true}
                    type="text"
                    placeholder="Search Apps..."
                    className="input input-sm input-bordered w-full max-w-xs"
                    onChange={(e) => onChange(e.target.value)}
                />
            </form>
        </div>
    );
});
