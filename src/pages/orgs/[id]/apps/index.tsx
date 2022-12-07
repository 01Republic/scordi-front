import React, {useEffect, useState} from 'react';
import {PageRoute} from '^types/pageRoute.type';
import {useRouter} from 'next/router';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {ApplicationDto} from '^types/application.type';
import {getApplications} from '^api/application.api';
import {errorNotify} from '^utils/toast-notify';
import {MobileTopNav, MobileViewContainer} from '^components/MobileTopNav';
import {AppIconButton} from '^components/AppIconButton';
import {AppInfoPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {DefaultButton} from '^components/Button';
import {AppSearchPageRoute} from '^pages/apps/search';
import {isMobile} from 'react-device-detect';

export const OrgAppsIndexPageRoute: PageRoute = {
    pathname: '/orgs/[id]/apps',
    path: (orgId: number) => OrgAppsIndexPageRoute.pathname.replace('[id]', String(orgId)),
};

function OrgAppsIndexPage() {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const [apps, setApps] = useState<ApplicationDto[]>([]);

    useEffect(() => {
        !!organizationId &&
            getApplications({where: {organizationId}, order: {id: 'DESC'}})
                .then(({data}) => {
                    setApps(data.items);
                })
                .catch(errorNotify);
    }, [organizationId]);

    return (
        <>
            {!isMobile && (
                <div className={'float-right p-5'}>
                    <DefaultButton
                        text={'서비스 연동하기'}
                        onClick={() => router.push(AppSearchPageRoute.path(organizationId))}
                    />
                </div>
            )}
            <MobileTopNav title={'연동한 서비스'} />
            <div className={'p-5'}>
                {apps.length <= 0 ? (
                    <MobileViewContainer>
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <img
                                className="w-[50%] lg:w-[30%] min-w-[200px]"
                                src="/images/illustration/big-isolated-employee-working-office-workplace-flat-illustration/Mar-Business_1-800px.png"
                                alt="Result not found."
                            />
                            <div className="pb-10">
                                <p className="text-gray-500 text-16">사용하고 있는 서비스를 연동해보세요 :)</p>
                            </div>
                            <DefaultButton
                                text={'서비스 연동하기'}
                                onClick={() => router.push(AppSearchPageRoute.path(organizationId))}
                            />
                        </div>
                    </MobileViewContainer>
                ) : (
                    <div>
                        {apps.map((app) => (
                            <AppIconButton
                                name={app.prototype.name}
                                icon={app.prototype.image}
                                onClick={() =>
                                    router.push(AppInfoPageRoute.path(organizationId.toString(), app.id.toString()))
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

OrgAppsIndexPage.getLayout = getOrgMainLayout;

export default OrgAppsIndexPage;
