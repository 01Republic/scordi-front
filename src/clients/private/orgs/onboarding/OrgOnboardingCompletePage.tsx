import {orgIdParamState} from '^atoms/common';
import {BackButton} from '^components/BackButton';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {FullLogoImg} from '../home/OrgMainPage/LogoImg';

const AppLogos = () => {
    const logos = [
        {src: '/images/logo/external/figma.png', alt: 'Figma'},
        {src: '/images/logo/external/notion.png', alt: 'Notion'},
        {src: '/images/logo/external/slack.png', alt: 'Slack'},
        {src: '/images/logo/external/adobe.png', alt: 'Adobe'},
        {src: '/images/logo/external/github.png', alt: 'Github'},
        {src: '/images/logo/external/zoom.png', alt: 'Zoom'},
    ];

    return (
        <div className="w-full overflow-hidden">
            <div className="flex animate-slide">
                <div className="w-[290px] h-[290px] rounded-full overflow-hidden bg-scordi-100 flex items-center justify-center">
                    <div className="w-[220px] h-[220px] rounded-full overflow-hidden bg-scordi-300 flex items-center justify-center">
                        <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-scordi-500 flex items-center justify-center">
                            <img
                                src="/images/renewallogo/scordi-symbol-logo.png"
                                alt="Scordi Logo"
                                className="w-[60px] h-[60px] brightness-0 invert"
                            />
                        </div>
                    </div>
                </div>
                {/* TODO: 로고 이미지 흐르는 애니메이션 어떻게 하라는건지 확실히 물어보기 */}
                {/* {[...logos].map((logo, i) => (
                    <div key={i} className="px-10">
                        <Image src={logo.src} alt={logo.alt} width={48} height={48} className="rounded-lg" />
                    </div>
                ))} */}
            </div>
        </div>
    );
};

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
                    <div className="py-16">
                        <AppLogos />
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
