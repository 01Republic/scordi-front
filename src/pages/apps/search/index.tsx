import {MobileTopNav} from '^components/MobileTopNav';
import {AppIconButton} from '^components/AppIconButton';
import {SearchInput} from '^components/SearchInput';
import {useRouter} from 'next/router';
import {AddServicePageRoute} from '^pages/apps/add/[id]';
import {useEffect, useState} from 'react';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {
    applyNewApplicationPrototype,
    getApplicationPrototypeRecommend,
    getApplicationPrototypes,
} from '^api/applicationPrototype.api';
import {getApplications} from '^api/application.api';
import {ApplicationDto} from '^types/application.type';
import {DefaultButton} from '^components/Button';
import {ApplyPageRoute} from '^pages/apps/apply';
import {toast} from 'react-toastify';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {ServiceSuggestList} from '^components/ServiceSuggestList';

export const AppSearchPageRoute = {
    pathname: '/apps/search',
    path: (orgId: number) => {
        return `${AppSearchPageRoute.pathname}?orgId=${orgId}`;
    },
};

const AppSearchPage = () => {
    const router = useRouter();
    const orgId = Number(router.query.orgId);
    const user = useCurrentUser();
    const [recommendList, setRecommendList] = useState<ApplicationPrototypeDto[]>([]);
    const [myApps, setMyApps] = useState<ApplicationDto[]>([]);
    const [searchResults, setSearchResults] = useState<ApplicationPrototypeDto[]>([]);

    const searchService = () => {
        getApplicationPrototypes(router.query).then((res) => {
            setSearchResults(res.data.items);
        });
    };

    const applyNewApp = () => {
        applyNewApplicationPrototype({name: router.query.name as string}).then(() => {
            router.push(ApplyPageRoute.pathname);
        });
    };

    const startAddService = (id: number) => {
        if (myApps.find((app) => app.prototype.id === id)) {
            toast.info('이미 연동된 서비스입니다.');
        } else {
            router.push(AddServicePageRoute.path(id, orgId));
        }
    };

    useEffect(() => {
        getApplicationPrototypeRecommend().then((res) => {
            setRecommendList(res.data.items);
        });
    }, []);

    useEffect(() => {
        user &&
            getApplications({where: {organizationId: user.orgId}}).then((res) => {
                console.log('apps', res.data.items);
                setMyApps(res.data.items);
            });
    }, [user]);

    useEffect(() => {
        searchService();
    }, [router.query]);

    return (
        <>
            <MobileTopNav title={'서비스 연동하기'} />
            <div className={'px-[20px] py-[40px]'}>
                <h2>어떤 서비스를 등록하시겠어요?</h2>
                <div className={'py-[20px]'}>
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
        </>
    );
};

export default AppSearchPage;
