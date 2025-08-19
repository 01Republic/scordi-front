import React, {memo, useEffect, useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {useProductList} from '^models/Product/hook';
import {Path, useFormContext} from 'react-hook-form';
import {ProductSimilarNameConnectModalFormValues} from '^admin/products/AdminProductListPage/ProductSimilarNameConnectModal/type';
import {ProductDto} from '^models/Product/type';
import {DropdownContent} from '^v3/share/Dropdown';

interface ProductSearchFormProps {
    rowIndex: number;
    products: ProductDto[];
    search: (keyword: string) => void;
}

export const ProductSearchForm = memo((props: ProductSearchFormProps) => {
    const {rowIndex, products, search} = props;
    const triggerRef = useRef<HTMLDivElement>(null);

    const {register, setValue} = useFormContext<ProductSimilarNameConnectModalFormValues>();

    const fieldName = `mappings.${rowIndex}.data.productId` as Path<ProductSimilarNameConnectModalFormValues>;

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('');

    return (
        <div className="col-span-2 relative">
            <input type="hidden" {...register(fieldName)} />

            <div
                ref={triggerRef}
                className="flex items-center justify-between cursor-pointer px-4 py-2"
                onClick={() => {
                    setIsDropDownOpen((prev) => !prev);
                    if (!isDropDownOpen) search('');
                }}
            >
                <span className={`text-12 ${!selectedName ? 'text-gray-400' : ''}`}>
                    {selectedName || '앱 검색 또는 선택'}
                </span>
                <ChevronDown className="size-4" />
            </div>

            {/* 검색 & 앱 리스트가 보이는 드롭다운 */}
            <DropdownContent
                visible={isDropDownOpen}
                hide={() => setIsDropDownOpen(false)}
                triggerRef={triggerRef}
                backdrop
                allowScroll
                placement="bottom-start"
            >
                <ul className="dropdown-portal-content relative z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg max-h-60 overflow-auto">
                    <li className="border-b px-4 py-2">
                        <input
                            type="text"
                            className="w-full text-12"
                            placeholder="찾는 앱을 검색하세요"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onChange={(e) => search(e.target.value)}
                            autoFocus
                        />
                    </li>

                    {products.map((product) => (
                        <li
                            key={product.id}
                            className="px-4 py-2 hover:bg-neutral-100 active:bg-primaryColor-900 active:text-white cursor-pointer text-12"
                            onMouseDown={() => {
                                setValue(fieldName, product.id, {shouldDirty: true});
                                setSelectedName(product.name());
                                setIsDropDownOpen(false);
                            }}
                        >
                            {product.name()}
                        </li>
                    ))}
                </ul>
            </DropdownContent>
        </div>
    );
});
