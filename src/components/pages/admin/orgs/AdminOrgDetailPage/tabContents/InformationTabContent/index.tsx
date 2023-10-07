import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';

export const InformationTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);

    if (!org) return <></>;

    return <>InformationTabContent</>;
});
