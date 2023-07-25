import {memo} from 'react';
import {useRouter} from 'next/router';
import {CreateApplicationPrototypeRequestDto} from '^types/applicationPrototype.type';
import {useForm} from 'react-hook-form';
import {applicationPrototypeApi} from '^api/applicationPrototype.api';
import {AdminEditPrototypePageRoute} from '^pages/admin/prototypes/[id]/edit';

export const AdminPrototypeNewPage = memo(() => {
    const router = useRouter();
    const form = useForm<CreateApplicationPrototypeRequestDto>();

    const onSubmit = (data: CreateApplicationPrototypeRequestDto) => {
        applicationPrototypeApi.create(data).then((res) => {
            router.replace(AdminEditPrototypePageRoute.path(res.data.id));
        });
    };

    return <></>;
});
