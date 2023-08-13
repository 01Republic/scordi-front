import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {UpdateApplicationPrototypeRequestDto} from '^types/applicationPrototype.type';
import {updateApplicationPrototype} from '^api/applicationPrototype.api';
import {toast} from 'react-toastify';
import {adminPrototypeDetail} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage';
import {useRecoilState} from 'recoil';
import {PrototypeForm} from '^components/pages/admin/prototypes/form/PrototypeForm';

export const EditPrototypeDetail = memo(() => {
    const [prototype, setPrototype] = useRecoilState(adminPrototypeDetail);
    const form = useForm<UpdateApplicationPrototypeRequestDto>();

    const onSubmit = (data: UpdateApplicationPrototypeRequestDto) => {
        if (!prototype) return;
        updateApplicationPrototype(prototype.id, data).then((res) => {
            if (res.status === 200) {
                setPrototype(res.data);
                toast.success('Successfully Updated.');
            }
        });
    };

    return <PrototypeForm form={form} onSubmit={onSubmit} prototype={prototype ?? undefined}></PrototypeForm>;
});
