import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {useUnmount} from '^hooks/useUnmount';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';
import {useSubscriptionListOfProductDetailForAdmin} from '^models/Subscription/hook/admin';
import {adminProductDetail} from '^admin/products/AdminProductDetailpage';
import {CardTablePanel} from '^admin/share';
import {LoadableBox} from '^components/util/loading';
import {ProductSubscriptionListSearchInput} from './ProductSubscriptionListSearchInput';
import {ProductSubscriptionItem} from './ProductSubscriptionItem';

export const ProductSubscriptionList = memo(function ProductSubscriptionList() {
    const product = useRecoilValue(adminProductDetail);
    const {result, search, isLoading, reset, reload, changePageSize, movePage} =
        useSubscriptionListOfProductDetailForAdmin();

    const findAll = async (params: FindAllSubscriptionsQuery = {}) => {
        if (!product) return;
        return search({
            relations: ['organization', 'product', 'billingHistories', 'teamMembers', 'invoiceAccounts'],
            order: {id: 'DESC'},
            ...params,
            where: {productId: product.id, ...(params.where || {})},
        });
    };

    useEffect(() => {
        product && findAll();
    }, [product]);

    useUnmount(() => reset());

    if (!product) return <></>;

    const {items, pagination} = result;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2>
                        {pagination.totalItemCount.toLocaleString()}
                        <small>개의 구독이 등록되어 있습니다.</small>
                    </h2>
                </div>

                <div className="min-w-[25vw]">
                    <ProductSubscriptionListSearchInput onChange={(keyword) => findAll({keyword})} />
                </div>
            </div>

            <div>
                <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center">
                    <CardTablePanel
                        gridClass="grid-cols-10"
                        entries={items}
                        pagination={pagination}
                        changePageSize={changePageSize}
                        pageMove={movePage}
                        ths={[
                            'Name',
                            '',
                            '조직',
                            '',
                            '등록방법',
                            '결제내역',
                            '멤버',
                            '인보이스 계정',
                            '생성/수정 일시',
                            '',
                        ]}
                        entryComponent={(subscription, i, arr) => (
                            <ProductSubscriptionItem
                                subscription={subscription}
                                borderBottom={i + 1 < arr.length}
                                reload={reload}
                            />
                        )}
                    />
                </LoadableBox>
            </div>
        </div>
    );
});
