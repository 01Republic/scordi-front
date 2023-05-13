import {HTMLAttributeAnchorTarget, memo} from 'react';
import Image from 'next/image';

export const BetaServiceFooter2 = memo(() => {
    return (
        <footer className="footer p-10 text-neutral-content">
            <div>
                <Image
                    src="/logo-transparent.png"
                    alt="Scordi logo"
                    width={50}
                    height={50}
                    className="relative top-1 mr-1"
                />
                <p className="font-bold text-lg">01Republic, Inc</p>
                <p>Copyright © 2023 - All right reserved</p>
            </div>
            <div>
                <p className="footer-title">
                    상호: (주) 제로원리퍼블릭 <br />
                    대표자: 김용현 <br />
                    주소: 서울특별시 강남구 영동대로85길 34, 9층 907호 <br />
                    전화번호: 010-2482-4541 <br />
                    사업자등록번호: 227-86-02683 <br />
                </p>
            </div>
        </footer>
    );
});

export const BetaServiceFooter = memo(() => {
    return (
        <footer className="footer p-10 text-neutral-content pb-[100px]">
            <div className="container mx-auto sm:px-[67px] max-w-[1064px]">
                <address className="mb-4" style={{fontStyle: 'normal'}}>
                    <p className="text-[15px] font-semibold mb-[16px]">
                        Copyright ⓒ 01Republic, Inc. All Rights Reserved
                    </p>
                    <p className="text-[13px] leading-[20px] whitespace-pre-wrap text-gray-500">
                        (주) 제로원리퍼블릭 <br />
                        사업자등록번호 : 227-86-02683 | 대표 : 김용현 <br />
                        {/*전화번호 : 010-2482-4541 | 통신판매업 신고번호 : 제2020-서울강남-01164호 사업자정보*/}
                        {/*확인 <br />*/}
                        전화번호 : 010-2482-4541 | 문의 : official@01republic.io <br />
                        서울특별시 강남구 영동대로85길 34, 9층 907호 <br />
                    </p>
                </address>

                <div className="pt-[24px] pb-[30px]">
                    <p className="text-[15px] font-semibold mb-[16px]">스코디 기본약관</p>
                    <ul className="menu menu-horizontal gap-7 text-[13px] text-gray-500">
                        <TermLinkItem href="#" name="서비스 이용약관" />
                        <TermLinkItem href="#" name="개인정보 처리방침" />
                    </ul>
                </div>

                <ul className="flex list-none">
                    <SocialIcon
                        name="Scordi KakaoTalk"
                        href="https://pf.kakao.com/_AZZPxj?utm_source=kakaochannel&utm_medium=link&utm_campaign=homepage"
                        imgSrc="https://static.toss.im/assets/homepage/safety/icn-kakao.svg"
                    />
                    <SocialIcon
                        name="Scordi Instagram"
                        href="https://instagram.com/saas.scordi?igshid=NTc4MTIwNjQ2YQ=="
                        imgSrc="https://static.toss.im/assets/homepage/safety/icn-instagram.svg"
                    />
                </ul>
            </div>
        </footer>
    );
});

interface TermLinkItemProps {
    name: string;
    href: string;
    target?: HTMLAttributeAnchorTarget;
}

const TermLinkItem = memo((props: TermLinkItemProps) => {
    const {name, href, target = '_blank'} = props;
    return (
        <li>
            <a href={href} className="p-0 bg-transparent link link-hover" target={target}>
                {name}
            </a>
        </li>
    );
});

interface SocialIconProps {
    name: string;
    href: string;
    imgSrc: string;
    target?: HTMLAttributeAnchorTarget;
}

const SocialIcon = memo((props: SocialIconProps) => {
    const {name, href, imgSrc, target = '_blank'} = props;

    return (
        <li className="p-footer__social-list-item mr-[8px]">
            <a
                className="w-[36px] h-[36px] cursor-pointer inline-block opacity-70 rounded-full hover:opacity-100"
                style={{transition: 'opacity .2s ease'}}
                aria-label={name}
                target={target}
                href={href}
            >
                <img src={imgSrc} alt={name} />
            </a>
        </li>
    );
});
