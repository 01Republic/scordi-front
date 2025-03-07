import {memo, useEffect} from 'react';
import {AppUnit} from '^clients/private/orgs/home/OrgMainPage/AppUnit';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {Squircle} from '^components/ui/Squircle';
import {LoadableBox} from '^components/util/loading';
import {useProductOnMainPage} from '^models/Product/hook';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';
import {useUnmount} from '^hooks/useUnmount';
import {MoreHorizontal, Plus} from 'lucide-react';

export const AppUnitList = memo(function AppUnitList() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {isLoading, result, search, reset, changePageSize} = useProductOnMainPage();

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;
        search({
            relations: ['subscriptions', 'subscriptions.product'],
            organizationId,
        });
    }, [organizationId]);

    useUnmount(() => reset());

    if (!organizationId || isNaN(organizationId)) return <></>;

    const {items, pagination} = result;

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 max-w-screen-md mx-auto">
                {items.map((product, i) => (
                    <AppUnit key={i} product={product} />
                ))}

                {pagination.totalPage > 1 && (
                    <div className="flex items-center justify-center">
                        <Squircle text="전체보기" onClick={() => changePageSize(0)}>
                            <MoreHorizontal size={24} />
                        </Squircle>
                    </div>
                )}

                <div className="flex items-center justify-center">
                    <LinkTo href={OrgSubscriptionSelectPageRoute.path(organizationId)} displayLoading={false}>
                        <Squircle text="등록하기">
                            <Plus className="" />
                        </Squircle>
                    </LinkTo>
                </div>
            </div>
        </LoadableBox>
    );
});
