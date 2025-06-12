import React, {memo} from 'react';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import SubscriptionTeamList from './SubscriptionTeamList';

export const SubscriptionTeam = memo(() => {
    return (
        <FormControl label="이용중인 팀">
            <div className="flex items-center gap-2 h-[50px] ">
                <SubscriptionTeamList />
            </div>
        </FormControl>
    );
});
