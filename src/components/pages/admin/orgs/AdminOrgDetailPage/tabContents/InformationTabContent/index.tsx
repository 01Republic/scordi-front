import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {ContentPanel, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout';
import {OrganizationDeletePanel} from '^admin/orgs/AdminOrgDetailPage/tabContents/InformationTabContent/OrganizationDeletePanel';

export const InformationTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);

    if (!org) return <></>;

    return (
        <>
            <OrganizationDeletePanel organization={org} />
        </>
    );
});
