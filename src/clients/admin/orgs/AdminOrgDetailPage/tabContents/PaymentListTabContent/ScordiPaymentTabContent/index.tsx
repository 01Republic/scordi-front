import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';

export const ScordiPaymentTabContent = memo(function ScordiPaymentTabContent() {
    const org = useRecoilValue(adminOrgDetail);
    return (
        <div>
            <div>ScordiPaymentTabContent</div>
        </div>
    );
});
