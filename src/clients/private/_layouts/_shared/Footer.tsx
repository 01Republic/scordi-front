import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';

export const Footer = memo(function Footer() {
    const currentOrg = useRecoilValue(currentOrgAtom);

    return (
        <footer className="container px-4 md:max-w-screen-lg flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 sticky top-[100%]">
            <div>
                <img
                    src="/images/logo/scordi/01republic/png/long-black.png"
                    alt="01Republic, Inc."
                    className="w-[120px]"
                />
            </div>

            <div className="flex-auto text-gray-500">
                <p>
                    (주) 제로원리퍼블릭 (01Republic, Inc.) 대표: 김용현, 김규리 <br className="sm:hidden" />{' '}
                    사업자등록번호: 227-86-02683 <br />
                    통신판매업번호: 2023-서울서초-3752 <br className="sm:hidden" /> 주소: 서울시 종로구 종로 6, 5층{' '}
                    <br className="sm:hidden" /> 고객센터 유선전화: 010-7517-3247 <br />
                    Copyright 2024 © 01Republic. All Rights Reserved
                    {currentOrg && (
                        <LinkTo text="." href={V3OrgHomePageRoute.path(currentOrg.id)} displayLoading={false} />
                    )}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-semibold text-14">
                <LinkTo
                    target="_blank"
                    href="https://01republic.oopy.io/privacy-policy"
                    text="개인정보처리방침"
                    displayLoading={false}
                />
                <LinkTo
                    target="_blank"
                    href="https://01republic.oopy.io/service-usage-term"
                    text="이용약관"
                    displayLoading={false}
                />
            </div>
        </footer>
    );
});
