import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {debounce} from 'lodash';
import {useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {SwalForm} from '^components/util/dialog/swal-form';
import {CreateInvoiceAccountDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';

interface InvoiceAccountCreateInManualSwalFormProps {
    orgId: number;
    onSave: (invoiceAccount: InvoiceAccountDto) => any;
}

export const InvoiceAccountCreateInManualSwalForm = memo((props: InvoiceAccountCreateInManualSwalFormProps) => {
    const {orgId, onSave} = props;
    const form = useForm<CreateInvoiceAccountDto>();

    const onSubmit = debounce(async (dto: CreateInvoiceAccountDto) => {
        await invoiceAccountApi.createV3(orgId, dto).then((res) => {
            toast.success('저장했습니다.');
            onSave(res.data);
            Swal.close();
        });
    }, 500);

    return (
        <SwalForm onSubmit={form.handleSubmit(onSubmit)} confirmBtnText="저장">
            <section className="text-left pt-2">
                <p className="font-medium text-12 text-scordi">직접 추가하기</p>
                <h3 className="font-bold text-xl sm:text-lg">청구서를 어디서 받고 계세요?</h3>
            </section>

            <section className="mb-6 py-2">
                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">이메일</p>
                        <input
                            autoFocus
                            type="email"
                            placeholder="tech@01republic.io"
                            className="input input-bordered w-full bg-gray-100"
                            {...form.register('email')}
                            required
                        />
                    </label>
                </div>
            </section>
        </SwalForm>
    );
});
InvoiceAccountCreateInManualSwalForm.displayName = 'InvoiceAccountCreateInManualSwalForm';
