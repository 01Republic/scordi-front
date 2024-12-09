import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {FaPlus} from 'react-icons/fa6';
import {toast} from 'react-hot-toast';
import {
    InvoiceAccountCreateMethodModal,
    InvoiceAccountAutoCreateModal,
    InvoiceAccountCreateMethod,
} from '^clients/private/_modals/invoice-accounts';
import {swalHTML} from '^components/util/dialog';
import {InvoiceAccountCreateInManualSwalForm} from '^models/InvoiceAccount/components';

interface AddInvoiceAccountModalProps {
    reload: () => any;
}

export const AddInvoiceAccountModal = memo((props: AddInvoiceAccountModalProps) => {
    const {reload} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [isCreateMethodModalOpened, setCreateMethodModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);

    return (
        <>
            <button
                tabIndex={0}
                className="btn btn-scordi gap-2 mb-1 no-animation btn-animation"
                onClick={() => setCreateMethodModalOpened(true)}
            >
                <FaPlus />
                <span className="mr-1.5">메일계정 추가</span>
            </button>

            <InvoiceAccountCreateMethodModal
                isOpened={isCreateMethodModalOpened}
                onClose={() => setCreateMethodModalOpened(false)}
                onSelect={(createMethod: InvoiceAccountCreateMethod) => {
                    switch (createMethod) {
                        case InvoiceAccountCreateMethod.Auto:
                            setCreateMethodModalOpened(false);
                            return setCreateAutoModalOpened(true);
                        case InvoiceAccountCreateMethod.Manual:
                        default:
                            swalHTML(<InvoiceAccountCreateInManualSwalForm orgId={orgId} onSave={() => reload()} />);
                            return;
                    }
                }}
            />

            <InvoiceAccountAutoCreateModal
                isOpened={isCreateAutoModalOpened}
                onClose={() => setCreateAutoModalOpened(false)}
                onCreate={() => {
                    toast.success('계정을 저장했어요');
                    setCreateAutoModalOpened(false);
                    return reload();
                }}
                onRetry={() => setCreateAutoModalOpened(true)}
            />
        </>
    );
});
AddInvoiceAccountModal.displayName = 'AddInvoiceAccountModal';
