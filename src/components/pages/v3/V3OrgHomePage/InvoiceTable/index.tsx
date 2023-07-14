import React, {memo} from 'react';
import {InvoiceTableRow} from './InvoiceTableRow';
import {TablePaginator} from '^v3/share/table/TablePaginator';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';
import {RiMailAddLine} from '^components/react-icons';
import {useTranslation} from 'next-i18next';
import {useSetRecoilState} from 'recoil';
import {isOpenNewInvoiceAccountModalAtom} from '^v3/V3OrgHomePage/NewInvoiceAccountModal';

export const InvoiceTable = memo(() => {
    const {result, movePage} = useBillingHistoriesV3();
    const {t} = useTranslation('org-home');
    const isEmpty = result.pagination.totalItemCount === 0;

    const setModalShow = useSetRecoilState(isOpenNewInvoiceAccountModalAtom);

    if (isEmpty) {
        return (
            <div className="w-full card bg-white shadow">
                <div className="card-body items-center justify-center py-[4rem]">
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="avatar">
                                <div className="w-24 mask mask-squircle !flex items-center justify-center text-gray-400 bg-slate-200">
                                    <RiMailAddLine size={50} />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl mb-4">앗! 아직 결제 내역을 확인 할 수 없어요</h3>
                        <p className="text-16 font-light mb-6">
                            청구 메일을 받고 있는 계정을 연결해서 <br />
                            결제 내역을 5초만에 확인해보세요.
                        </p>
                        <button className="btn btn-scordi" onClick={() => setModalShow(true)}>
                            인보이스 찾아보기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto shadow-xl">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox checkbox-sm" />
                                </label>
                            </th>
                            <th>결제일/청구자</th>
                            <th>상태</th>
                            <th>서비스명</th>
                            <th>타입</th>
                            {/*<th>결제수단</th>*/}
                            <th>결제금액</th>
                            <th>청구 메일</th>
                            {/*<th>PG사</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {result.items.map((invoiceData, i) => (
                            <InvoiceTableRow key={i} invoiceData={invoiceData} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center">
                <TablePaginator pagination={result.pagination} movePage={movePage} />
            </div>
        </div>
    );
});
