import React, {memo, useEffect, useMemo, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {ProductDto} from '^types/product.type';
import {UseFormReturn} from 'react-hook-form';
import {UnSignedAccountFormData} from '^types/account.type';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {useSelectProductModal} from '../../SelectProductModal/hook';
import {MultiSelect, Option} from '^components/util/select/MultiSelect';
import {useProductsOfAccounts} from '^v3/share/modals/AccountListModal/ProductChangeModal/use-products-of-accounts';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import AsyncSelect from 'react-select/async';
import {ActionMeta, FormatOptionLabelMeta, SingleValue} from 'react-select';
import {Avatar} from '^components/Avatar';
import {ProductOption} from '^v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {ProductOptionMenu} from '^v3/share/modals/AccountListModal/form/SelectProduct/ProductOptionMenu';
import {ProductSelectedValue} from '^v3/share/modals/AccountListModal/form/SelectProduct/ProductSelectedValue';

interface SelectProductProps {
    form: UseFormReturn<UnSignedAccountFormData, any>;
}

function toOption(product: ProductDto): ProductOption {
    const label = product.name();
    const value = product.id;
    return {label, value};
}

export const SelectProduct = memo((props: SelectProductProps) => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {form} = props;
    const {open: openSelectProductModal} = useSelectProductModal();
    const [productId, setProductId] = useState<number>();
    const {Product} = useProductsOfAccounts(true);
    const product = useMemo(() => {
        if (!Product || !productId) return;
        return Product.findById(productId);
    }, [Product, productId]);

    useEffect(() => {
        if (form.getValues('productId') && !productId) {
            setProductId(form.getValues('productId'));
        }
    }, []);

    useEffect(() => {
        if (productId) form.setValue('productId', productId);
    }, [productId]);

    if (!Product) return <div className="w-full min-h-[70px] bg-slate-200 opacity-40" />;

    const search = async (inputValue: string): Promise<Option[]> => {
        const filtered = Product.all().filter((product) => {
            if (product.nameEn.toLowerCase().includes(inputValue)) return true;
            if (product.nameKo.toLowerCase().includes(inputValue)) return true;
            if (product.searchText.toLowerCase().includes(inputValue)) return true;
            if (product.companyName.toLowerCase().includes(inputValue)) return true;

            return false;
        });

        return filtered.map(toOption);
    };

    const ProductOptionLabel = (data: ProductOption, formatOptionLabel: FormatOptionLabelMeta<ProductOption>) => {
        const optionProductId = data.value;
        const optionProduct = Product.findById(optionProductId);

        if (formatOptionLabel.context === 'menu') {
            return <ProductOptionMenu product={optionProduct} data={data} formatOptionLabel={formatOptionLabel} />;
        } else {
            return <ProductSelectedValue product={optionProduct} data={data} formatOptionLabel={formatOptionLabel} />;
        }
    };

    return (
        <>
            <input type="hidden" {...form.register('productId')} />

            <div className="w-full">
                <div className="w-full">
                    <div className="col-span-1 mb-2">서비스</div>
                    <div className="col-span-2">
                        <AsyncSelect
                            value={product ? toOption(product) : null}
                            loadOptions={search}
                            defaultOptions={Product.all().map(toOption)}
                            className="select-underline input-underline"
                            placeholder="서비스를 선택해주세요"
                            onChange={(newValue, actionMeta) => {
                                switch (actionMeta.action) {
                                    case 'select-option':
                                        return newValue ? setProductId(newValue.value) : null;
                                }
                            }}
                            formatOptionLabel={ProductOptionLabel}
                        />
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    );
});
