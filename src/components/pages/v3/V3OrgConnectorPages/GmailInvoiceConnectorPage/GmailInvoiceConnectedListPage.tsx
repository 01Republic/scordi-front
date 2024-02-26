import React, {memo, useEffect, useState} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft, FaArrowRotateRight, FaPlus} from 'react-icons/fa6';
import {SafeBadge} from '^v3/V3OrgConnectorPages/GoogleWorkspaceConnectorPage/GoogleWorkspaceBeforeConnectPage';
import {FcAddressBook, FcFinePrint} from 'react-icons/fc';
import {useRouter} from 'next/router';
import {useInvoiceAccountListInConnector} from '^models/InvoiceAccount/hook';
import {GoogleProfile} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleProfile';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {
    BillingCycleTypeColumn,
    ProductProfile,
    ProductProfile2,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {SubscriptionDto} from '^models/Subscription/types';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {MoneyDto} from '^models/Money';
import {useAppShowModal} from '^v3/share/modals/AppShowPageModal';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {plainToast as toast} from '^hooks/useToast';
import {orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';

const selectedInvoiceAccountAtom = atom<InvoiceAccountDto | null>({
    key: 'selectedInvoiceAccountAtom',
    default: null,
});

export const GmailInvoiceConnectedListPage = memo(function GmailInvoiceConnectedListPage() {
    const router = useRouter();
    const {result} = useInvoiceAccountListInConnector();
    const setCode = useSetRecoilState(connectInvoiceAccountCodeAtom);

    const {items, pagination} = result;
    console.log('items', items);
    const subscriptions = items.flatMap((item) => item.subscriptions);

    return (
        <div className="py-10 px-12">
            <header className="mb-12">
                <div className="mb-12">
                    <LinkTo
                        onClick={() => router.back()}
                        className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                    >
                        <FaArrowLeft /> 뒤로가기
                    </LinkTo>
                </div>

                {/*<div className="mb-4 flex items-center justify-between">*/}
                {/*    <img*/}
                {/*        src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png"*/}
                {/*        alt="Gmail logo"*/}
                {/*        className="avatar w-[48px] h-[48px] bg-white mb-4"*/}
                {/*    />*/}
                {/*    <SafeBadge />*/}
                {/*</div>*/}

                <div className="mb-12 flex justify-between items-center">
                    <h1 className="text-3xl mb-8">
                        {pagination.totalItemCount}개의 청구서 수신 메일
                        <span className="text-gray-400">로부터</span> <br /> {subscriptions.length}개의 구독
                        <span className="text-gray-400">을 연결하고 있어요</span>
                    </h1>

                    <div className="flex gap-2">
                        {/*<button className="btn btn-scordi-light-200 !text-gray-700 btn-lg gap-2">*/}
                        {/*    <FaArrowRotateRight />*/}
                        {/*    <span>모두 동기화</span>*/}
                        {/*</button>*/}

                        <GoogleLoginBtn
                            about="gmail"
                            onCode={(code) => setCode(code)}
                            ButtonComponent={() => (
                                <button className="btn btn-scordi btn-lg gap-2">
                                    <FaPlus />
                                    <span>새 메일 추가</span>
                                </button>
                            )}
                        />
                    </div>
                </div>
            </header>

            <section className="grid grid-cols-5 gap-12">
                <InvoiceAccountListSection />
                <SubscriptionListSection />
            </section>
        </div>
    );
});

/** 청구서 수신 메일 Section */
const InvoiceAccountListSection = memo(() => {
    const {result, reload} = useInvoiceAccountListInConnector();
    const [selectedAccount, selectAccount] = useRecoilState(selectedInvoiceAccountAtom);
    const [refreshIsClicked, setRefreshButtonClicked] = useState(false);

    useEffect(() => {
        if (!result.items.length) {
            selectAccount(null);
            return;
        }
        if (!selectedAccount) {
            selectAccount(result.items[0]);
            return;
        }
        if (selectedAccount && !result.items.find((item) => item.id === selectedAccount.id)) {
            selectAccount(result.items[0]);
            return;
        }
    }, [result.items]);

    return (
        <div className="col-span-2">
            <h3 className="flex items-center gap-2 mb-6">
                <FcAddressBook size={30} />
                <span>청구서 수신 메일</span>
                <button
                    className={`btn btn-sm btn-ghost ml-auto gap-2 ${refreshIsClicked ? 'loading' : ''}`}
                    onClick={() => {
                        setRefreshButtonClicked(true);
                        reload().then(() => setRefreshButtonClicked(false));
                    }}
                >
                    {!refreshIsClicked && (
                        <>
                            <FaArrowRotateRight />
                            <span>새로고침</span>
                        </>
                    )}
                </button>
            </h3>

            <div className="card card-bordered bg-white">
                {result.items.map((invoiceAccount, i) => (
                    <InvoiceAccountItem key={i} data={invoiceAccount} />
                ))}
            </div>
        </div>
    );
});

/** 청구서 수신 메일 */
const InvoiceAccountItem = memo((props: {data: InvoiceAccountDto}) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload} = useInvoiceAccountListInConnector();
    const [isSyncLoading, setIsSyncLoading] = useState(false);
    const [isDisConnectLoading, setIsDisConnectLoading] = useState<boolean>(false);
    const [selectedAccount, setInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);
    const {data: invoiceAccount} = props;
    const isSelected = !!selectedAccount && selectedAccount.id === invoiceAccount.id;
    const {alert} = useAlert();

    const onClick = () => {
        setInvoiceAccount(invoiceAccount);
    };

    const onSync = () => {
        if (isSyncLoading) return;

        setIsSyncLoading(true);
        const req = invoiceAccountApi.sync(invoiceAccount.organizationId, invoiceAccount.id);
        req.then(() => {
            toast.success('동기화가 완료됐습니다.');
            reload();
        });
        req.catch((err) => {
            toast.error(err.response.data.message);
            // openRenewModal();
        });
        req.finally(() => setIsSyncLoading(false));
    };

    const onDisConnect = () => {
        if (isDisConnectLoading) return;

        const invoiceAccountId = invoiceAccount?.id;
        if (!orgId || isNaN(orgId) || !invoiceAccountId || isNaN(invoiceAccountId)) return;

        const req = alert.destroy({
            title: '연동을 해제하시겠습니까?',
            onConfirm: () => invoiceAccountApi.destroy(orgId, invoiceAccountId),
        });

        setIsSyncLoading(true);
        req.then((res) => {
            if (!res) return;
            reload();
            toast.success('삭제가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setIsDisConnectLoading(false));
    };

    return (
        <div
            className={`cursor-pointer ${
                isSelected ? 'bg-indigo-50' : 'hover:bg-gray-100'
            } transition-all px-3 py-3 rounded-box flex justify-between ${isSyncLoading ? 'animate-pulse' : ''}`}
            onClick={() => onClick()}
        >
            <div>
                <GoogleProfile tokenData={invoiceAccount.googleTokenData} />
            </div>
            <div className="flex items-stretch justify-between">
                <div className="flex items-center justify-center pl-4">
                    <MoreDropdown
                        onSync={onSync}
                        onDelete={onDisConnect}
                        isSyncLoading={isSyncLoading}
                        isDisConnectLoading={isDisConnectLoading}
                        Profile={() => (
                            <div className="border-b py-2 mb-2 px-3">
                                <p className="text-11">마지막 동기화</p>
                                <p className="text-13">{yyyy_mm_dd_hh_mm(invoiceAccount.updatedAt)}</p>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
});

/** 계정으로 조회된 구독 Section */
const SubscriptionListSection = memo(() => {
    const invoiceAccount = useRecoilValue(selectedInvoiceAccountAtom);
    const subscriptions = (invoiceAccount && invoiceAccount.subscriptions) || [];

    return (
        <div className="col-span-3">
            <h3 className="flex items-center gap-2 mb-6">
                <FcFinePrint size={30} />{' '}
                <span>계정으로 조회된 구독 {subscriptions.length ? `(${subscriptions.length})` : ''}</span>
            </h3>

            <div className="card card-body px-3 py-2 card-bordered bg-white gap-0">
                <div className="border-b-2 px-3 py-2 grid grid-cols-6 font-semibold">
                    <div className="col-span-2"></div>
                    <div className="text-13 flex items-center justify-start">결제주기</div>
                    <div className="text-13 flex items-center justify-end">최신 결제금액</div>
                    <div className="text-13 flex items-center justify-end">마지막 결제일</div>
                    <div></div>
                </div>
                {subscriptions.map((subscription, i) => (
                    <SubscriptionItem data={subscription} key={i} />
                ))}
            </div>
        </div>
    );
});

/** 계정으로 조회된 구독 */
const SubscriptionItem = memo((props: {data: SubscriptionDto}) => {
    const appShowModal = useAppShowModal();
    const {data: subscription} = props;

    return (
        <div className="border-b px-3 py-4 last:border-b-0 grid grid-cols-6">
            <div className="col-span-2">
                <ProductProfile subscription={subscription} />
            </div>
            <div className="flex items-center justify-start">
                <BillingCycleTypeColumn subscription={subscription} onChange={console.log} />
            </div>
            <div className="flex items-center justify-end">
                <Money money={subscription.currentBillingAmount || undefined} />
            </div>
            <div className="text-14 flex items-center justify-end">
                {subscription.lastPaidAt && yyyy_mm_dd(subscription.lastPaidAt)}
            </div>

            <div className="flex items-center justify-end">
                <button className="btn btn-scordi btn-sm" onClick={() => appShowModal.show(subscription.id)}>
                    상세
                </button>
            </div>
        </div>
    );
});

const Money = ({money}: {money?: MoneyDto}) => {
    if (!money) return <></>;

    return (
        <TagUI className="!text-14">
            <small>{money.symbol}</small>
            {money.amount.toLocaleString()}
        </TagUI>
    );
};
