import React, {memo, useState} from 'react';
import {organizationApi} from '^models/Organization/api';
import {CreateOrganizationRequestDto, OrganizationDto, SearchOrgQueryDto} from '^models/Organization/type';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {SearchedOrgResultItem} from './SearchedOrgResultItem';
import {debounce} from 'lodash';
import {LoadableBox} from '^components/util/loading';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';

export const OrgSearchPage = memo(() => {
    // const {currentUser} = useCurrentUser();
    const router = useRouter();
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchedOrgs, setSearchedOrgs] = useState<OrganizationDto[]>([]);
    const form = useForm<SearchOrgQueryDto>();

    const handleSubmitForm = debounce((data: SearchOrgQueryDto) => {
        setInputValue(data.keyword);
        setIsLoading(true);
        organizationApi.search(data).then((res) => {
            const organizations = res.data;
            // const names = organizations.map((org) => org.name);
            setIsLoading(false);
            setSearchedOrgs(organizations);
        });
    }, 500);

    const createOrg = (data: CreateOrganizationRequestDto) => {
        if (data.name.length <= 0) return;
        organizationApi.create(data).then((res) => {
            const createdOrg = res.data;
            router.push(V3OrgHomePageRoute.path(createdOrg.id));
        });
    };

    return (
        <div className="flex w-full items-center justify-center py-[15vh]" style={{minHeight: '100vh'}}>
            <div className="flex flex-col w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] gap-y-10">
                <div className="hero-content text-center">
                    <div className="">
                        <h1 className="text-4xl md:text-7xl font-bold">워크스페이스 찾기</h1>
                        <p className="text-lg py-6">워크스페이스를 찾거나 생성해보세요.</p>
                    </div>
                </div>
                <form
                    onKeyUp={form.handleSubmit(handleSubmitForm)}
                    onSubmit={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    <input
                        type="text"
                        placeholder="회사명을 입력해주세요"
                        className="input input-bordered w-full h-[8vh] text-lg"
                        {...form.register('keyword')}
                    />
                </form>

                {inputValue && searchedOrgs.length === 0 ? (
                    <p>검색 결과가 없어요</p>
                ) : (
                    <div className="max-h-[220px] overflow-auto">
                        <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                            {searchedOrgs.map((org, i) => (
                                <SearchedOrgResultItem org={org} key={i} />
                            ))}
                        </LoadableBox>
                    </div>
                )}

                <button className="btn btn-lg btn-block btn-scordi" onClick={() => createOrg({name: inputValue})}>
                    {inputValue.length === 0 ? `워크스페이스 찾기` : `"${inputValue}"로 워크스페이스 생성하기`}
                </button>
            </div>
        </div>
    );
});
