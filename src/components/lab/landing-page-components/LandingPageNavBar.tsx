import Image from "next/image";
import { UserLoginPageRoute } from '^pages/users/login';

export const LandingPageNavBar = () => {
  const onClickCta = () => {
    const ctaBtn = document.querySelector('#cta-1') as HTMLElement;
    if (ctaBtn) ctaBtn.click();
  }

  return (
    <div className="container navbar">
      <div className="navbar-start">
        <a className="btn btn-ghost btn-hover-init normal-case text-2xl md:text-3xl">
          <Image src="/logo-transparent.png" alt="payplo logo" width={36} height={36} className="relative top-1 mr-1"/>
          <span>payplo</span>
        </a>
      </div>
      <div className="navbar-center lg:flex" />
      <div className="navbar-end">
        <a className="btn btn-outline btn-primary" href={UserLoginPageRoute.path()}>무료로 시작하기</a>
      </div>
    </div>
  )
}
