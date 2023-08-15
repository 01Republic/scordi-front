import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {CreateApplicationPrototypeRequestDto} from '^types/applicationPrototype.type';
import {useForm} from 'react-hook-form';
import {applicationPrototypeApi} from '^api/applicationPrototype.api';
import {AdminPrototypesPageRoute} from '^pages/admin/prototypes';
import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {PrototypeForm} from '^components/pages/admin/prototypes/form/PrototypeForm';
import {AdminPrototypePageRoute} from '^pages/admin/prototypes/[id]';

export const AdminPrototypeNewPage = memo(() => {
    const router = useRouter();
    const form = useForm<CreateApplicationPrototypeRequestDto>();

    const onSubmit = (data: CreateApplicationPrototypeRequestDto) => {
        applicationPrototypeApi.create(data).then((res) => {
            router.replace(AdminPrototypePageRoute.path(res.data.id));
        });
    };

    return (
        <AdminDetailPageLayout
            title="앱 추가"
            breadcrumbs={[
                {text: '앱 관리'},
                {text: '앱 목록', href: AdminPrototypesPageRoute.path()},
                {text: '앱 추가'},
            ]}
        >
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <PrototypeForm form={form} onSubmit={onSubmit} />
                </div>
            </div>
        </AdminDetailPageLayout>
    );
});
