import React, {memo} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {useRecoilValue} from 'recoil';
import {subscriptionsForCurrentOrgState} from '^v3/V3OrgAppsPage/atom';
import {useModal} from '^v3/share/modals/useModal';
import {NewAppModal} from '^components/pages/v3/share/modals/NewAppModal';
import {newAppModal} from '^components/pages/v3/share/modals/NewAppModal/atom';
import {newInvoiceAccountModal} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/atom';

export const SubscriptionListPageTitle = memo(function SubscriptionListPageTitle() {
    const subscriptions = useRecoilValue(subscriptionsForCurrentOrgState);
    const {isShow, open} = useModal(newAppModal);
    const invoiceAccountModal = useModal(newInvoiceAccountModal);

    const onClick = () => {
        open();
        invoiceAccountModal.setIsShow(false);
    };

    return (
        <section className="mb-6 flex justify-between flex-col md:flex-row">
            <h1>
                <span className="block">
                    <span className="text-scordi">{subscriptions.length}개</span>의 서비스를 쓰고 있어요
                </span>
            </h1>

            <div>
                <button
                    onClick={onClick}
                    className="btn btn-scordi m-1 gap-2 whitespace-nowrap flex-nowrap mt-8 md:mt-0 btn-lg md:btn-md w-full md:w-auto"
                >
                    서비스 등록 <FaPlus />
                </button>
            </div>

            {isShow && <NewAppModal />}
        </section>
    );
});
