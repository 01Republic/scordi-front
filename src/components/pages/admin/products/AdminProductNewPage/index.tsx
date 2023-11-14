import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {CreateProductRequestDto} from '^models/Product/type';
import {useForm} from 'react-hook-form';
import {productApi} from '^models/Product/api';
import {AdminProductsPageRoute} from '^pages/admin/products';
import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {ProductForm} from '^components/pages/admin/products/form/ProductForm';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';

export const AdminProductNewPage = memo(() => {
    const router = useRouter();
    const form = useForm<CreateProductRequestDto>();

    const onSubmit = (data: CreateProductRequestDto) => {
        productApi.create(data).then((res) => {
            router.replace(AdminProductPageRoute.path(res.data.id));
        });
    };

    return (
        <AdminDetailPageLayout
            title="앱 추가"
            breadcrumbs={[{text: '앱 관리'}, {text: '앱 목록', href: AdminProductsPageRoute.path()}, {text: '앱 추가'}]}
        >
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <ProductForm form={form} onSubmit={onSubmit} />
                </div>
            </div>
        </AdminDetailPageLayout>
    );
});
