import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';

export const Footer = memo(function Footer() {
    return (
        <footer className="container md:max-w-screen-lg flex items-center gap-8 py-6">
            <div>
                <img
                    src="/images/logo/scordi/01republic/png/long-black.png"
                    alt="01Republic, Inc."
                    className="w-[120px]"
                />
            </div>

            <div className="flex-auto text-gray-500">
                <p>
                    (주) 제로원리퍼블릭 (01Republic, Inc.) 대표: 김용현 사업자등록번호: 227-86-02683 <br />
                    통신판매업번호: 2023-서울서초-3752 주소: 서울시 종로구 종로 6, 5층 고객센터 유선전화: 010-7517-3247{' '}
                    <br />
                    Copyright 2024 © 01Republic. All Rights Reserved.
                </p>
            </div>

            <div className="flex items-center gap-3 font-semibold text-14">
                <LinkTo href="#" text="개인정보처리방침" displayLoading={false} />
                <LinkTo href="#" text="이용약관" displayLoading={false} />
            </div>
        </footer>
    );
});
