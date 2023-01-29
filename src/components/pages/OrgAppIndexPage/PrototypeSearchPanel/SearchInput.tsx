import React, {memo, useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {getPrototypesParamsState} from '^atoms/applicationPrototypes.atom';
import {useForm} from 'react-hook-form';
import {FindAllAppPrototypeQuery} from '^types/applicationPrototype.type';

export const SearchInput = memo(() => {
    const setPrototypesParams = useSetRecoilState(getPrototypesParamsState);
    const form = useForm<FindAllAppPrototypeQuery>();

    const searchHandler = useCallback((data: FindAllAppPrototypeQuery) => {
        setPrototypesParams({name: data.name});
    }, []);

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
