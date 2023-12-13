import React, {memo, useEffect, useState} from 'react';
import {BottomUpModal} from '^v3/share/modals/containers/BottomUpModal';
import {useInvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal/hook';
import {Avatar} from '^components/Avatar';
import {BsCheckCircle, BsCheckCircleFill} from 'react-icons/bs';

interface InvoiceAccountSelectModalProps {
    onSubmit?: (selectedId: number) => Promise<any> | any;
    onSelect?: () => any;
}

export const InvoiceAccountSelectModal = memo((props: InvoiceAccountSelectModalProps) => {
    const {isShow, hide, result} = useInvoiceAccountSelectModal();
    const [selectedId, setSelectedId] = useState<number>(0);
    const {onSelect, onSubmit} = props;

    useEffect(() => {
        if (!isShow) {
            setSelectedId(0);
        }
    }, [isShow]);

    const toggleSelect = (selectedId: number) => {
        setSelectedId(selectedId);
    };

    const submitSelected = () => {
        onSubmit && onSubmit(selectedId);
        hide();
    };

    console.log('result.items', result.items);
    const {totalItemCount} = result.pagination;

    return (
        <BottomUpModal
            modalId="InvoiceAccountSelectModal"
            size="lg"
            isShow={isShow}
            className="p-0"
            onClose={() => hide()}
        >
            <div className="p-4 bg-scordi">
                <h3 className="font-bold text-lg text-white">
                    청구메일 수신 계정이 {totalItemCount.toLocaleString()}개 있어요.
                </h3>
                <p className="text-sm text-white opacity-70">동기화를 지속할 계정 하나만 선택해주세요.</p>
            </div>

            <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                <div className="flex-1 py-4 px-2 text-sm">
                    <ul>
                        {(result.items || [])
                            .filter((e) => e)
                            .map((invoiceAccount, i) => (
                                <li key={i}>
                                    <div
                                        onClick={() => {
                                            toggleSelect(invoiceAccount.id);
                                        }}
                                        className="flex items-center gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-neutral rounded-box cursor-pointer group"
                                    >
                                        <Avatar
                                            src={invoiceAccount?.image || ''}
                                            className="w-9 h-9 outline outline-offset-1 outline-slate-100 rounded-full"
                                        />

                                        <div className="flex-1">
                                            <p className="text-[16px]">
                                                <span>{invoiceAccount.email}</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center">
                                            <button className="relative">
                                                {selectedId === invoiceAccount.id ? (
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
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            <div className="p-4 bg-white">
                <button
                    disabled={selectedId < 1}
                    className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"
                    onClick={submitSelected}
                >
                    {selectedId < 1 ? '선택한 항목이 없습니다' : `완료`}
                </button>
            </div>
        </BottomUpModal>
    );
});
InvoiceAccountSelectModal.displayName = 'InvoiceAccountSelectModal';
