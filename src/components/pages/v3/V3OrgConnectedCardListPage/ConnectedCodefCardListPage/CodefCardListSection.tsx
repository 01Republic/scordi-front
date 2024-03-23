import React, {memo, useEffect, useState} from 'react';
import {useInvoiceAccountListInConnector} from '^models/InvoiceAccount/hook';
import {useRecoilState, useRecoilValue} from 'recoil';
import {FcAddressBook} from 'react-icons/fc';
import {FaArrowRotateRight} from 'react-icons/fa6';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {plainToast as toast} from '^hooks/useToast';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {useConnectedCodefCards, useNewCodefCards, useSubscriptionsForAccount} from '^models/CodefCard/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {selectedCodefCardAtom} from '^v3/V3OrgConnectedCardListPage/ConnectedCodefCardListPage/atom';
import {ConnectedCodefCard} from '^v3/V3OrgConnectedCardListPage/ConnectedCodefCardListPage/ConnectedCodefCard';
import {
    reloadingDataAtom,
    useCodefAccountPageSubject,
    useConnectedCardListPageData,
} from '^v3/V3OrgConnectedCardListPage/atom';

/** 청구서 수신 메일 Section */
export const CodefCardListSection = memo(() => {
    const {connectMethod} = useCodefAccountPageSubject();
    const {result} = useConnectedCodefCards(codefAccountIdParamState);
    const [selectedCodefCard, selectCodefCard] = useRecoilState(selectedCodefCardAtom);
    const {reloading, reload: refreshResource} = useConnectedCardListPageData();

    useEffect(() => {
        if (!result.items.length) {
            selectCodefCard(null);
            return;
        }
        if (!selectedCodefCard) {
            selectCodefCard(result.items[0]);
            return;
        }
        if (selectedCodefCard && !result.items.find((item) => item.id === selectedCodefCard.id)) {
            selectCodefCard(result.items[0]);
            return;
        }
    }, [result.items]);

    if (!connectMethod) return <></>;

    return (
        <div className="col-span-2 mb-8">
            <h3 className="flex items-center gap-2 py-6 sticky top-[64px] z-[1] bg-layout-background -mx-4 px-4">
                <FcAddressBook size={30} />
                <span>연결된 카드</span>
                <button
                    className={`btn btn-sm btn-ghost ml-auto gap-2 ${reloading ? 'loading' : ''}`}
                    onClick={() => refreshResource()}
                >
                    {!reloading && (
                        <>
                            <FaArrowRotateRight />
                            <span>새로고침</span>
                        </>
                    )}
                </button>
            </h3>

            <div className="flex flex-col gap-4">
                {result.items.map((codefCard, i) => (
                    <ConnectedCodefCard
                        key={i}
                        codefCard={codefCard}
                        staticData={connectMethod}
                        afterSync={() => refreshResource()}
                    />
                ))}
            </div>
        </div>
    );
});

// /** 청구서 수신 메일 */
// const InvoiceAccountItem = memo((props: {data: InvoiceAccountDto}) => {
//     const orgId = useRecoilValue(orgIdParamState);
//     const {reload} = useInvoiceAccountListInConnector();
//     const [isSyncLoading, setIsSyncLoading] = useState(false);
//     const [isDisConnectLoading, setIsDisConnectLoading] = useState<boolean>(false);
//     const [selectedAccount, setInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);
//     const {data: invoiceAccount} = props;
//     const isSelected = !!selectedAccount && selectedAccount.id === invoiceAccount.id;
//     const {alert} = useAlert();
//
//     const onClick = () => {
//         setInvoiceAccount(invoiceAccount);
//     };
//
//     const onSync = () => {
//         if (isSyncLoading) return;
//
//         setIsSyncLoading(true);
//         const req = invoiceAccountApi.sync(invoiceAccount.organizationId, invoiceAccount.id);
//         req.then(() => {
//             toast.success('동기화가 완료됐습니다.');
//             reload();
//         });
//         req.catch((err) => {
//             toast.error(err.response.data.message);
//             // openRenewModal();
//         });
//         req.finally(() => setIsSyncLoading(false));
//     };
//
//     const onDisConnect = () => {
//         if (isDisConnectLoading) return;
//
//         const invoiceAccountId = invoiceAccount?.id;
//         if (!orgId || isNaN(orgId) || !invoiceAccountId || isNaN(invoiceAccountId)) return;
//
//         const req = alert.destroy({
//             title: '연동을 해제하시겠습니까?',
//             onConfirm: () => invoiceAccountApi.destroy(orgId, invoiceAccountId),
//         });
//
//         setIsSyncLoading(true);
//         req.then((res) => {
//             if (!res) return;
//             reload();
//             toast.success('삭제가 완료됐습니다.');
//         });
//         req.catch((err) => toast.error(err.response.data.message));
//         req.finally(() => setIsDisConnectLoading(false));
//     };
//
//     return (
//         <div
//             className={`cursor-pointer ${
//                 isSelected ? 'bg-indigo-50' : 'hover:bg-gray-100'
//             } transition-all px-3 py-3 rounded-box flex justify-between ${isSyncLoading ? 'animate-pulse' : ''}`}
//             onClick={() => onClick()}
//         >
//             <div>
//                 <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
//             </div>
//             <div className="flex items-stretch justify-between">
//                 <div className="flex items-center justify-center pl-4">
//                     <MoreDropdown
//                         onSync={onSync}
//                         onDelete={onDisConnect}
//                         isSyncLoading={isSyncLoading}
//                         isDisConnectLoading={isDisConnectLoading}
//                         Profile={() => (
//                             <div className="border-b py-2 mb-2 px-3">
//                                 <p className="text-11">마지막 동기화</p>
//                                 <p className="text-13">{yyyy_mm_dd_hh_mm(invoiceAccount.updatedAt)}</p>
//                             </div>
//                         )}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// });
