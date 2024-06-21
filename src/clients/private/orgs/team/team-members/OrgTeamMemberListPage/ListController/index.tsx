import React, {memo} from 'react';
import {InviteStatusScopeHandler} from './InviteStatusScopeHandler';
import {SearchInput} from './SearchInput';

export const ListController = memo(function ListController() {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <InviteStatusScopeHandler />
            </div>

            <div>
                <SearchInput />
            </div>
        </div>
    );
});
