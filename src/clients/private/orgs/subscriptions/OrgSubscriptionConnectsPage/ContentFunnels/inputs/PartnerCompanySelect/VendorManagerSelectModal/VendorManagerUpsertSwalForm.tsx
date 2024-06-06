import React, {memo, useEffect} from 'react';
import {UpsertVendorManagerRequestDto, VendorManagerDto} from '^models/VendorManager/type';
import {SwalForm} from '^components/util/dialog/swal-form';
import {useForm} from 'react-hook-form';
import {debounce} from 'lodash';
import {VendorCompanyDto} from '^models/VendorCompany/type';
import {vendorManagerApi} from '^models/VendorManager/api';
import {toast} from 'react-hot-toast';
import Swal from 'sweetalert2';

interface VendorManagerUpsertSwalFormProps {
    orgId: number;
    vendorCompany: VendorCompanyDto;
    name: string;
    onSave: (vendorManager: VendorManagerDto) => any;
}

export const VendorManagerUpsertSwalForm = memo((props: VendorManagerUpsertSwalFormProps) => {
    const {orgId, vendorCompany, name, onSave} = props;
    const form = useForm<UpsertVendorManagerRequestDto>();

    useEffect(() => {
        form.setValue('vendorCompanyName', vendorCompany.name);
        form.setValue('name', name);
    }, [vendorCompany.name, name]);

    const onSubmit = debounce(async (dto: UpsertVendorManagerRequestDto) => {
        vendorManagerApi.upsert(orgId, dto).then((res) => {
            toast.success('저장했습니다.');
            onSave(res.data);
            Swal.close();
        });
    }, 500);

    return (
        <SwalForm onSubmit={form.handleSubmit(onSubmit)} confirmBtnText="확인">
            <section className="">
                <h4 className="text-xl sm:text-lg text-left">
                    <span className="text-scordi">
                        {form.watch('vendorCompanyName')} - {form.watch('name')}
                    </span>
                    님의 추가 정보가 있나요?
                </h4>
                <p className="text-14 text-gray-400">지금 입력하지 않으시려면, 비워둔 채로 확인 버튼을 눌러주세요</p>
            </section>

            <section className="mb-4 flex flex-col gap-3">
                <div className="">
                    <label>
                        <p className="text-14 mb-1">이메일</p>
                        <input
                            autoFocus
                            type="email"
                            className="input sm:input-sm input-bordered w-full bg-gray-100"
                            {...form.register('email')}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-14 mb-1">전화번호</p>
                        <input
                            type="tel"
                            className="input sm:input-sm input-bordered w-full bg-gray-100"
                            {...form.register('phone')}
                        />
                    </label>
                </div>
            </section>
        </SwalForm>
    );
});
VendorManagerUpsertSwalForm.displayName = 'VendorManagerUpsertSwalForm';
