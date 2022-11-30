import React from 'react';

interface OrgMainLayoutFooterProps {}

export function OrgMainLayoutFooter({}: OrgMainLayoutFooterProps) {
    const serviceTermUrl = 'https://api.payplo.me:8080/terms/serviceUsageTerm-v20221101-1.txt';
    const privacyTermUrl =
        'https://api.payplo.me:8080/terms/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8-v20221101-1.html';
    return (
        <footer className="bs-row mx-0 px-6 py-4 items-center border-t border-t-[#dbd6e1] bg-neutral text-sm text-gray-500">
            <div className="bs-col px-0 flex justify-start gap-4">
                <a className={'text-xs'} href={serviceTermUrl} target="_blank">
                    이용약관
                </a>
                <a className={'text-xs'} href={privacyTermUrl} target="_blank">
                    개인정보 처리방침
                </a>
            </div>
            <div className="px-0 text-center font-bold text-lg text-black">Scordi</div>
            <div className="bs-col px-0 flex justify-end gap-4">
                {/*<a href="#">Service Status</a>*/}
                {/*<a href="#">API</a>*/}
                {/*<a href="#">Docs</a>*/}
                {/*<a href="#">Contribute</a>*/}
            </div>
        </footer>
    );
}
