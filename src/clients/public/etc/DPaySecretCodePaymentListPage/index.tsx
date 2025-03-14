import React, {memo, useEffect, useState} from 'react';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {useRecoilValue} from 'recoil';
import {secretCodeParamsAtom} from '^clients/public/etc/DPaySecretCodePage/atom';
import {useDPayPaymentsInPaymentListPage} from '^models/_scordi/ScordiPayment/hook';
import {useUnmount} from '^hooks/useUnmount';
import {DPayPaymentTableRow} from './DPayPaymentTableRow';
import {LoadableBox} from '^components/util/loading';
import {MdRefresh} from 'react-icons/md';
import Tippy from '@tippyjs/react';
import {BsFillInfoCircleFill} from 'react-icons/bs';
import {RiFileExcel2Fill} from 'react-icons/ri';
import {exportTableToExcel} from '^utils/export-table-to-excel';
import {IoMdShare} from 'react-icons/io';
import {useRouter} from 'next/router';
import {cryptoUtil} from '^utils/crypto';
import {yyyy_mm_dd} from '^utils/dateTime';
import {toast} from 'react-hot-toast';
import {scordiPlanApi} from '^models/_scordi/ScordiPlan/api';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {ScordiPaymentStatus} from '^models/_scordi/ScordiPayment/type';

async function getPlan(secretCode: string) {
    return scordiPlanApi
        .index({
            where: {secretCode},
            order: {id: 'DESC'},
            itemsPerPage: 1,
        })
        .then((res) => res.data || [])
        .then((list) => list[0]);
}

export const DPaySecretCodePaymentListPage = memo(function DPaySecretCodePaymentListPage() {
    const router = useRouter();
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const {search, result, isLoading, reload, isEmptyResult, clearCache} = useDPayPaymentsInPaymentListPage();
    const [plan, setPlan] = useState<ScordiPlanDto>();

    useEffect(() => {
        if (!secretCode) return;

        search({
            where: {
                scordiPlan: {secretCode},
            },
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
        getPlan(secretCode).then(setPlan);
    }, [secretCode]);

    useUnmount(() => {
        clearCache();
    }, [secretCode]);

    const successItems = result.items.filter((item) => item.status === ScordiPaymentStatus.SUCCESS);
    const totalCount = successItems.length;
    const totalPrice = successItems.reduce((total, payment) => total + payment.price, 0);

    const copyShareLink = async () => {
        if (!window) return;
        const sign = yyyy_mm_dd(new Date()).replaceAll('-', '');
        const accessCode = cryptoUtil.encryptUri([secretCode, sign].join(':'));
        const permittedUrl = window.location.origin + window.location.pathname + `?accessCode=${accessCode}`;
        await window.navigator.clipboard.writeText(permittedUrl);
        toast.success('공유 링크를 복사했어요.');
    };

    return (
        <div className="min-h-screen w-screen bg-white">
            <ChannelTalkHideStyle />

            <div className="container xl:max-w-full 2xl:!max-w-full py-10 sm:py-20 px-4 2xl:px-20">
                <section className="flex items-center flex-col sm:flex-row mb-[32px]">
                    <h1 className="flex items-center gap-4 w-full">
                        {plan && (
                            <span>
                                <span className="text-scordi mr-1">{plan?.name || ''}</span>의{' '}
                                <span className="block sm:inline-block">결제 현황</span>
                            </span>
                        )}

                        <Tippy className="!text-10" content="새로고침">
                            <button
                                className={`btn text-18 sm:btn-xs sm:text-14 btn-square btn-scordi ml-auto sm:ml-0`}
                                onClick={() => reload()}
                            >
                                <MdRefresh className={isLoading ? 'animate-spin' : ''} />
                            </button>
                        </Tippy>
                    </h1>

                    <div className="ml-auto flex items-center gap-2 text-xl font-bold">
                        <div className="whitespace-nowrap">총 {totalCount.toLocaleString()}건</div>
                        <div>/</div>
                        <div className="whitespace-nowrap">{totalPrice.toLocaleString()}원</div>
                    </div>
                </section>

                <section className="flex items-center gap-2 mb-3">
                    <div>
                        <button className="btn btn-sm rounded-md gap-2" onClick={() => copyShareLink()}>
                            <IoMdShare className="text-scordi" fontSize={16} />
                            <span>링크 공유하기</span>
                        </button>
                    </div>
                    <div>
                        <button
                            className="btn btn-sm rounded-md gap-2"
                            onClick={() =>
                                exportTableToExcel('DPayPaymentList', {
                                    filename: '결제내역',
                                })
                            }
                        >
                            <RiFileExcel2Fill className="text-green-600" fontSize={16} />
                            <span>엑셀 다운로드</span>
                        </button>
                    </div>
                    <div></div>
                    <div className="ml-auto">
                        <select className="select select-bordered select-sm focus:outline-none rounded-md">
                            <option value="0">전체보기</option>
                        </select>
                    </div>
                </section>

                <section>
                    <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                        <div className="overflow-x-auto no-scrollbar">
                            <table id="DPayPaymentList" className="table table-v2 table-compact w-full">
                                <thead>
                                    <tr className="relative">
                                        <th className="fixed-left">결제일시</th>
                                        <th>취소완료일시</th>
                                        <th>주문번호</th>
                                        <th>구매상품</th>
                                        <th>결제상태</th>
                                        <th>취소하기</th>
                                        <th>
                                            <div className="flex items-center gap-2">
                                                <div>영수증</div>
                                                <Tippy
                                                    className="!text-12"
                                                    content="네이버페이, 카카오페이 등 간편결제를 사용한 현금성 결제는 현금영수증이 표시돼요."
                                                >
                                                    <div>
                                                        <BsFillInfoCircleFill fontSize={14} className="text-gray-400" />
                                                    </div>
                                                </Tippy>
                                            </div>
                                        </th>
                                        <th>구매자명</th>
                                        <th>구매자 이메일</th>
                                        <th>구매자 휴대폰번호</th>
                                        <th className="text-right">결제액</th>
                                        {/*<th>취소액</th>*/}
                                        <th>결제수단</th>
                                        <th>결제기관</th>
                                        <th>승인번호</th>
                                        {/*<th>취소자</th>*/}
                                    </tr>
                                </thead>

                                <tbody>
                                    {result.items.map((payment, i) => (
                                        <DPayPaymentTableRow
                                            key={i}
                                            payment={payment}
                                            secretCode={secretCode}
                                            reload={() => reload()}
                                        />
                                    ))}
                                </tbody>

                                <tfoot>
                                    <tr className="relative">
                                        <td className="fixed-left">
                                            <span className="font-semibold">총 {totalCount.toLocaleString()}건</span>
                                        </td>
                                        <td colSpan={13} className="text-right">
                                            <span className="font-semibold sticky right-0 px-[12px] py-[4px] mx-[-12px] my-[-4px]">
                                                합계: {totalPrice.toLocaleString()}원
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </LoadableBox>
                </section>
            </div>
        </div>
    );
});
