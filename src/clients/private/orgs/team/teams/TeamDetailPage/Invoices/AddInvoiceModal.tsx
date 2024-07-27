import React, {memo, useEffect} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {FiCheckCircle} from 'react-icons/fi';

interface AddInvoiceModalProps extends ModalProps {
    preItems?: TeamInvoiceAccountDto[];
}

export const AddInvoiceModal = memo(function AddInvoiceModal(props: AddInvoiceModalProps) {
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {isOpened, onClose} = props;
    const {result, search, reload} = useInvoiceAccounts();
    const [selected, setSelected] = React.useState<InvoiceAccountDto[]>([]);

    const onSave = () => {
        const requests = selected.map((invoice) => invoiceAccountApi.teamsApi.create(invoice.id, teamId));
        const req = Promise.allSettled(requests);
        req.then(() => {
            setSelected([]);
            onClose();
        });
    };

    const entries = result.items.filter(
        (item) => !props.preItems?.map((item) => item.invoiceAccount?.id).includes(item.id),
    );

    useEffect(() => {
        !!orgId && !!teamId && reload();
    }, [orgId, teamId]);

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="lg">
            <h3 className="font-bold text-xl">팀에 등록할 청구서 계정을 선택해 주세요</h3>
            <p className={'text-gray-500 mb-3'}>이미 추가된 결제수단은 뺐어요</p>

            <div className="py-4 space-y-1">
                {entries.map((invoice, i) => (
                    <div
                        tabIndex={0}
                        key={i}
                        className={`-mx-4 px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation ${
                            selected.includes(invoice) && 'bg-gray-50'
                        }`}
                        onClick={() => {
                            if (selected.includes(invoice)) {
                                setSelected(selected.filter((item) => item !== invoice));
                            } else {
                                setSelected([...selected, invoice]);
                            }
                        }}
                    >
                        <InvoiceAccountProfile invoiceAccount={invoice} />
                        <div>{selected.includes(invoice) && <FiCheckCircle className="text-scordi text-xl" />}</div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-3">
                <button type="button" className="btn btn-link !no-underline text-scordi-500" onClick={onClose}>
                    취소
                </button>
                <button className="btn btn-scordi-500" onClick={onSave}>
                    저장하기
                </button>
            </div>
        </SlideUpModal>
    );
});
