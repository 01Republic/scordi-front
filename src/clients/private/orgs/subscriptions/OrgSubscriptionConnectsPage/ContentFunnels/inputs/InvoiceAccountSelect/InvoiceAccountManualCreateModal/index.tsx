import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {InvoiceAccountManualCreateModalHeader} from './InvoiceAccountManualCreateModalHeader';
import {InvoiceAccountManualCreateSubmitButton} from './InvoiceAccountManualCreateSubmitButton';
import {useForm} from 'react-hook-form';
import {debounce} from 'lodash';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {CreateInvoiceAccountDto} from '^models/InvoiceAccount/type';

interface InvoiceAccountManualCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

export const InvoiceAccountManualCreateModal = memo((props: InvoiceAccountManualCreateModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const form = useForm<CreateInvoiceAccountDto>();

    const onSubmit = debounce((dto: CreateInvoiceAccountDto) => {
        invoiceAccountApi.createV3(orgId, dto).then(() => {
            onCreate();
        });
    }, 500);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box"
        >
            <InvoiceAccountManualCreateModalHeader onClose={onClose} />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="py-4 flex flex-col gap-4 items-stretch">
                    <div>
                        <label>
                            <p className="text-12 text-gray-500 mb-1.5">이메일</p>
                            <input
                                type="email"
                                placeholder="tech@01republic.io"
                                className="input border-gray-200 bg-gray-100 text-16 w-full"
                                {...form.register('email', {
                                    required: true,
                                })}
                                required
                            />
                        </label>
                    </div>
                </div>
                <InvoiceAccountManualCreateSubmitButton />
            </form>
        </SlideUpModal>
    );
});
InvoiceAccountManualCreateModal.displayName = 'InvoiceAccountManualCreateModal';
