import {NextPage} from 'next';
import {useEffect} from 'react';
import Image from 'next/image';
import {TypeFormBtn, CampaignKeys} from '../components/ExternalCDNScripts/typeform';
import {
    LandingPageNavBar,
    Panel,
    PanelBody,
    PanelImage,
    PanelText,
    PanelTitle,
    PartnerLogo,
} from '../components/lab/landing-page-components';
import AOS from 'aos';
import styles from '../styles/Home.module.css';
import 'aos/dist/aos.css';
// import {WebPush} from '^components/webPush';

const LandingPage1: NextPage = () => {
    const paneWidth = '1050px';

    useEffect(() => {
        console.log(process.env.NODE_ENV);
        AOS.init({duration: 1000});
    }, []);

    return (
        <>
            {/* _app 또는 _document 의 전역 head 를 override 하려면 이 곳에 작성하세요. */}
            {/*<Head>*/}
            {/*  <title>Payplo | 똑똑한 팀을 위한 SaaS 관리 플랫폼</title>*/}
            {/*  <meta name="description" content="똑똑한 팀을 위한 SaaS 관리 플랫폼 | Payplo - 구독 서비스 관리를 한 곳에서 쉽고 편하게" />*/}
            {/*</Head>*/}

            <div>
                <LandingPageNavBar />
                {/*<WebPush />*/}

                {/* 헤딩 */}
                <div className="pt-24">
                    <section id="section-1" className="hero mb-3">
                        <div className="hero-content text-center">
                            <div className="">
                                <h1 className="text-4xl md:text-7xl font-bold" style={{lineHeight: 1.3}}>
                                    <span className="block">구독 서비스 관리를</span>
                                    <span className="block">쉽고 편하게</span>
                                </h1>

                                {/* pc */}
                                <p className="text-2xl py-6 hidden md:block" style={{lineHeight: 1.7}}>
                                    잘 사용되지 않는 계정에 대한 비용, 직원 온보딩의 번거로움,
                                    <br />
                                    민감한 데이터에 액세스할 수 있는 퇴사자 까지.
                                    <br />
                                    <b>SaaS 관리는 정말 어렵지만, Scordi와 함께라면 쉽습니다.</b>
                                </p>
                                {/* mobile */}
                                <p className="text-lg py-6 block md:hidden" style={{lineHeight: 1.7}}>
                                    잘 사용되지 않는 계정에 대한 비용,
                                    <br /> 직원 온보딩의 번거로움,
                                    <br />
                                    민감한 데이터에 액세스할 수 있는 퇴사자 까지.
                                    <br />
                                    <br />
                                    <b>
                                        SaaS 관리는 정말 어렵지만,
                                        <br /> 스코디와 함께라면 쉽습니다.
                                    </b>
                                </p>

                                <div className="py-6">
                                    <TypeFormBtn campaignKey={CampaignKeys.landingV1} id="cta-1">
                                        클로즈베타 신청하기
                                    </TypeFormBtn>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* pc */}
                    <section className="hidden md:flex justify-center">
                        <Image src="/home/image1.png" alt="service preview image" width={1270} height={563} />
                    </section>
                    {/* mobile */}
                    <section className="flex md:hidden justify-center">
                        <Image src="/home/image1-m.png" alt="service preview image" width={1270} height={563} />
                    </section>
                </div>

                {/* 파트너 후기 */}
                <section id="section-2" className="bg-neutral hidden">
                    <div className="container pt-16 pb-12">
                        <h2 className="text-3xl py-6 font-bold text-center">파트너 후기</h2>

                        <div className="grid py-6 grid-cols-8 content-between">
                            <PartnerLogo name="Deepstudio" />
                            <PartnerLogo name="maru180" />
                            <PartnerLogo name="Sweetbalance" />
                            <PartnerLogo name="worksout" active={true} />
                            <PartnerLogo name="uglyus" />
                            <PartnerLogo name="튼튼영어" />
                            <PartnerLogo name="Arcnbook" />
                            <PartnerLogo name="LINKSTORY" />
                        </div>
                    </div>
                </section>

                {/* 패널1 */}
                <section id="section-3" className="container pt-24 pb-12 md:pt-48 md:pb-24">
                    <Panel maxWidth={paneWidth}>
                        <PanelBody>
                            <PanelTitle>
                                팀이 사용하는 서비스들을 <br />한 곳에서 관리해보세요
                            </PanelTitle>
                            <PanelText>
                                아직도 서비스마다 일일이 들어가세요? <br />
                                요금부터 플랜, 구성원, 이용빈도, 결제까지 <br />한 곳에서 간편하게!
                            </PanelText>
                        </PanelBody>
                        <PanelImage src="/home/image2.png" width={478} height={416} />
                    </Panel>
                </section>

                {/* 패널2 */}
                <section id="section-4" className="container py-12 md:py-24">
                    <Panel maxWidth={paneWidth} reverseX={true}>
                        <PanelBody>
                            <PanelTitle>이번 달 나갈 비용을 한 눈에</PanelTitle>
                            <PanelText>
                                매 달 나가는 비용을 한 눈에! <br />
                                몰래 결제되는 일 없이 불필요한 비용은 바로 줄이기
                            </PanelText>
                        </PanelBody>
                        <PanelImage src="/home/image3.png" width={448} height={434} />
                    </Panel>
                </section>

                {/* 패널3 */}
                <section id="section-5" className="container py-12 md:py-24">
                    <Panel maxWidth={paneWidth}>
                        <PanelBody>
                            <PanelTitle>
                                입사자, 퇴사자 <br />
                                관리로 새는 비용 막기!
                            </PanelTitle>
                            <PanelText>
                                상시로 벌어지는 입사와 퇴사, <br />
                                일일이 계정 초대와 삭제하기 번거로우시죠? <br />
                                클릭 한 번으로 시간 비용 Down! <br />
                                체크되지 않는 SaaS 비용까지 Down!
                            </PanelText>
                        </PanelBody>
                        <PanelImage src="/home/image4.png" width={448} height={434} />
                    </Panel>
                </section>

                {/* 지금 시작해보세요 */}
                <section id="section-6-1">
                    <div className="container pt-16 pb-12 text-center">
                        <h3 className="text-3xl md:text-5xl py-6 font-bold">지금 시작해보세요</h3>
                        <p className="text-xl pt-6">
                            지금은 클로즈베타 기간입니다. <br />
                            클로즈베타 이용 문의는 아래 버튼을 눌러주세요
                        </p>
                        <div className="pt-12 pb-6">
                            <TypeFormBtn campaignKey={CampaignKeys.landingV1} id="cta-2">
                                클로즈베타 신청하기
                            </TypeFormBtn>
                        </div>
                    </div>

                    <div className={styles.gradientBgSection}>
                        <div className="container flex justify-center pt-10 pb-20">
                            {/*<img src="/home/image5.png" alt="" className="md:w-full" style={{ minHeight: '380px', objectFit: 'cover' }}/>*/}
                            <img
                                src="/home/list.svg"
                                alt=""
                                className="md:w-full"
                                style={{minHeight: '380px', objectFit: 'cover'}}
                            />
                        </div>
                    </div>
                </section>

                <footer className="container">
                    <div className="px-4 md:px-0">
                        <div className="py-8 md:py-16" style={{minHeight: '10rem'}}>
                            <p>
                                <span className="text-3xl md:text-4xl font-bold mb-3 md:mb-5 mb-3">Scordi</span>
                                <span className="text-sm text-gray-500 ml-3 relative" style={{top: '-2px'}}>
                                    (주) 제로원리퍼블릭
                                </span>
                            </p>
                            <p className="text-lg md:text-xl text-black opacity-60 mb-3">
                                똑똑한 팀을 위한 구독 관리 플랫폼
                            </p>
                            <div className="text-sm md:text-xl text-black opacity-60">
                                <p className="">
                                    <span>대표자</span> : <span>김용현, 김규리</span> | <span>사업자번호</span> :{' '}
                                    <span>227-86-02683</span>
                                </p>
                                <p className="mb-2">
                                    <span>이메일</span> :
                                    <a href="mailto:official@01republic.io" className="link !text-gray-500">
                                        {' '}
                                        official@01republic.io{' '}
                                    </a>
                                </p>
                                <p className="mb-2">
                                    <span>서울특별시 강남구 영동대로85길 34, 9층 907</span>
                                </p>
                                <p className="mb-1 font-semibold">
                                    <a
                                        href="https://api.payplo.me:8080/terms/serviceUsageTerm-v20221101-1.txt"
                                        target="_blank"
                                    >
                                        스코디 이용약관
                                    </a>{' '}
                                    |{' '}
                                    <a
                                        href="https://api.payplo.me:8080/terms/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8-v20221101-1.html"
                                        target="_blank"
                                    >
                                        개인정보처리방침
                                    </a>
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="py-8">
                            <p className="md:text-lg text-black opacity-60">
                                © 2022 01Republic, Inc. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default LandingPage1;
