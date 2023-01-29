import React, {memo, useEffect} from 'react';
import {useApplicationsWithParams} from '^hooks/useApplications';
import {ContentPanelBody, ContentTable} from '^layouts/ContentLayout';
import {ApplicationListItemDesktop} from '^components/pages/OrgAppIndexPage/ApplicationListItem.desktop';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRecoilState} from 'recoil';
import {applicationsState} from '^atoms/applications.atom';

export const ApplicationListDesktop = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const apps = useApplicationsWithParams({
        where: {organizationId},
        order: {id: 'DESC'},
        itemsPerPage: 300,
    });
    const [applications, setApplications] = useRecoilState(applicationsState);

    useEffect(() => {
        if (!apps) return;

        const o_ids = applications.map((app) => app.id);
        const n_ids = apps.items.map((app) => app.id);
        if (JSON.stringify(o_ids) === JSON.stringify(n_ids)) return;
        setApplications(apps.items);
    }, [apps?.pagination?.currentPage]);

    if (!apps) return <></>;

    return (
        <>
            {/*<ContentPanelHeading title="구독 리스트">*/}
            {/*    <ContentHeadingPrimaryButton*/}
            {/*        className="btn-sm"*/}
            {/*        onClick={() => router.push(OrgApplicationSelectPageRoute.path(organizationId))}*/}
            {/*    >*/}
            {/*        구독 추가하기*/}
            {/*    </ContentHeadingPrimaryButton>*/}
            {/*</ContentPanelHeading>*/}
            <ContentPanelBody>
                <ContentTable
                    thead={
                        <tr>
                            <th>App</th>
                            <th>Plan</th>
                            <th>Cycle</th>
                            {/*<th className="text-right">unit price</th>*/}
                            <th className="text-right">Next date</th>
                            <th className="text-right">spend</th>
                            <th></th>
                        </tr>
                    }
                >
                    {applications.map((app, i) => (
                        <ApplicationListItemDesktop applicationDto={app} key={i} />
                    ))}
                </ContentTable>
            </ContentPanelBody>
        </>
    );
});
