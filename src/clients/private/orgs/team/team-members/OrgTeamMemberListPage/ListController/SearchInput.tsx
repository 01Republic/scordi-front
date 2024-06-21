import React, {memo, useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {debounce} from 'lodash';

export const SearchInput = memo(function SearchInput() {
    const {search, query} = useTeamMembersInTeamMembersTable();
    const [val, setVal] = useState('');

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    return (
        <label
            className="block relative min-w-[200px]"
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    onSearch(val);
                    e.stopPropagation();
                    e.preventDefault();
                }
            }}
        >
            <input
                type="text"
                className="input input-bordered w-full pr-[40px]"
                placeholder="이름, 팀, 연락처 검색"
                defaultValue={val}
                onChange={(e) => {
                    setVal(e.target.value);
                    onSearch(e.target.value);
                }}
            />
            <FaSearch className="absolute my-auto top-0 bottom-0 right-3" onClick={() => onSearch(val)} />
        </label>
    );
});
