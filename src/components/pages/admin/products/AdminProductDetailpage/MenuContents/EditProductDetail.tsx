import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {UpdateProductRequestDto} from '^types/product.type';
import {productApi} from '^api/product.api';
import {toast} from 'react-toastify';
import {adminProductDetail} from '^components/pages/admin/products/AdminProductDetailpage';
import {useRecoilState} from 'recoil';
import {ProductForm} from '^components/pages/admin/products/form/ProductForm';
import {AxiosError, AxiosResponse} from 'axios';

export const EditProductDetail = memo(() => {
    const [product, setProduct] = useRecoilState(adminProductDetail);
    const form = useForm<UpdateProductRequestDto>();

    const onSubmit = (data: UpdateProductRequestDto) => {
        if (!product) return;

        if (data.nameKo === form.getValues('nameKo')) delete data.nameKo;
        if (data.nameEn === form.getValues('nameEn')) delete data.nameEn;

        productApi
            .update(product.id, data)
            .then((res) => {
                if (res.status === 200) {
                    setProduct(res.data);
                    toast.success('Successfully Updated.');
                }
            })
            .catch((errorResponse: AxiosError<any>) => {
                const message = errorResponse.response?.data?.message;
                if (Array.isArray(message) && message.find((msg: string) => msg.includes('unique value'))) {
                    toast.error('중복값이 존재합니다.');
                }
            });
    };

    return <ProductForm form={form} onSubmit={onSubmit} product={product ?? null} />;
});
