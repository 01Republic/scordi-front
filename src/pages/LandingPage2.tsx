import Image from 'next/image';
import React from 'react';

export default function LandingPage2() {
    return (
        <div id="mainPage" className="container-box w-full">
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
            <section id="section-1" className="section-box flex pt-32">
                <div className="section-1-box flex flex-row items-center">
                    <div className="section-1-head flex flex-col flex-nowrap items-start gap-6">
                        <div>
                            <h1 className="head-text">
                                구독 서비스 관리를
                                <br />
                                쉽고 편안하게
                            </h1>
                        </div>
                        <div className="flex flex-col justify-start shrink-0">
                            <p className="body-text text-gray-500">
                                이용이 적은 계정에 대한 비용,
                                <br />
                                직원 온보딩의 번거로움,
                                <br />
                                민감한 데이터에 액세스할 수 있는 퇴사자 까지
                                <br />
                                SaaS 관리는 어렵지만, Scordi와 함께라면 쉽습니다.
                            </p>
                        </div>
                        <div>
                            <button className="btn closeBeta-btn">클로즈베타 신청하기</button>
                        </div>
                    </div>
                    <div className="section-1-body w-7/12">
                        <img src="/home/image1.png" alt="service preview image" className="w-full" />
                    </div>
                </div>
            </section>
            <section id="section-2" className="py-32">
                <ul className="inline-flex justify-between items-start g-10">
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
                    <li className="logos-slide">
                        <img src="/images/logo/logo_notion.png" alt="notion-logo" className="logo-img" />
                    </li>
                    <li className="logos-slide">
                        <img src="/images/logo/logo_figma.png" alt="notion-logo" className="logo-img" />
                    </li>
                </ul>
            </section>
            <section></section>
            <section></section>
            <section></section>
            <section></section>
            <section></section>
            <section></section>
            <footer></footer>
        </div>
    );
}
