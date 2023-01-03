import React, {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {ApplicationListItem} from '^components/pages/OrgAppIndexPage/ApplicationListItem';
import {useApplications} from '^hooks/useApplications';

export const ApplicationList = memo(() => {
    const {applications} = useApplications();

    return (
        <MobileSection>
            <div className="bs-row">
                {applications.map((app, i) => (
                    <ApplicationListItem applicationDto={app} key={i} />
                ))}
            </div>
        </MobileSection>
    );
});
