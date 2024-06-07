import {memo, useEffect} from 'react';
import {useTeamMemberListForMasterSelectInCreateSubscription} from '^models/TeamMember';
import {MasterSearchInput} from './MasterSearchInput';
import {MasterSelectableSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/MasterSelect/MasterSelectableSection';

export const MasterSelect = memo(function MasterSelect() {
    const {reload} = useTeamMemberListForMasterSelectInCreateSubscription();

    useEffect(() => {
        reload();
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <MasterSearchInput />

                    <div className="flex items-center justify-start"></div>
                </div>

                <MasterSelectableSection />
            </div>
        </div>
    );
});
