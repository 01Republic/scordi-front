import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';

export const InvoiceAccountListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);

    if (!org) return <></>;

    return <>InvoiceAccountListTabContent</>;
});
