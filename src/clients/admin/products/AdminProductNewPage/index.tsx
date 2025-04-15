import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {CreateProductRequestDto} from '^models/Product/type';
import {useForm} from 'react-hook-form';
import {productApi} from '^models/Product/api';
import {AdminProductsPageRoute} from '^pages/admin/products';
import {AdminDetailPageLayout} from '^admin/layouts/DetailPageLayout';
import {ProductForm} from '^admin/products/form/ProductForm';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {toast} from 'react-hot-toast';
import {AxiosError} from 'axios';
import {useRecoilValue} from 'recoil';
import {isSubmitBlockedAtom} from '^admin/products/form/atom';
import {AdminPageContainer} from '^admin/layouts';
import {errorToast} from '^api/api';

export const AdminProductNewPage = memo(() => {
    const router = useRouter();
    const form = useForm<CreateProductRequestDto>();
    const isSubmitBlocked = useRecoilValue(isSubmitBlockedAtom);

    const onSubmit = (data: CreateProductRequestDto) => {
        if (isSubmitBlocked) return;

        productApi
            .create(data)
            .then((res) => {
                toast.success('신규 등록 완료');
                router.replace(AdminProductPageRoute.path(res.data.id));
            })
            .catch((errorResponse: AxiosError<any>) => {
                const message = errorResponse.response?.data?.message;
                if (Array.isArray(message) && message.find((msg: string) => msg.includes('unique value'))) {
                    toast.error('중복값이 존재합니다.');
                    return;
                }
                errorToast(errorResponse);
            });
    };

    return (
        <AdminDetailPageLayout
            title="앱 추가"
            breadcrumbs={[{text: '앱 관리'}, {text: '앱 목록', href: AdminProductsPageRoute.path()}, {text: '앱 추가'}]}
        >
            <AdminPageContainer>
                <ProductForm form={form} onSubmit={onSubmit} />
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
