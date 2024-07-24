import React, {memo, useEffect} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {FaCheck} from 'react-icons/fa6';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';

type AddInvoiceModalProps = ModalProps;

export const AddInvoiceModal = memo(function AddInvoiceModal(props: AddInvoiceModalProps) {
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {isOpened, onClose} = props;
    const {result, search, reload} = useInvoiceAccounts();
    const [selected, setSelected] = React.useState<InvoiceAccountDto[]>([]);

    const onSave = () => {
        const requests = selected.map((invoice) =>
            teamInvoiceAccountApi.create(orgId, {teamId: teamId, invoiceAccountId: invoice.id}),
        );
        const req = Promise.allSettled(requests);
        req.then(() => onClose());
    };

    useEffect(() => {
        !!orgId && !!teamId && reload();
    }, [orgId, teamId]);

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="lg">
            <h3 className="font-bold text-xl">팀에 등록할 청구서 계정을 선택해 주세요</h3>

            <div className="py-4 space-y-1">
                {result.items.map((invoice, i) => (
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
                        <div>
                            <p className="font-medium text-16">{invoice.email}</p>
                        </div>
                        <div>{selected.includes(invoice) && <FaCheck className="text-scordi" />}</div>
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
