import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {UpdateProductRequestDto} from '^types/product.type';
import {productApi} from '^api/product.api';
import {toast} from 'react-toastify';
import {adminProductDetail} from '^components/pages/admin/products/AdminProductDetailpage';
import {useRecoilState} from 'recoil';
import {ProductForm} from '^components/pages/admin/products/form/ProductForm';

export const EditProductDetail = memo(() => {
    const [product, setProduct] = useRecoilState(adminProductDetail);
    const form = useForm<UpdateProductRequestDto>();

    const onSubmit = (data: UpdateProductRequestDto) => {
        if (!product) return;
        productApi.update(product.id, data).then((res) => {
            if (res.status === 200) {
                setProduct(res.data);
                toast.success('Successfully Updated.');
            }
        });
    };

    return <ProductForm form={form} onSubmit={onSubmit} product={product ?? null} />;
});
