import React, {memo} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {useModal} from '^v3/share/modals/useModal';
import {newAppModal} from '^components/pages/v3/share/modals/NewAppModal/atom';
import {newInvoiceAccountModal} from '^v3/share/modals/NewInvoiceAccountModal/atom';
import {useSubscriptionMenuSummaryV2} from '^models/SubscsriptionSummary/hook';

export const SubscriptionListPageTitle = memo(function SubscriptionListPageTitle() {
    const {isLoading, result} = useSubscriptionMenuSummaryV2();
    const {open: openNewAppModal} = useModal(newAppModal);
    const invoiceAccountModal = useModal(newInvoiceAccountModal);

    const onClick = () => {
        openNewAppModal();
        invoiceAccountModal.setIsShow(false);
    };

    return (
        <section className="mb-6 flex justify-between flex-col md:flex-row">
            <h1>
                {isLoading ? (
                    <span className="animate-pulse rounded-full bg-slate-200 inline-block w-[300px] h-[38px]" />
                ) : (
                    <span className="block">
                        <span className="text-scordi">{result.total?.toLocaleString()}개</span>의 구독이 등록되어있어요
                    </span>
                )}
            </h1>

            <div>
                <button
                    onClick={onClick}
                    className="btn btn-scordi m-1 gap-2 whitespace-nowrap flex-nowrap mt-8 md:mt-0 btn-lg md:btn-md w-full md:w-auto"
                >
                    새 구독 등록 <FaPlus />
                </button>
            </div>
        </section>
    );
});
