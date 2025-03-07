import React, {memo} from 'react';
import {useTeamMemberListForMasterSelectInCreateSubscription} from '^models/TeamMember';
import {debounce} from 'lodash';
import {Search} from 'lucide-react';

export const MasterSearchInput = memo(function MasterSearchInput() {
    const {search} = useTeamMemberListForMasterSelectInCreateSubscription();

    const searchMembers = debounce((keyword: string) => {
        search({keyword});
    }, 500);

    return (
        <div>
            <label className="relative">
                <div className="absolute bottom-0 left-0 w-6 h-[48px] z-[1] flex items-center justify-center">
                    <Search className="text-gray-300" />
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
