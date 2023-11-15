import React, {useState} from 'react';
import {NextRouter, useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {organizationApi} from '^api/organization.api';
import {errorNotify} from '^utils/toast-notify';
import {TextInputLg} from '^components/TextInput';
import {OrganizationDto, SearchOrgQueryDto} from '^types/organization.type';
import {MembershipLevel} from '^models/Membership/type';
import {UserDto} from '^models/User/types';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {pathRoute} from '^types/pageRoute.type';
import {OrgSettingsLayout} from '^layouts/org/settingsLayout';
import {toast} from 'react-toastify';
import {useRecoilState} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import {membershipApi} from '^models/Membership/api';

const createMembershipRequest = (org: OrganizationDto, user: UserDto, level: MembershipLevel, router: NextRouter) => {
    membershipApi
        .create({
            organizationId: org.id,
            userId: user.id,
            level: level,
        })
        .then(() => router.push(OrgHomeRoute.path(org.id)))
        .catch(errorNotify);
};

export const NewMembershipPath = pathRoute({
    pathname: '/memberships/new',
    path: () => NewMembershipPath.pathname,
});

const NewMembershipPage = () => {
    const router = useRouter();
    const [currentUser] = useRecoilState(currentUserAtom);
    const form = useForm<SearchOrgQueryDto>();
    const [results, setResults] = useState<OrganizationDto[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<OrganizationDto | null>(null);

    // 검색어 입력을 받아 검색을 요청하고 검색결과를 받는다.
    const search = (data: SearchOrgQueryDto) => {
        setSelectedOrg(null);
        organizationApi.search(data).then((res) => setResults(res.data));
        return false;
    };

    // 검색 결과 항목을 선택했을 때, ON-OFF 토글 방식으로 동작.
    const selectResult = (org: OrganizationDto) => {
        selectedOrg && selectedOrg.id === org.id ? setSelectedOrg(null) : setSelectedOrg(org);
    };

    // 선택한 항목으로부터 시작하기
    const startWithSelectedOrg = () => {
        if (!selectedOrg || !currentUser) return;

        // 이 조직에 멤버십 생성
        createMembershipRequest(selectedOrg, currentUser, MembershipLevel.MEMBER, router);
    };

    // 새로운 조직을 만들어 시작하기
    const startWithNewOrg = () => {
        const name = form.getValues('keyword');
        if (!currentUser) return;
        if (!name) {
            toast('조직의 이름을 입력해주세요');
            return;
        }

        // 검색어를 이름 삼아 새 조직을 생성
        organizationApi
            .create({name})
            // 이 조직에 멤버십 생성
            .then((res) => createMembershipRequest(res.data, currentUser, MembershipLevel.OWNER, router))
            .catch(errorNotify);
    };

    return (
        <OrgSettingsLayout>
            <OrgSettingsLayout.Header>
                <h1 className="text-4xl font-semibold mb-10">우리 조직 찾기</h1>

                <form onSubmit={form.handleSubmit(search)} className="space-y-4 m-auto flex mb-10">
                    <div className="w-full md:pr-5">
                        <TextInputLg
                            type="text"
                            required={true}
                            placeholder="조직의 이름을 입력해주세요"
                            {...form.register('keyword', {required: true})}
                        />
                    </div>

                    <button className="btn btn-square btn-lg" style={{marginTop: 0}}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </form>
            </OrgSettingsLayout.Header>

            <OrgSettingsLayout.Body>
                <OrgSettingsLayout.Container>
                    {results.length > 0 &&
                        results.map((org) => (
                            <SearchResultItem
                                key={org.id}
                                active={!!selectedOrg && selectedOrg.id === org.id}
                                org={org}
                                onClick={() => selectResult(org)}
                            />
                        ))}
                </OrgSettingsLayout.Container>

                <OrgSettingsLayout.Container>
                    <div className="pt-[1rem] space-y-4">
                        <button
                            className="btn btn-primary btn-block btn-lg"
                            type="button"
                            disabled={!selectedOrg}
                            onClick={startWithSelectedOrg}
                        >
                            {selectedOrg ? '이 조직으로 시작하기' : '시작할 조직을 선택해주세요'}
                        </button>
                        <button
                            className="btn btn-outline btn-primary btn-block btn-lg"
                            type="button"
                            onClick={startWithNewOrg}
                        >
                            조직을 찾지 못하셨나요?&nbsp;&nbsp;&nbsp;&nbsp;새 조직 등록하기
                        </button>
                    </div>
                </OrgSettingsLayout.Container>
            </OrgSettingsLayout.Body>
        </OrgSettingsLayout>
    );
};

export default NewMembershipPage;

/**
 * 검색 결과 항목 컴포넌트
 */

interface SearchResultItemProps {
    active: boolean;
    org: OrganizationDto;
    onClick: () => void;
}

function SearchResultItem({active, org, onClick}: SearchResultItemProps) {
    return (
        <ul id={`search-result-item-${org.id}`} className="menu bg-base-100 w-full shadow mb-3 rounded-box p-0">
            <li className="rounded-box">
                <a className={`${active ? 'active' : ''}`} onClick={onClick} style={{padding: '1.5rem'}}>
                    <span>
                        {org.name} ({org.slug})
                    </span>
                </a>
            </li>
        </ul>
    );
}
