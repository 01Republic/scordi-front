import { useRecoilValue } from 'recoil';
import { orgIdParamState } from '^atoms/common';
import { OrgMainPageRoute } from '^pages/orgs/[id]';
import { LinkTo } from '^components/util/LinkTo';
import { BackButton } from '^components/BackButton';
import { FullLogoImg } from '../../home/OrgMainPage/LogoImg';
import { RotatingLogoCarousel } from './RotatingLogoCarousel';

export const OrgOnboardingCompletePage = () => {
    const orgId = useRecoilValue(orgIdParamState);

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
                        href={OrgMainPageRoute.path(orgId, { confetti: 'true' })}
                        className="btn btn-lg btn-scordi w-72"
                    >
                        완료
                    </LinkTo>
                </div>
            </div>
        </div>
    );
};
