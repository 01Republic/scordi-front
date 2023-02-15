import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {SyntheticEvent} from 'react-toastify/dist/utils';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {searchOrganizations} from '^api/organization.api';
import {OrganizationDto, SearchOrgQueryDto} from '^types/organization.type';
import {useForm} from 'react-hook-form';
import {MembershipLevel} from '^types/membership.type';
import Router, {useRouter} from 'next/router';

export const OrgSearchPage = memo(() => {
    const {currentUser} = useCurrentUser();
    const router = useRouter();
    const [inputValue, setInputValue] = useState<string>('');
    const [searchedOrgs, setSearchedOrgs] = useState<OrganizationDto[]>([]);
    const form = useForm<SearchOrgQueryDto>();

    const handleSubmitForm = (data: SearchOrgQueryDto) => {
        setInputValue(data.keyword);
        searchOrganizations(data).then((res) => {
            const organizations = res.data;
            // const names = organizations.map((org) => org.name);
            setSearchedOrgs(organizations);
        });
    };

    return (
        <div className="flex w-full items-center justify-center" style={{height: '100vh'}}>
            <div className="flex flex-col w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] gap-y-10">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-4xl md:text-7xl font-bold">조직 찾기</h1>
                        <p className="text-lg py-6">조직을 찾아 합류하거나 새로 만들어보세요.</p>
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
                        placeholder="원하는 조직을 검색해방"
                        className="input input-bordered w-full h-[8vh] text-lg"
                        {...form.register('keyword')}
                    />
                </form>
                {searchedOrgs.length === 0 ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    searchedOrgs.map((org, i) => <SearchedOrgResultItem org={org} key={i} />)
                )}
                <button className="btn btn-block btn-primary text-lg">"{inputValue}"을(를) 추가하기</button>
            </div>
        </div>
    );
});

interface SearchedOrgResultItemProps {
    org: OrganizationDto;
}

const SearchedOrgResultItem = memo((props: SearchedOrgResultItemProps) => {
    const {org} = props;

    const memberships = org.memberships || [];
    const ownerMembership = memberships.find((membership) => membership.level === MembershipLevel.OWNER)!;
    console.log(ownerMembership);

    return (
        <div className="flex justify-between">
            <p className="text-lg">{org.name}</p>
            <p className="text-md">{ownerMembership?.user?.email}</p>
            <button className="btn">조직 합류</button>
        </div>
    );
});
