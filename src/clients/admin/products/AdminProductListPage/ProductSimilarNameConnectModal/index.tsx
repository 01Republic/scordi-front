import React, {memo, useEffect} from 'react';
import {useForm, useFieldArray, FormProvider} from 'react-hook-form';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {CardTable, CardTableTH, CardTableTR} from '^admin/share';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {X} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {useProductSimilarNameList, useUpdateProductSimilarName} from '^models/ProductSimilarName/hook';
import {BlockForm} from '^admin/products/AdminProductListPage/ProductSimilarNameConnectModal/form/BlockForm';
import {ProductSearchForm} from '^admin/products/AdminProductListPage/ProductSimilarNameConnectModal/form/ProductSearchForm';
import {ProductSimilarNameConnectModalFormValues} from '^admin/products/AdminProductListPage/ProductSimilarNameConnectModal/type';
import {useProductList} from '^models/Product/hook';
import {CreateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type';
import {debounce} from 'lodash';

interface Props {
    isOpened: boolean;
    onClose: () => void;
}

export const ProductSimilarNameConnectModal = memo((props: Props) => {
    const {isOpened, onClose} = props;
    const {result, orderBy} = useProductSimilarNameList(null, {
        where: {productId: 'NULL'},
        itemsPerPage: 0,
        order: {id: 'DESC'},
    });

    const {
        result: products,
        search,
        reload,
    } = useProductList({
        itemsPerPage: 0,
        order: {id: 'DESC'},
    });

    const {mutateAsync: updateSimilarName} = useUpdateProductSimilarName();

    const methods = useForm<ProductSimilarNameConnectModalFormValues>({
        defaultValues: {mappings: []},
        mode: 'all',
    });

    const {handleSubmit, control} = methods;

    const {fields, replace} = useFieldArray({
        control,
        name: 'mappings',
    });

    useEffect(() => {
        if (!result.items.length) return;
        replace(
            result.items.map((item) => ({
                id: item.id,
                data: {
                    name: item.name,
                    productId: item.productId,
                    isBlock: item.isBlock,
                },
            })),
        );
    }, [result.items, replace]);

    const onSearch = debounce((keyword: string) => {
        search({keyword});
    }, 300);

    const onSubmit = (formData: ProductSimilarNameConnectModalFormValues) => {
        const changed = formData.mappings.filter((item, i) => {
            const original = result.items[i];
            return item.data.productId !== original.productId || item.data.isBlock !== original.isBlock;
        });

        if (changed.length === 0) {
            toast('변경된 항목이 없습니다.');
            return;
        }

        Promise.all(changed.map((m) => updateSimilarName({id: m.id, data: m.data})))
            .then(() => {
                toast.success('저장 완료');
                reload();
                onClose();
            })
            .catch(() => {
                toast.error('저장 중 오류');
            });
    };

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="mx-auto w-full self-start sm:mt-20 sm:max-w-screen-md">
                <div className="w-full"></div>
                <div className="modal-box max-w-screen-md w-full scale-100 p-8 rounded-none sm:rounded-box min-h-screen max-h-screen sm:min-h-min sm:max-h-[initial] relative flex flex-col gap-5">
                    <section className="flex items-center justify-between relative">
                        <div>
                            <p className="font-medium text-12 text-scordi">발견된 앱 이름 연결하기</p>
                            <h3 className="font-bold text-xl">발견된 앱 이름을 기존 앱과 연결해요.</h3>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-square btn-sm !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all absolute top-0 right-0 z-[1]"
                        >
                            <X className="size-8" />
                        </button>
                    </section>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardTable>
                                <CardTableTH className="grid-cols-1 lg:grid-cols-5 text-14">
                                    <div className="col-span-2">name</div>
                                    <div className="col-span-2">연결할 앱</div>
                                    <SortableTH
                                        sortKey="[isBlock]"
                                        onClick={orderBy}
                                        className="col-span-1 flex items-center justify-center"
                                    >
                                        block 여부
                                    </SortableTH>
                                </CardTableTH>
                                <div className="overflow-y-auto max-h-96">
                                    {fields.map((product, idx) => {
                                        return (
                                            <CardTableTR
                                                key={product.id}
                                                gridClass="grid-cols-1 lg:grid-cols-5"
                                                borderBottom
                                            >
                                                <div className="col-span-2 flex items-center text-12">
                                                    {product.data.name}
                                                </div>

                                                {/* 연결할 앱 선택 */}
                                                <ProductSearchForm
                                                    rowIndex={idx}
                                                    products={products.items}
                                                    search={onSearch}
                                                />

                                                {/* block 여부 */}
                                                <BlockForm rowIndex={idx} value={product.data.isBlock} />
                                            </CardTableTR>
                                        );
                                    })}
                                </div>
                            </CardTable>

                            {/* 저장 버튼 */}
                            <section className="w-full flex justify-end mt-4">
                                <button className="btn btn-md btn-scordi">저장</button>
                            </section>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </AnimatedModal>
    );
});
