import {BasicModal} from '^components/modals/_shared/BasicModal';
import {X} from 'lucide-react';
import React, {useState} from 'react';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {hh_mm, lpp} from '^utils/dateTime';
import {subHours} from 'date-fns';
import {ProductSelector} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefBillingHistoryListContent/CreateBillingHistoryModal/ProductSelector';
import {ProductDto} from '^models/Product/type';
import {codefBillingHistoriesAdminApi} from '^models/CodefBillingHistory/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {LinkTo} from '^components/util/LinkTo';
import {useIdParam} from '^atoms/common';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';

interface Props {
    codefBillingHistory: CodefBillingHistoryDto | undefined;
    onClose: () => void;
}

export const CreateBillingHistoryModal = (props: Props) => {
    const {codefBillingHistory, onClose} = props;
    const orgId = useIdParam('id');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDto>();
    const [createdBillingHistory, setCreatedBillingHistory] = useState<BillingHistoryDto>();

    const yyyymmdd = codefBillingHistory ? lpp(subHours(codefBillingHistory.usedAt, 9), 'P') : '';
    const hhmmss = codefBillingHistory ? hh_mm(subHours(codefBillingHistory.usedAt, 9)) : '';

    const close = () => {
        setCreatedBillingHistory(undefined);
        setSelectedProduct(undefined);
        onClose();
    };

    const handleCreate = () => {
        if (!codefBillingHistory) return;
        if (!selectedProduct) return;
        if (!confirm('정말 생성할까요?')) return;

        setIsLoading(true);
        codefBillingHistoriesAdminApi
            .createBillingHistory(codefBillingHistory.id, selectedProduct.id)
            .then((res) => res.data)
            .then((billingHistory) => setCreatedBillingHistory(billingHistory))
            .then(() => toast.success('생성 완료.'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <BasicModal open={!!codefBillingHistory} onClose={onClose}>
            {!createdBillingHistory ? (
                <div className="flex flex-col gap-5 p-8 max-w-2xl modal-box keep-all h-[100vh]">
                    <section className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-start w-full">
                            <header className="flex flex-col gap-1">
                                <p className="text-scordi text-14">스코디 결제내역으로 직접 등록</p>
                                <div className="text-gray-700 text-20 font-semibold">
                                    <div>
                                        <span className="inline-flex items-center gap-1">
                                            <span>{yyyymmdd}</span> <span>{hhmmss}</span>
                                        </span>{' '}
                                        에{' '}
                                        <span className="text-red-600 bg-red-100 py-0.5 px-1.5 rounded-md">
                                            {codefBillingHistory?.memberStoreName}
                                        </span>
                                        <span className="mx-2">에서</span>
                                        <span className="">
                                            {codefBillingHistory?.isCanceled ? '결제취소' : '결제'}된
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="bg-yellow-100">
                                            <span>{codefBillingHistory?.usedAmountStr}</span>{' '}
                                            <small>({codefBillingHistory?.resAccountCurrency})</small>
                                        </span>
                                        <span className="ml-2">항목을 스코디에 등록할까요?</span>
                                    </div>
                                </div>
                            </header>
                            <div>
                                <X className="cursor-pointer size-6" onClick={close} />
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-1 w-full">
                        <ProductSelector onChange={setSelectedProduct} />
                    </section>

                    <section className="w-full text-center">
                        <div>기존에 구독이 존재하면 해당 구독에 결제내역을 넣고, 구독이 없었다면 생성합니다.</div>
                        <br />
                        <div>그래도 구독이 최종적으로 올바른 값을 반영하고 있는지 꼭 확인해주세요.</div>
                    </section>

                    <div className="mt-auto">
                        <button
                            type="button"
                            className={`btn btn-block ${selectedProduct ? 'btn-scordi' : 'btn-gray'} ${
                                isLoading ? 'loading' : ''
                            }`}
                            onClick={handleCreate}
                        >
                            {selectedProduct ? '생성하기' : '서비스를 선택해주세요'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-5 p-8 max-w-2xl modal-box keep-all h-[100vh]">
                    <section className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-start w-full">
                            <header className="flex flex-col gap-1">
                                <div className="text-gray-700 text-20 font-semibold">결제내역 생성 완료.</div>
                                <div className="text-16">생성된 결제내역이 올바른 구독에 들어갔는지 확인해주세요.</div>
                            </header>
                            <div>
                                <X className="cursor-pointer size-6" onClick={close} />
                            </div>
                        </div>
                    </section>

                    <div className="mt-auto">
                        <LinkTo
                            className={`btn btn-block ${selectedProduct ? 'btn-scordi' : 'btn-gray'} ${
                                isLoading ? 'loading' : ''
                            }`}
                            href={
                                createdBillingHistory.subscriptionId
                                    ? OrgSubscriptionDetailPageRoute.path(orgId, createdBillingHistory.subscriptionId)
                                    : createdBillingHistory.creditCardId
                                    ? OrgCreditCardShowPageRoute.path(orgId, createdBillingHistory.creditCardId)
                                    : '#'
                            }
                            target="_blank"
                        >
                            새 탭에서 확인하기
                        </LinkTo>
                    </div>
                </div>
            )}
        </BasicModal>
    );
};
