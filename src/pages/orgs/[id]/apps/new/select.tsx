import React, {useCallback, useEffect, useState} from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {ContentLayout} from '^layouts/ContentLayout';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {ContentHeading, ContentHeadingSecondaryButton} from '^layouts/ContentLayout/ContentHeading';
import {ContentPanel} from '^layouts/ContentLayout/ContentPanel';
import {ProductDto, FindAllProductQuery} from '^types/product.type';
import {ProductTagDto} from '^types/productTag.type';
import {useRouter} from 'next/router';
import {IoArrowBack} from '@react-icons/all-files/io5/IoArrowBack';
import {useForm} from 'react-hook-form';
import {PreLoader} from '^components/PreLoader';
import {SearchInput} from '^components/SearchInput';
import {getProducts} from '^api/product.api';
import {errorNotify} from '^utils/toast-notify';
import {getProductTags} from '^api/productTag.api';
import {SubscriptionDto} from '^types/subscription.type';
import {getSubscriptions} from '^api/subscription.api';
import {toast} from 'react-toastify';
import {OrgAddAppInfoPageRoute} from '^pages/orgs/[id]/apps/new/[appId]/information';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {TitleSection} from '^components/v2/TitleSection';
import {SearchResultSection} from '^components/pages/OrgApplicationSelectPage/SearchResultSection';
import {SearchInputSection} from '^components/pages/OrgApplicationSelectPage/SearchInputSection';
import {MobileScrollable} from '^components/v2/MobileScrollable';
import OrgMobileLayout from '^layouts/org/mobileLayout';

export const OrgApplicationSelectPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/new/select',
    path: (orgId: number) => pathReplace(OrgApplicationSelectPageRoute.pathname, {id: orgId}),
});

export default function OrgApplicationSelectPage() {
    return (
        <OrgMobileLayout>
            <MobileScrollable>
                <MobileScrollable.FixedZone>
                    <MobileTopNav sticky={false}>
                        <BackButton />
                    </MobileTopNav>
                    <TitleSection.Simple>
                        <TitleSection.Title text="어떤 서비스를 연동하시겠어요?" size="2xl" />
                    </TitleSection.Simple>
                    <SearchInputSection />
                </MobileScrollable.FixedZone>

                <MobileScrollable.ScrollZone>
                    <SearchResultSection />
                </MobileScrollable.ScrollZone>
            </MobileScrollable>
        </OrgMobileLayout>
    );

    /**
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [myApps, setMyApps] = useState<SubscriptionDto[]>([]);
    const [prototypes, setPrototypes] = useState<ProductDto[]>([]);
    const [categories, setCategories] = useState<ProductTagDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ProductTagDto | null>(null);
    const form = useForm<SearchAppPrototypeForm>();

    const fetchApplicationPrototypes = ({page = 1, itemsPerPage = 30, ...params}: FindAllProductQuery) => {
        setIsLoading(true);
        getProducts(params)
            .then(({data}) => {
                setPrototypes(data.items);
            })
            .catch(errorNotify)
            .finally(() => {
                setIsLoading(false);
            });
    };

    const checkIsAddedAlready = useCallback(
        (prototypeId: number) => {
            return !!myApps.find((app) => app.prototypeId === prototypeId);
        },
        [myApps],
    );

    useEffect(() => {
        getProductTags({where: {isFeatured: 1}})
            .then(({data}) => setCategories(data.items))
            .catch(errorNotify);

        getSubscriptions({itemsPerPage: 999, where: {organizationId}})
            .then(({data}) => setMyApps(data.items))
            .catch(errorNotify);

        fetchApplicationPrototypes({
            page: 1,
            itemsPerPage: 30,
        });
    }, []);

    const selectAppHandler = (input: HTMLInputElement) => {
        const appId = Number(input.value);
        router.push(OrgAddAppInfoPageRoute.path(organizationId, appId));
    };

    const selectCategoryHandler = (category: ProductTagDto) => {
        setSelectedCategory(category);
        form.resetField('name');
        fetchApplicationPrototypes({
            tagId: category.id,
        });
    };

    const searchHandler = (data: SearchAppPrototypeForm) => {
        setSelectedCategory(null);
        fetchApplicationPrototypes({
            name: data.name,
        });
    };

    return (
        <ContentLayout>
            <ContentHeading title="어떤 서비스를 연동하시겠어요?">
                <ContentHeadingSecondaryButton className="gap-2" onClick={() => router.back()}>
                    <IoArrowBack /> Back
                </ContentHeadingSecondaryButton>
            </ContentHeading>
            <div className="mb-5 shadow rounded-lg">
                <SearchInput onSubmit={() => form.handleSubmit(searchHandler)} register={form.register('name')} />
            </div>
            <ContentPanel>
                <div className="bs-row mx-0 pt-3">
                    <div className="bs-col px-0">
                        <div className={`bs-row mx-0 ${isLoading || prototypes.length <= 0 ? 'h-full' : ''}`}>
                            {isLoading && (
                                <div className="w-full min-h-[12rem]">
                                    <PreLoader screenSize={false} />
                                </div>
                            )}
                            {!isLoading && prototypes.length <= 0 && (
                                <div className="bs-col flex flex-col gap-4 items-center justify-center">
                                    <img
                                        className="w-[50%] min-w-[200px]"
                                        src="/images/illustration/big-isolated-employee-working-office-workplace-flat-illustration/Mar-Business_1-800px.png"
                                        alt="Result not found."
                                    />
                                    <div>
                                        <p className="text-gray-400 font-bold text-2xl">결과가 없습니다 :(</p>
                                    </div>
                                </div>
                            )}
                            {!isLoading &&
                                prototypes.length > 0 &&
                                [1].map(() =>
                                    prototypes.map((proto) => {
                                        return (
                                            <SelectablePrototypeCard
                                                key={proto.id}
                                                proto={proto}
                                                selectable={!checkIsAddedAlready(proto.id)}
                                                onClick={selectAppHandler}
                                            />
                                        );
                                    }),
                                )}
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:bs-col-3">
                        <div className="h-fit sticky top-[100px]">
                            <p className="text-lg font-bold mb-2 px-3.5">Categories</p>
                            <ul className="menu menu-compact flex flex-col p-0">
                                {categories.map((category) => {
                                    const active = selectedCategory && selectedCategory.id === category.id;
                                    return (
                                        <li key={category.id}>
                                            <a
                                                className={`${active ? 'active' : ''}`}
                                                onClick={() => selectCategoryHandler(category)}
                                            >
                                                {category.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </ContentPanel>
        </ContentLayout>
    )
    **/
}

