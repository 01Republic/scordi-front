import React, {memo, useState} from 'react';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {searchOrganizations, createOrganization} from '^api/organization.api';
import {CreateOrganizationRequestDto, OrganizationDto, SearchOrgQueryDto} from '^types/organization.type';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {SearchedOrgResultItem} from './SearchedOrgResultItem';

export const OrgSearchPage = memo(() => {
    // const {currentUser} = useCurrentUser();
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

    const createOrg = (data: CreateOrganizationRequestDto) => {
        data.name.length > 0 &&
            createOrganization(data).then((res) => {
                const createdOrg = res.data;
                router.push(OrgAppsIndexPageRoute.path(createdOrg.id));
            });
    };

    return (
        <div className="flex w-full items-center justify-center" style={{height: '100vh'}}>
            <div className="flex flex-col w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] gap-y-10">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-4xl md:text-7xl font-bold">Find Organization</h1>
                        <p className="text-lg py-6">Find your team or Create your team</p>
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
                        placeholder="Please enter your organization to search."
                        className="input input-bordered w-full h-[8vh] text-lg"
                        {...form.register('keyword')}
                    />
                </form>
                {searchedOrgs.length === 0 ? (
                    <p>There are no matching organization found in the page.</p>
                ) : (
                    searchedOrgs.map((org, i) => <SearchedOrgResultItem org={org} key={i} />)
                )}
                <button className="btn btn-block btn-primary text-lg" onClick={() => createOrg({name: inputValue})}>
                    {inputValue.length === 0 ? `search your team` : `Create "${inputValue}"`}
                </button>
            </div>
        </div>
    );
});
