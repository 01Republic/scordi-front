import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {useApplication} from '^hooks/useApplications';
import {PreLoader} from '^components/PreLoader';
import {ApplicationPrototypeDto, safeImageSrc} from '^types/applicationPrototype.type';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {ImageV2} from '^components/v2/ui/Image';

export const NewAppCreatedPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/new/created',
    path: (orgId: number, applicationId: number) =>
        pathReplace(`${NewAppCreatedPageRoute.pathname}?applicationId=[applicationId]`, {
            id: orgId,
            applicationId,
        }),
});

export default function NewAppCreatedPage() {
    const router = useRouter();
    const applicationId = Number(router.query.applicationId) || null;
    const {data: application} = useApplication(applicationId);

    useEffect(() => {
        if (!application) return;

        setTimeout(() => {
            router.push(OrgAppsIndexPageRoute.path(application.organizationId));
        }, 1.5 * 1000);
    }, [application]);

    if (!application) return <PreLoader />;

    return (
        <div className="flex w-full h-full items-center justify-center pb-[100px]">
            <div>
                <div className="w-full flex justify-center">
                    <ImageV2
                        className="animate-bounce mb-10"
                        src={
                            application
                                ? safeImageSrc(application.prototype, 120, 120)
                                : 'https://placeimg.com/120/120/arch'
                        }
                        alt={`${application.prototype.name} logo`}
                        width={120}
                    />
                </div>
                <p className="font-bold text-center" style={{fontSize: '1.6rem'}}>
                    <em>
                        <span className="text-primary">{application?.prototype?.name || 'Slack'}</span> 등록 완료!
                    </em>
                </p>
            </div>
        </div>
    );
}

NewAppCreatedPage.getLayout = getOrgMainLayout;
