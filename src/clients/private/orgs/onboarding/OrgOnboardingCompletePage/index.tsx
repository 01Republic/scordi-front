import {useOrgIdParam} from '^atoms/common';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {LinkTo} from '^components/util/LinkTo';
import {BackButton} from '^components/BackButton';
import {FullLogoImg} from '../../home/OrgMainPage/LogoImg';
import {RotatingLogoCarousel} from './RotatingLogoCarousel';
import {useQuery} from '@tanstack/react-query';
import {organizationApi} from '^models/Organization/api';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useCurrentOrg} from '^models/Organization/hook';

export const OrgOnboardingCompletePage = () => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {currentOrg, reload} = useCurrentOrg(orgId);
    const redirectPath = OrgMainPageRoute.path(orgId, {confetti: 'true'});

    const {data: updatedOrg, isFetching} = useQuery({
        queryKey: ['OrgOnboardingCompletePage.OrgUpdate', currentOrg?.id],
        queryFn: () => organizationApi.update(orgId, {onboardingFinishedAt: new Date()}).then((res) => res.data),
        initialData: null,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!currentOrg && !currentOrg.onboardingFinishedAt,
    });

    useEffect(() => {
        if (!currentOrg) return;
        if (updatedOrg) return;
        if (currentOrg.onboardingFinishedAt) {
            confirm('이미 온보딩을 모두 진행하셨습니다!');
            router.push(redirectPath);
        }
    }, [currentOrg, updatedOrg]);

    useEffect(() => {
        if (updatedOrg && updatedOrg.onboardingFinishedAt) {
            reload();
        }
    }, [updatedOrg]);

    const isReady = !isFetching && !!currentOrg?.onboardingFinishedAt;

    return (
        <div className="container mx-auto px-4 py-16 h-lvh">
            <BackButton />
            <div className="flex flex-col items-center justify-center">
                <div className="pt-20 pb-10">
                    <FullLogoImg />
                </div>
                <div className="bg-scordi w-full h-1"></div>
                <div className="py-12 bg-scordi-50 w-full flex flex-col items-center justify-center">
                    <p className="mb-6 text-24 font-medium">SaaS 관리를 위한 모든 준비가 끝났어요</p>
                    <p className="text-16">누가 어떤 구독서비스를 쓰고 있는지 확인해보세요</p>
                    <div className="py-16 w-full">
                        <RotatingLogoCarousel />
                    </div>
                    <LinkTo
                        href={redirectPath}
                        className={`btn btn-lg btn-scordi btn-wide ${isReady ? '' : 'loading'}`}
                        displayLoading={false}
                    >
                        완료
                    </LinkTo>
                </div>
            </div>
        </div>
    );
};
