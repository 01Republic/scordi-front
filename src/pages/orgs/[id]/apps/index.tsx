import React, {memo, useEffect, useState} from 'react';
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
import {Icon} from '^components/Icon';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {MobileSection} from '^components/v2/MobileSection';
import {TitleSection} from '^components/v2/TitleSection';
import {BasicButton} from '^components/v2/ui/buttons/BasicButton';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {useRecoilState} from 'recoil';
import {applicationsAtom} from '^atoms/applications.atom';
import {t_BillingCycleTerm} from '^types/applicationBillingCycle.type';
import Link from 'next/link';

export const OrgAppsIndexPageRoute: PageRoute = {
    pathname: '/orgs/[id]/apps',
    path: (orgId: number) => OrgAppsIndexPageRoute.pathname.replace('[id]', String(orgId)),
};

export default function OrgAppsIndexPage() {
    const router = useRouter();
    const organizationId = Number(router.query.id);

    return (
        <>
            <TitleSection.TopPadding />
            <TitleSection.Simple>
                <TitleSection.Title text={`서비스`} />
                <TitleSection.Button text="달력보기" href={OrgHomeRoute.path(organizationId)} />
            </TitleSection.Simple>

            <ApplicationList />

            <MobileBottomNav>
                <MobileBottomNav.Item href={AppSearchPageRoute.path(organizationId)} icon={<Icon.Plus />} />
            </MobileBottomNav>
        </>
    );
}

OrgAppsIndexPage.getLayout = getOrgMainLayout;

const ApplicationList = memo(() => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const [applications, setApplications] = useRecoilState(applicationsAtom);

    useEffect(() => {
        !!organizationId &&
            getApplications({where: {organizationId}, order: {id: 'DESC'}})
                .then(({data}) => {
                    setApplications(data.items);
                })
                .catch(errorNotify);
    }, [organizationId]);

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

const ApplicationListItem = memo((props: {applicationDto: ApplicationDto}) => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {applicationDto} = props;
    const {billingCycle, paymentPlan, prototype} = applicationDto;

    return (
        <div className="bs-col-12">
            <Link href={AppInfoPageRoute.path(`${organizationId}`, `${applicationDto.id}`)}>
                <div
                    id={`ApplicationListItem-${applicationDto.id}`}
                    className="flex justify-items-stretch px-3 py-3 mb-3 bg-[#F9FAFB] shadow-sm rounded-xl cursor-pointer"
                >
                    <div className="flex items-center px-1">
                        <img width={32} src={prototype.image} alt={`${prototype.name} logo image`} />
                    </div>
                    <div className="flex-1 px-3">
                        <p>
                            <b>{prototype.name}</b>
                        </p>
                        <p className="text-sm text-gray-500">
                            {paymentPlan.name} &middot; {t_BillingCycleTerm(billingCycle.term, true)}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="px-1 text-right">
                            <p className="flex items-center justify-end font-bold text-lg leading-none">
                                <small className="mr-[2px]">US$</small>
                                <span>{billingCycle.unitPrice || 0}</span>
                            </p>
                            {/*<p className="leading-none text-xs text-gray-500">*/}
                            {/*    명 / {t_BillingCycleTerm(billingCycle.term)}*/}
                            {/*</p>*/}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
});