// OrgApplicationSelectPage.getLayout = getOrgMainLayout;

// interface SelectablePrototypeCardProps {
//     proto: ProductDto;
//     selectable: boolean;
//     onClick: (input: HTMLInputElement) => any;
// }
//
// function SelectablePrototypeCard({proto, selectable, onClick}: SelectablePrototypeCardProps) {
//     const id = `SelectablePrototype-${proto.id}`;
//
//     const isReady = (() => {
//         let available = true;
//         if (!proto.paymentPlans || !proto.paymentPlans.length) {
//             available = false;
//         }
//         proto.paymentPlans.forEach((plan) => {
//             if (!plan.billingCycles[0]) available = false;
//         });
//         return available;
//     })();
//
//     const labelClickHandler = (e: any) => {
//         if (!selectable) return toast('Already Added');
//         if (!isReady) return toast(`The ${proto.name} Coming Soon`);
//         const label = (e.target as HTMLElement).closest('label')!;
//         const inputId = label.getAttribute('for')!;
//         const input = document.getElementById(inputId) as HTMLInputElement;
//         onClick(input);
//     };
//
//     return (
//         <div className="bs-col-6 sm:bs-col-6 lg:bs-col-3 xl:bs-col-2-of-10 mb-4">
//             <input id={id} type="radio" className="hidden" defaultValue={proto.id} />
//             <label htmlFor={id} onClick={labelClickHandler}>
//                 <div
//                     className={`w-full h-full rounded-xl border cursor-pointer ${
//                         isReady && selectable ? 'hover:shadow-lg' : 'opacity-70'
//                     }`}
//                 >
//                     <div className="card p-3">
//                         <figure className="pt-2 text-center mb-3">
//                             <img src={proto.image} alt={`${proto.name} Logo`} className="w-[42px]" />
//                         </figure>
//                         <div className="card-body items-center text-center p-0">
//                             <h3 className="card-title text-sm text-gray-600">{proto.name}</h3>
//                             <p className="text-xs text-gray-500">{proto.desc}</p>
//                             {isReady && selectable ? (
//                                 <button className="btn btn-xs btn-success">Add</button>
//                             ) : !isReady ? (
//                                 <button className="btn btn-xs btn-secondary btn-disabled">Coming Soon</button>
//                             ) : (
//                                 <button className="btn btn-xs btn-success btn-disabled">Added</button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </label>
//         </div>
//     );
// }
