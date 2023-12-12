import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {UpdateProductRequestDto} from '^models/Product/type';
import {productApi} from '^models/Product/api';
import {toast} from 'react-toastify';
import {adminProductDetail} from '^components/pages/admin/products/AdminProductDetailpage';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ProductForm} from '^components/pages/admin/products/form/ProductForm';
import {AxiosError} from 'axios';
import {isSubmitBlockedAtom} from '^admin/products/form/atom';

export const EditProductDetail = memo(() => {
    const [product, setProduct] = useRecoilState(adminProductDetail);
    const form = useForm<UpdateProductRequestDto>();
    const isSubmitBlocked = useRecoilValue(isSubmitBlockedAtom);

    const onSubmit = (data: UpdateProductRequestDto) => {
        if (!product) return;
        if (isSubmitBlocked) return;

        if (data.nameKo === product.nameKo) delete data.nameKo;
        if (data.nameEn === product.nameEn) delete data.nameEn;

        productApi
            .update(product.id, data)
            .then((res) => {
                if (res.status === 200) {
                    setProduct(res.data);
                    toast.success('변경 저장 완료');
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
