import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';

export const AccountListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);

    if (!org) return <></>;

    return <>AccountListTabContent</>;
});
