import Image from 'next/image';
import React, {useEffect} from 'react';
import {Header} from '^components/pages/LandingPage2/Header';
import {LogoItem} from '^components/pages/LandingPage2/LogoItem';
import {ArticleSection} from '^components/pages/LandingPage2/ArticleSection';

import AOS from 'aos';
import 'aos/dist/aos.css';
import {ImageBox} from './ImageBox';

export function LandingPage2() {
    const imgUrls = [
        '/images/logo/logo_figma.png',
        '/images/logo/logo_notion.png',
        '/images/logo/logo_figma.png',
        '/images/logo/logo_notion.png',
        '/images/logo/logo_figma.png',
        '/images/logo/logo_notion.png',
        '/images/logo/logo_figma.png',
        '/images/logo/logo_notion.png',
        '/images/logo/logo_figma.png',
        '/images/logo/logo_notion.png',
        '/images/logo/logo_notion.png',
        '/images/logo/logo_notion.png',
    ];

    useEffect(() => {
        AOS.init({duration: 750});
    }, []);

    return (
        <div id="mainPage" className="container-box flex flex-col gap-20 xl:gap-14 lg:gap-12 w-full">
            {/* nav */}
            <Header />

            {/* section 1 */}
            <section id="section-1" className="section-box flex pt-8 ml-14 lg:ml-0 lg:pt-8">
                <div className="section-1-box section-inner">
                    <div className="section-1-head flex flex-col flex-nowrap items-start gap-9 xl:gap-6">
                        <div className="section-1-left-title">
                            <h1 className="h1-text">
                                구독 서비스 관리를
                                <br />
                                쉽고 편안하게
                            </h1>
                        </div>
                        <div className="section-1-left-desc flex flex-col justify-start shrink-0">
                            <p className="body-text">
                                이용이 적은 계정에 대한 비용,
                                <br />
                                직원 온보딩의 번거로움,
                                <br />
                                민감한 데이터에 액세스 가능한 퇴사자 까지
                                <br />
                                {/* SaaS 관리는 어렵지만, Scordi와 함께라면 쉽습니다. */}
                            </p>
                        </div>
                        <div className="section-1-left-btn md:hidden lg:hidden">
                            <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                        </div>
                    </div>
                    <div className="section-1-body w-3/5 xl:w-[61%] lg:w-fit lg:mt-12">
                        <img src="/home/image1.png" alt="service preview image" className="w-full" />
                    </div>
                    <div className="section-1-left-btn" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <button className="btn closeBeta-btn hidden md:block lg:block">클로즈베타 신청하기</button>
                    </div>
                </div>
            </section>

            {/* section 2: logo-slide */}
            <section id="section-2" className="section-box py-28 xl:py-24">
                <div className="section-inner">
                    <ul className="logos-slide-box inline-flex justify-between items-start g-10">
                        {imgUrls.map((url, i) => (
                            <LogoItem key={i} imgSrc={url} />
                        ))}
                    </ul>
                </div>
            </section>

            {/* section 3 */}
            <section id="section-3" className="section-box flex justify-center items-center">
                <div className="section-3-box">
                    <div className="section-3-head">
                        <div className="flex flex-col text-center">
                            <p
                                className="body-text text-gray-500"
                                data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom"
                            >
                                <span className="text-black">Scordi</span> 와 함께라면 쉽습니다
                                <br />더 많은 고객을, 더 빨리 미팅으로 이끌어 매출을 끌어올리세요
                            </p>
                        </div>
                    </div>
                    <div className="section-3-body flex lg:flex-col my-14 xl:mt-10 xl:mb-14">
                        <ImageBox
                            imgUrl="/images/illustration/section3_img01.png"
                            leftTxt="미팅 수립률"
                            centerNum={200}
                            rightTxt="상승"
                        />
                        <ImageBox
                            imgUrl="/images/illustration/section3_img02.png"
                            leftTxt="노쇼"
                            centerNum={50}
                            rightTxt="감소"
                        />
                        <ImageBox
                            imgUrl="/images/illustration/section3_img03.png"
                            leftTxt="매출"
                            centerNum={150}
                            rightTxt="증가"
                        />
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section id="section-4" className="section-box !w-full text-center">
                <div className="section-4-box">
                    <div className="section-4-head" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <h1 className="text-5xl xl:text-[2.8rem] lg:text-[2.6rem]">고객은 기다리지 않습니다</h1>
                    </div>
                    <div
                        className="section-4-img w-[50rem] xl:w-[41rem] lg:w-[39rem]"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    >
                        <img src="/images/illustration/section4_img01.png" alt="section4_img" className="w-full mt-5" />
                    </div>
                    <div className="section-4-body" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <p className="s-text-sm">
                            기다림이 길어질수록 고객은 하나둘씩 이탈합니다.
                            <br />
                            스코디는 고객이 구매 문의를 넣는 즉시,
                            <br />
                            곧바로 미팅으로 연결합니다.
                            <br />
                            문의 확인부터, 팀원 배정, 미팅 일정 조율까지…
                            <br />
                            번거롭고 긴 프로세스로 고객을 경쟁사에 뺏기지 마세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* section 5 */}
            <ArticleSection
                iconUrl="/home/icons/main-icons/icon-highfive.png"
                subtitle="스코디로 관리를 더 쉽게!"
                // title={
                //     <span>
                //         팀이 사용하는 서비스들을
                //         <br />한 곳에서 관리해보세요
                //     </span>
                // }
                title="팀이 사용하는 서비스들을<br />한 곳에서 관리해보세요"
                desc="아직도 서비스마다 일일이 들어가세요?
                            <br />
                            요금부터 플랜, 구성원, 이용빈도, 결제까지
                            <br />한 곳에서 간편하게!"
                imgUrl="/home/image2.png"
                left={true}
            />

            {/* section 6 */}
            <ArticleSection
                iconUrl="/home/icons/main-icons/icon-money.png"
                subtitle="스코디로 원 클릭 페이!"
                title="이번 달 나갈 비용을 한번에!"
                desc="매 달 나가는 비용을 한 눈에!
                <br />
                몰래 결제되는 일 없이 불필요한 비용은 바로 줄이기!
                <br />"
                imgUrl="/home/image3.png"
                left={false}
            />

            {/* section 7 */}
            <ArticleSection
                iconUrl="/home/icons/main-icons/icon-chk.png"
                subtitle="스코디로 스마트한 비용 관리!"
                title="입사자, 퇴사자<br />관리로 새는 비용 막기!"
                desc="상시로 벌어지는 입사와 퇴사,
                <br />
                일일이 계정 초대와 삭제하기 번거로우시죠?
                <br />
                클릭 한 번으로 시간 비용 Down!
                <br />
                체크되지 않는 SaaS 비용까지 Down!"
                imgUrl="/home/image4.png"
                left={true}
            />

            <br />

            {/* aside */}
            <aside
                id="section-aside"
                className="flex justify-center items-center w-full h-52 lg:h-auto lg:py-12 bg-[#f3f6f6]"
            >
                <div className="section-box flex lg:flex-col justify-between items-center m-auto">
                    <div className="aside-left">
                        <h2 className="h2-text" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                            스코디의 골든타임 5분,
                            <br />
                            놓치지 마세요
                        </h2>
                    </div>
                    <div className="aside-right w-[40%] lg:w-[80%] lg:mt-4 flex justify-end">
                        <div className="w-full">
                            <p
                                className="s-text-sm aside-text mb-2"
                                data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom"
                            >
                                B2B 마케팅 & 스코디 인사이트 받아보기
                            </p>
                            <div className="w-full" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input inline-block w-3/5 h-14 mr-3 max-w-xs placeholder:text-lg xl:placeholder:text-base"
                                />
                                <div className="aside-btn inline-block">
                                    <button className="btn subscribe-btn inline-block">스코디 구독</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* footer */}
            <footer className="section-box mt-[-3rem]">
                <div className="px-4 lg:px-0">
                    <div className="py-8 lg:py-16" style={{minHeight: '10rem'}}>
                        <p>
                            <span className="text-3xl lg:text-[2rem] font-bold mb-2">Scordi</span>
                            <span className="text-sm text-gray-500 ml-3 relative">(주) 제로원리퍼블릭</span>
                        </p>
                        <p className="text-lg md:text-xl text-black opacity-60 mb-3">
                            똑똑한 팀을 위한 구독 관리 플랫폼
                        </p>
                        <div className="text-sm lg:text-xl text-black opacity-60">
                            <p className="">
                                <span>대표자</span> : <span>김용현</span> | <span>사업자번호</span> :{' '}
                                <span>227-86-02683</span>
                            </p>
                            <p className="mb-2">
                                <span>이메일</span> : <span>official@01republic.io</span>
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
                    <div className="py-8 lg:py-5">
                        <p className="lg:text-lg text-black opacity-60">© 2022 01Republic, Inc. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
