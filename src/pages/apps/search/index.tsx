import {MobileTopNav} from '^components/MobileTopNav';
import {AppIconButton} from '^components/AppIconButton';
import {SearchInput} from '^components/SearchInput';
import {useRouter} from 'next/router';
import {AddServicePageRoute} from '^pages/apps/add/[id]';
import {useEffect, useState} from 'react';
import {ProductDto} from '^models/Product/type';
import {productApi} from '^models/Product/api';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {DefaultButton} from '^components/Button';
import {ApplyPageRoute} from '^pages/apps/apply';
import {toast} from 'react-toastify';
import {useCurrentUser} from '^models/User/hook';
import {ServiceSuggestList} from '^components/ServiceSuggestList';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {subscriptionApi} from '^models/Subscription/api';

export const AppSearchPageRoute = {
    pathname: '/apps/search',
    path: (orgId: number) => {
        return `${AppSearchPageRoute.pathname}?orgId=${orgId}`;
    },
};

const AppSearchPage = () => {
    const router = useRouter();
    const orgId = Number(router.query.orgId);
    const {currentUser: user} = useCurrentUser();
    const [recommendList, setRecommendList] = useState<ProductDto[]>([]);
    const [myApps, setMyApps] = useState<SubscriptionDto[]>([]);
    const [searchResults, setSearchResults] = useState<ProductDto[]>([]);

    const searchService = () => {
        productApi.index(router.query).then((res) => {
            setSearchResults(res.data.items);
        });
    };

    const applyNewApp = () => {
        productApi.apply({name: router.query.name as string}).then(() => {
            router.push(ApplyPageRoute.pathname);
        });
    };

    const startAddService = (id: number) => {
        if (myApps.find((subscription) => subscription.product.id === id)) {
            toast.info('이미 연동된 서비스입니다.');
        } else {
            router.push(AddServicePageRoute.path(id, orgId));
        }
    };

    useEffect(() => {
        productApi.recommend().then((res) => {
            setRecommendList(res.data.items);
        });
    }, []);

    useEffect(() => {
        user &&
            subscriptionApi.index({where: {organizationId: user.lastSignedOrgId}}).then((res) => {
                console.log('apps', res.data.items);
                setMyApps(res.data.items);
            });
    }, [user]);

    useEffect(() => {
        searchService();
    }, [router.query]);

    return (
        <OrgMobileLayout>
            <MobileTopNav title={'서비스 연동하기'} />
            <div className={'px-[20px] py-[40px]'}>
                <h2>어떤 서비스를 연동하시겠어요?</h2>
                <div className={'py-[20px] lg:max-w-[500px]'}>
                    <SearchInput
                        defaultValue={router.query.name as string}
                        onSubmit={(name) => router.replace(`?name=${name}`)}
                    />
                </div>
                {!!router.query.name && searchResults.length === 0 && (
                    <div className={'py-40'}>
                        <h2 className={'text-center mb-4'}>{router.query.name}</h2>
                        <p className={'text-center mb-10'}>
                            검색 결과가 없어요 :( <br />
                            혹시 찾으시는 서비스가 없으면 등록 요청을 해주세요
                        </p>
                        <DefaultButton text={'+ 서비스 등록 요청하기'} onClick={applyNewApp} />
                    </div>
                )}
                {!!router.query.name && searchResults.length > 0 && (
                    <ServiceSuggestList
                        title={'검색 결과'}
                        serviceList={searchResults}
                        myApps={myApps}
                        onClick={(item) => startAddService(item.id)}
                    />
                )}
                <ServiceSuggestList
                    title={'추천 서비스'}
                    serviceList={recommendList}
                    myApps={myApps}
                    onClick={(item) => startAddService(item.id)}
                />
            </div>
        </OrgMobileLayout>
    );
};

export default AppSearchPage;
