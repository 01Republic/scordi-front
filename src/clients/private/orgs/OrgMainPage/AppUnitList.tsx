import {memo, useEffect} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {AppUnit} from '^clients/private/orgs/OrgMainPage/AppUnit';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {IoIosMore} from 'react-icons/io';
import {Squircle} from '^components/ui/Squircle';
import {LoadableBox} from '^components/util/loading';
import {useProductOnMainPage} from '^models/Product/hook';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';

export const AppUnitList = memo(function AppUnitList() {
    const organizationId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {isLoading, result, search, changePageSize} = useProductOnMainPage();

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;
        search({
            relations: ['subscriptions', 'subscriptions.product'],
            organizationId,
        });
    }, [organizationId]);

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
                            <IoIosMore size={24} />
                        </Squircle>
                    </div>
                )}

                <div className="flex items-center justify-center">
                    <LinkTo href={OrgSubscriptionSelectPageRoute.path(organizationId)} displayLoading={false}>
                        <Squircle text="등록하기">
                            <FaPlus className="" />
                        </Squircle>
                    </LinkTo>
                </div>
            </div>
        </LoadableBox>
    );
});
