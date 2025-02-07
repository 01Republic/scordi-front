import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';

export const ScordiSubscriptionTabContent = memo(function ScordiSubscriptionTabContent() {
    const org = useRecoilValue(adminOrgDetail);
    return (
        <div>
            <div>ScordiSubscriptionTabContent</div>
        </div>
    );
});
