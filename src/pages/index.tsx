import type { NextPage } from 'next'
import { FC } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ChildrenProp } from "../components/util/children-prop.type";

const LandingPageNavBar = () => {
  return (
    <div className="container navbar">
      <div className="navbar-start">
        <a className="btn btn-ghost btn-hover-init normal-case text-2xl md:text-3xl">
          <img src="/logo-transparent.png" alt="payplo logo" width={36} className="relative top-1 mr-1"/>
          <span>payplo</span>
        </a>
      </div>
      <div className="navbar-center lg:flex" />
      <div className="navbar-end">
        <a className="btn btn-outline btn-primary" href="/login">무료로 시작하기</a>
      </div>
    </div>
  )
}

const PartnerLogo: FC<{
  name: string,
  active?: boolean
} & ChildrenProp> = ({ name, active = false }) => (
  <div className={`${styles.partnerLogoText} ${active ? styles.partnerLogoTextActive : ''}`}>
    {name}
  </div>
)

const Panel: FC<{
  maxWidth: string,
  reverseX?: boolean,
} & ChildrenProp> = ({ reverseX, maxWidth, children }) => (
  <div
    className={`md:flex justify-between items-center mx-auto ${reverseX ? 'md:flex-row-reverse' : ''}`}
    style={{ maxWidth }}>
    {children}
  </div>
)
const PanelTitle: FC<{} & ChildrenProp> = ({ children }) => (
  <h3 className="text-3xl md:text-5xl font-bold">
    {children}
  </h3>
)
const PanelText: FC<{} & ChildrenProp> = ({ children }) => (
  <p className="text-lg md:text-xl py-6">
    {children}
  </p>
)
const PanelBody: FC<{} & ChildrenProp> = ({ children }) => (
  <div className="leading-normal text-center md:text-left mb-16 md:mb-0">
    {children}
  </div>
)
const PanelImage = ({ src, alt = '' }: { src: string, alt?: string }) => (
  <img src={src} className="max-w-sm rounded-lg shadow-2xl mx-auto md:mx-0 w-full md:w-auto px-4 md:px-0" alt={alt}/>
)

const Home: NextPage = () => {
  const paneWidth = '1050px';

  return (
    <>
      <Head>
        <title>Payplo</title>
        <meta name="description" content="똑똑한 팀을 위한 SaaS 관리 플랫폼 | Payplo - 구독 서비스 관리를 한 곳에서 쉽고 편하게" />
        <link rel="icon" href="/logo-transparent.png" />
      </Head>

      <div>
        <LandingPageNavBar/>

        {/* 헤딩 */}
        <div className="pt-24">
          <section id="section-1" className="hero mb-3">
            <div className="hero-content text-center">
              <div className="">
                <h1 className="text-4xl md:text-7xl font-bold" style={{ lineHeight: 1.3 }}>
                  <span className="block">구독 서비스 관리를</span>
                  <span className="block">쉽고 편하게</span>
                </h1>

                {/* pc */}
                <p className="text-2xl py-6 hidden md:block" style={{ lineHeight: 1.7 }}>
                  잘 사용되지 않는 계정에 대한 비용, 직원 온보딩의 번거로움,<br />
                  민감한 데이터에 액세스할 수 있는 퇴사자 까지.<br />
                  <b>SaaS 관리는 정말 어렵지만, Payplo와 함께라면 쉽습니다.</b>
                </p>
                {/* mobile */}
                <p className="text-lg py-6 block md:hidden" style={{ lineHeight: 1.7 }}>
                  잘 사용되지 않는 계정에 대한 비용,<br /> 직원 온보딩의 번거로움,<br />
                  민감한 데이터에 액세스할 수 있는 퇴사자 까지.<br /><br />
                  <b>SaaS 관리는 정말 어렵지만,<br /> Payplo와 함께라면 쉽습니다.</b>
                </p>

                <div className="py-6">
                  <a className="btn btn-primary btn-lg" href="/login">무료로 시작하기</a>
                </div>
              </div>
            </div>
          </section>

          {/* pc */}
          <section className="hidden md:flex justify-center">
            <img src="/home/image1.png" alt=""/>
          </section>
          {/* mobile */}
          <section className="flex md:hidden justify-center">
            <img src="/home/image1-m.png" alt=""/>
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
                팀이 사용하는 서비스들을 <br/>
                한 곳에서 관리해보세요
              </PanelTitle>
              <PanelText>
                아직도 서비스마다 일일이 들어가세요? <br/>
                요금부터 플랜, 구성원, 이용빈도, 결제까지 <br/>
                한 곳에서 간편하게!
              </PanelText>
            </PanelBody>
            <PanelImage src="/home/image2.png" />
          </Panel>
        </section>

        {/* 패널2 */}
        <section id="section-4" className="container py-12 md:py-24">
          <Panel maxWidth={paneWidth} reverseX={true}>
            <PanelBody>
              <PanelTitle>
                이번 달 나갈 비용을 한 눈에
              </PanelTitle>
              <PanelText>
                매 달 나가는 비용을 한 눈에! <br/>
                몰래 결제되는 일 없이 불필요한 비용은 바로 줄이기
              </PanelText>
            </PanelBody>
            <PanelImage src="/home/image3.png" />
          </Panel>
        </section>

        {/* 패널3 */}
        <section id="section-5" className="container py-12 md:py-24">
          <Panel maxWidth={paneWidth}>
            <PanelBody>
              <PanelTitle>
                입사자, 퇴사자 <br/>
                관리로 새는 비용 막기!
              </PanelTitle>
              <PanelText>
                상시로 벌어지는 입사와 퇴사, <br/>
                일일이 계정 초대와 삭제하기 번거로우시죠? <br/>
                클릭 한 번으로 시간 비용 Down! <br/>
                체크되지 않는 SaaS 비용까지 Down!
              </PanelText>
            </PanelBody>
            <PanelImage src="/home/image4.png" />
          </Panel>
        </section>

        {/* 지금 시작해보세요 */}
        <section id="section-6-1">
          <div className="container pt-16 pb-12 text-center">
            <h3 className="text-3xl md:text-5xl py-6 font-bold">지금 시작해보세요</h3>
            <p className="text-xl pt-6">
              지금은 사전 신청을 받고 있습니다. <br/>
              사전 신청에 참여해주신 분들은 1년 무료
            </p>
            <div className="pt-12 pb-6">
              <a className="btn btn-primary btn-lg" href="/login">사전 신청 등록하기</a>
            </div>
          </div>

          <div className={styles.gradientBgSection}>
            <div className="container flex justify-center pt-10 pb-20">
              <img src="/home/image5.png" alt="" className="md:w-full" style={{ minHeight: '380px', objectFit: 'cover' }}/>
            </div>
          </div>
        </section>

        <footer className="container">
          <div className="px-4 md:px-0">
            <div className="py-8 md:py-16" style={{ minHeight: '10rem' }}>
              <p className="text-3xl md:text-4xl font-bold mb-3 md:mb-5">payplo</p>
              <p className="text-lg md:text-xl text-black opacity-60">똑똑한 팀을 위한 SaaS 관리 플랫폼</p>
            </div>
            <hr/>
            <div className="py-8">
              <p className="md:text-lg text-black opacity-60">© 2022  Team Payplo. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
