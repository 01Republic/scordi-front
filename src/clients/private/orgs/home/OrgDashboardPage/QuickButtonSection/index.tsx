import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {HiOutlineSquaresPlus} from 'react-icons/hi2';
import {GoCreditCard, GoMail} from 'react-icons/go';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {currentOrgAtom} from '^models/Organization/atom';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {QuickButton} from '^clients/private/orgs/home/OrgDashboardPage/QuickButtonSection/QuickButton';
import {useModal} from '^v3/share/modals';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';
import {CardAutoCreateModal, CardCreateMethod, CardCreateMethodModal} from '^clients/private/_modals/credit-cards';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {useRouter} from 'next/router';
import {
    InvoiceAccountAutoCreateModal,
    InvoiceAccountCreateMethod,
    InvoiceAccountCreateMethodModal,
} from '^clients/private/_modals/invoice-accounts';
import {swalHTML} from '^components/util/dialog';
import {InvoiceAccountCreateInManualSwalForm} from '^models/InvoiceAccount/components';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';

export const QuickButtonSection = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);
    const [isInvoiceCreateModalOpened, setIsInvoiceCreateModalOpened] = useState(false);
    const [isInvoiceCreateAutoModalOpened, setIsInvoiceCreateAutoModalOpened] = useState(false);

    return (
        <>
            <div className="flex gap-3">
                <QuickButton
                    text="구독 추가"
                    Icon={() => <HiOutlineSquaresPlus />}
                    url={orgId ? OrgSubscriptionSelectPageRoute.path(orgId) : '#'}
                />
                <QuickButton
                    text="결제수단 추가"
                    Icon={() => <GoCreditCard />}
                    onClick={() => setIsCardCreateMethodModalOpen(true)}
                />
                <QuickButton
                    text="청구서 메일 추가"
                    Icon={() => <GoMail />}
                    onClick={() => setIsInvoiceCreateModalOpened(true)}
                />
                <QuickButton text="구성원 추가" Icon={() => <AiOutlineUserAdd />} />
            </div>

            {/* 결제수단 등록 > 등록 방법 선택 */}
            <CardCreateMethodModal
                isOpened={isCardCreateMethodModalOpen}
                onClose={() => setIsCardCreateMethodModalOpen(false)}
                onSelect={(createMethod) => {
                    switch (createMethod) {
                        case CardCreateMethod.Auto:
                            return setIsCardAutoCreateModalOpen(true);
                        case CardCreateMethod.Manual:
                        default:
                            setIsCardAutoCreateModalOpen(false);
                            return router.push(OrgCreditCardNewPageRoute.path(orgId));
                    }
                }}
            />

            {/* 결제수단 등록 > 자동 등록 */}
            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => {
                    setIsCardAutoCreateModalOpen(false);
                }}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                }}
            />

            <InvoiceAccountCreateMethodModal
                isOpened={isInvoiceCreateModalOpened}
                onClose={() => setIsInvoiceCreateModalOpened(false)}
                onSelect={(createMethod: InvoiceAccountCreateMethod) => {
                    switch (createMethod) {
                        case InvoiceAccountCreateMethod.Auto:
                            setIsInvoiceCreateModalOpened(false);
                            return setIsInvoiceCreateAutoModalOpened(true);
                        case InvoiceAccountCreateMethod.Manual:
                        default:
                            swalHTML(<InvoiceAccountCreateInManualSwalForm orgId={orgId} onSave={() => null} />);
                            return;
                    }
                }}
            />

            <InvoiceAccountAutoCreateModal
                isOpened={isInvoiceCreateAutoModalOpened}
                onClose={() => setIsInvoiceCreateAutoModalOpened(false)}
                onCreate={() => {
                    toast.success('불러온 청구서 메일을 추가했어요.');
                    setIsInvoiceCreateAutoModalOpened(false);
                }}
                onRetry={() => setIsInvoiceCreateAutoModalOpened(true)}
            />
        </>
    );
};
