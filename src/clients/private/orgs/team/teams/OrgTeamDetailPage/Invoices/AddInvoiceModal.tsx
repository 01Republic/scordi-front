import React, {memo, useEffect} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {BsCheckCircle, BsCheckCircleFill} from 'react-icons/bs';
import {toast} from 'react-hot-toast';

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
            toast.success('청구서 메일을 연결했어요.');
            setSelected([]);
            onClose();
        });
    };

    const onCloseModal = () => {
        setSelected([]);
        onClose();
    };

    const entries = result.items.filter(
        (item) => !props.preItems?.map((item) => item.invoiceAccount?.id).includes(item.id),
    );

    useEffect(() => {
        !!orgId && !!teamId && reload();
    }, [orgId, teamId]);

    return (
        <div
            data-modal="TeamMemberSelectModal-for-AppShowModal"
            className={`modal modal-bottom ${isOpened ? 'modal-open' : ''}`}
            onClick={onCloseModal}
        >
            <div
                className="modal-box max-w-lg p-0"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <div className="p-4 bg-scordi">
                    <h3 className="font-bold text-lg text-white">팀에 연결할 청구서 메일을 모두 선택해 주세요.</h3>
                    <p className="text-sm text-white opacity-70">이미 연결된 청구서 메일은 제외했어요.</p>
                </div>
                <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                    <div className="flex-1 py-4 px-2 text-sm">
                        <ul>
                            {entries.map((invoice, i) => (
                                <div
                                    tabIndex={0}
                                    key={i}
                                    className={`flex items-center gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-neutral rounded-box cursor-pointer group justify-between`}
                                    onClick={() => {
                                        if (selected.includes(invoice)) {
                                            setSelected(selected.filter((item) => item !== invoice));
                                        } else {
                                            setSelected([...selected, invoice]);
                                        }
                                    }}
                                >
                                    <InvoiceAccountProfile invoiceAccount={invoice} />
                                    <div>
                                        {selected.includes(invoice) ? (
                                            <BsCheckCircleFill
                                                size={24}
                                                strokeWidth={0.3}
                                                className="text-indigo-500"
                                            />
                                        ) : (
                                            <BsCheckCircle
                                                size={24}
                                                strokeWidth={0.3}
                                                className="text-indigo-200 group-hover:text-indigo-300"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <button
                        disabled={selected.length < 1}
                        className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"
                        onClick={onSave}
                    >
                        {selected.length < 1 ? '선택한 항목이 없습니다' : `${selected.length}개의 선택된 항목`}
                    </button>
                </div>
            </div>
        </div>
    );
});
