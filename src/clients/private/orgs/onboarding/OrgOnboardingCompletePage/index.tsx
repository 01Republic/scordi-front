import {orgIdParamState} from '^atoms/common';
import {BackButton} from '^components/BackButton';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {FullLogoImg} from '../../home/OrgMainPage/LogoImg';
import {RotatingLogoCarousel} from './RotatingLogoCarousel';

export const OrgOnboardingCompletePage = () => {
    const router = useRouter();
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
                    <Button
                        size="xl"
                        variant="scordi"
                        onClick={() => router.push(OrgMainPageRoute.path(orgId, {confetti: 'true'}))}
                        className="w-[280px]"
                    >
                        완료
                    </Button>
                </div>
            </div>
        </div>
    );
};
