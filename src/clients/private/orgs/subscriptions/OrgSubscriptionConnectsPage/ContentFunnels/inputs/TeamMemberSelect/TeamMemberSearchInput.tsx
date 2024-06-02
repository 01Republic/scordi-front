import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useTeamMemberListInCreateSubscription} from '^models/TeamMember';
import {FaSearch} from 'react-icons/fa';

export const TeamMemberSearchInput = memo(function TeamMemberSearchInput() {
    const {search} = useTeamMemberListInCreateSubscription();

    const searchMembers = debounce((keyword: string) => {
        search({keyword});
    }, 500);

    return (
        <div>
            <label className="relative">
                <div className="absolute bottom-0 left-0 w-6 h-[48px] z-[1] flex items-center justify-center">
                    <FaSearch className="text-gray-300" />
                </div>
                <input
                    className="input w-full input-underline pl-8"
                    onChange={(e) => {
                        searchMembers(e.target.value);
                    }}
                />
                <span />
            </label>
        </div>
    );
});
