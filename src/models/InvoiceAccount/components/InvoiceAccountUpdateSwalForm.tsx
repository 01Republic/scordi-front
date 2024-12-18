import React, {memo, useEffect} from 'react';
import {toast} from 'react-hot-toast';
import {debounce} from 'lodash';
import {useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {SwalForm} from '^components/util/dialog/swal-form';
import {InvoiceAccountDto, UpdateInvoiceAccountDto} from '^models/InvoiceAccount/type';

interface InvoiceAccountUpdateFormProps {
    invoiceAccount: InvoiceAccountDto;
    onSave: (invoiceAccount: InvoiceAccountDto) => any;
}

export const InvoiceAccountUpdateSwalForm = memo((props: InvoiceAccountUpdateFormProps) => {
    const {invoiceAccount, onSave} = props;
    const id = invoiceAccount.id;
    const orgId = invoiceAccount.organizationId;
    const form = useForm<UpdateInvoiceAccountDto>();

    useEffect(() => {
        form.setValue('email', invoiceAccount.email);
    }, []);

    const onSubmit = debounce(async (dto: UpdateInvoiceAccountDto) => {
        await invoiceAccountApi.updateV3(orgId, id, dto).then((res) => {
            toast.success('변경사항을 저장했어요.');
            onSave(res.data);
            Swal.close();
        });
    }, 500);

    return (
        <SwalForm confirmBtnText="확인" onSubmit={form.handleSubmit(onSubmit)}>
            <section className="">
                <h4 className="text-xl sm:text-lg text-left">수정할 청구서 메일을 입력해주세요.</h4>
            </section>

            <section className="mb-1">
                <div>
                    <label>
                        <input
                            autoFocus
                            type="email"
                            className="input sm:input-sm input-bordered w-full bg-gray-100"
                            {...form.register('email')}
                            required
                        />
                    </label>
                </div>
            </section>
        </SwalForm>
    );
});
InvoiceAccountUpdateSwalForm.displayName = 'InvoiceAccountUpdateForm';
