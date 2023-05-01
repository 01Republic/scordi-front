import Image from 'next/image';
import React from 'react';

export default function LandingPage2() {
    return (
        <div id="mainPage" className="container-box w-full flex flex-col gap-20">
            {/* nav */}
            <header className="navbar px-10 py-4">
                <div className="navbar-start">
                    <a className="btn btn-ghost btn-hover-init normal-case text-2xl md:text-3xl h-20" href="/">
                        <Image
                            src="/logo-transparent.png"
                            alt="Scordi logo"
                            width={36}
                            height={36}
                            className="relative top-1 mr-1"
                        />
                        <span>Scordi</span>
                    </a>
                </div>
            </header>

            {/* section 1 */}
            <section id="section-1" className="section-box flex pt-20">
                <div className="section-1-box section-inner">
                    <div className="section-1-head flex flex-col flex-nowrap items-start gap-9">
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
                        <div className="section-1-left-btn">
                            <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                        </div>
                    </div>
                    <div className="section-1-body w-3/5">
                        <img src="/home/image1.png" alt="service preview image" className="w-full" />
                    </div>
                </div>
            </section>

            {/* section 2: logo-slide */}
            <section id="section-2" className="section-box py-28">
                <div className="section-inner">
                    <ul className="logos-slide-box inline-flex justify-between items-start g-10">
                        <li className="logos-slide">
                            <img src="/images/logo/logo_figma.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_notion.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_figma.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_notion.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_figma.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_notion.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_figma.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_notion.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_figma.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_notion.png" alt="notion-logo" className="logo-img" />
                        </li>
                        <li className="logos-slide">
                            <img src="/images/logo/logo_figma.png" alt="notion-logo" className="logo-img" />
                        </li>
                    </ul>
                </div>
            </section>

            {/* section 3 */}
            <section id="section-3" className="section-box flex justify-center items-center">
                <div className="section-3-box">
                    <div className="section-3-head">
                        <div className="flex flex-col text-center">
                            <p className="body-text text-gray-500">
                                <span className="text-black">Scordi</span> 와 함께라면 쉽습니다
                                <br />더 많은 고객을, 더 빨리 미팅으로 이끌어 매출을 끌어올리세요
                            </p>
                        </div>
                    </div>
                    <div className="section-3-body flex my-14">
                        <div className="section-3-image-box">
                            <div className="s3-image">
                                <img src="/images/illustration/section3_img01.png" className="w-full" />
                            </div>
                            <div className="s3-text">
                                <div>
                                    <span className="s-text-sm mr-3">미팅 수립률</span>
                                    <span className="s-text-xl">200%</span>
                                    <span className="s-text-sm ml-3">상승</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-3-image-box">
                            <div className="s3-image">
                                <img src="/images/illustration/section3_img02.png" className="w-full" />
                            </div>
                            <div className="s3-text">
                                <div>
                                    <span className="s-text-sm mr-3">노쇼</span>
                                    <span className="s-text-xl">50%</span>
                                    <span className="s-text-sm ml-3">감소</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-3-image-box">
                            <div className="s3-image">
                                <img src="/images/illustration/section3_img03.png" className="w-full" />
                            </div>
                            <div className="s3-text">
                                <div>
                                    <span className="mr-3 s-text-sm">매출</span>
                                    <span className="s-text-xl">150%</span>
                                    <span className="ml-3 s-text-sm">증가</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section id="section-4" className="section-box !w-full text-center">
                <div className="section-4-box">
                    <div className="section-4-head">
                        <h1 className="text-5xl">고객은 기다리지 않습니다</h1>
                    </div>
                    <div className="section-4-img w-[50rem]">
                        <img src="/images/illustration/section4_img01.png" alt="section4_img" className="w-full" />
                    </div>
                    <div className="section-4-body">
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
            <section id="section-5" className="section-box pt-48 pb-24">
                <div className="section-5-box section-inner">
                    <div className="section-5-left section-desc">
                        <div className="section-5-left-title">
                            <div className="title-top">
                                <div className="inline-block w-10 mr-3">
                                    <img src="/home/icons/main-icons/icon-highfive.png" alt="icon" className="w-full" />
                                </div>
                                <p className="s-text-top mt-3">스코디로 관리를 더 쉽게!</p>
                            </div>
                            <h2 className="h2-text">
                                팀이 사용하는 서비스들을
                                <br />한 곳에서 관리해보세요
                            </h2>
                        </div>
                        <div className="section-5-left-desc flex flex-col justify-start shrink-0">
                            <p className="s-text-sm">
                                아직도 서비스마다 일일이 들어가세요?
                                <br />
                                요금부터 플랜, 구성원, 이용빈도, 결제까지
                                <br />한 곳에서 간편하게!
                            </p>
                        </div>
                        <div className="section-5-left-btn">
                            <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                        </div>
                    </div>
                    <div className="section-5-right w-2/4 flex justify-end">
                        <img src="/home/image2.png" alt="service preview image" className="w-10/12" />
                    </div>
                </div>
            </section>

            {/* section 6 */}
            <section id="section-6" className="section-box pt-48 pb-24">
                <div className="section-6-box section-inner">
                    <div className="section-6-left w-2/4">
                        <img src="/home/image3.png" alt="service preview image" className="w-10/12" />
                    </div>
                    <div className="section-6-right section-desc">
                        <div className="section-6-left-title">
                            <div className="title-top">
                                <div className="inline-block w-10 mr-3">
                                    <img src="/home/icons/main-icons/icon-money.png" alt="icon" className="w-full" />
                                </div>
                                <p className="s-text-top mt-1">스코디로 원 클릭 페이!</p>
                            </div>
                            <h2 className="h2-text">이번 달 나갈 비용을 한번에!</h2>
                        </div>
                        <div className="section-6-left-desc flex flex-col justify-start shrink-0">
                            <p className="s-text-sm">
                                매 달 나가는 비용을 한 눈에!
                                <br />
                                몰래 결제되는 일 없이 불필요한 비용은 바로 줄이기!
                                <br />
                            </p>
                        </div>
                        <div className="section-6-left-btn">
                            <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 7 */}
            <section id="section-7" className="section-box py-48">
                <div className="section-7-box section-inner">
                    <div className="section-7-left section-desc">
                        <div className="section-7-left-title">
                            <div className="title-top">
                                <div className="inline-block w-8 mr-3">
                                    <img src="/home/icons/main-icons/icon-chk.png" alt="icon" className="w-full" />
                                </div>
                                <p className="s-text-top mt-1">스코디로 스마트한 비용 관리!</p>
                            </div>
                            <h2 className="h2-text">
                                입사자, 퇴사자
                                <br />
                                관리로 새는 비용 막기!
                            </h2>
                        </div>
                        <div className="section-7-left-desc flex flex-col justify-start shrink-0">
                            <p className="s-text-sm">
                                상시로 벌어지는 입사와 퇴사,
                                <br />
                                일일이 계정 초대와 삭제하기 번거로우시죠?
                                <br />
                                클릭 한 번으로 시간 비용 Down!
                                <br />
                                체크되지 않는 SaaS 비용까지 Down!
                            </p>
                        </div>
                        <div className="section-7-left-btn">
                            <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                        </div>
                    </div>
                    <div className="section-7-right w-2/4 flex justify-end">
                        <img src="/home/image4.png" alt="service preview image" className="w-10/12" />
                    </div>
                </div>
            </section>

            {/* aside */}
            <aside id="section-aside" className="flex justify-center items-center w-full h-52 bg-[#f3f6f6]">
                <div className="section-box flex justify-between items-center m-auto">
                    <div className="aside-left">
                        <h2 className="h2-text">
                            스코디의 골든타임 5분,
                            <br />
                            놓치지 마세요
                        </h2>
                    </div>
                    <div className="aside-right w-[37%] flex justify-end">
                        <div className="w-full">
                            <p className="s-text-sm mb-2">B2B 마케팅 & 스코디 인사이트 받아보기</p>
                            <div className="w-full">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input w-3/5 h-14 mr-5 max-w-xs placeholder:text-lg"
                                />
                                <div className="aside-btn inline-block">
                                    <button className="btn closeBeta-btn !w-40 !h-14">스코디 구독</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* footer */}
            <footer className="section-box mt-[-3rem]">
                <div className="px-4 md:px-0">
                    <div className="py-8 md:py-16" style={{minHeight: '10rem'}}>
                        <p>
                            <span className="text-3xl md:text-4xl font-bold mb-3 md:mb-5">Scordi</span>
                            <span className="text-sm text-gray-500 ml-3 relative" style={{top: '-2px'}}>
                                (주) 제로원리퍼블릭
                            </span>
                        </p>
                        <p className="text-lg md:text-xl text-black opacity-60 mb-3">
                            똑똑한 팀을 위한 구독 관리 플랫폼
                        </p>
                        <div className="text-sm md:text-xl text-black opacity-60">
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
                    <div className="py-8">
                        <p className="md:text-lg text-black opacity-60">© 2022 01Republic, Inc. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
