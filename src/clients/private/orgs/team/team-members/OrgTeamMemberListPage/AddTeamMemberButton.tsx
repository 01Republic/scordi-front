import React from 'react';
import {useRecoilValue} from 'recoil';
import {FaPlus} from 'react-icons/fa6';
import {BsFillPeopleFill, BsFillPersonPlusFill} from 'react-icons/bs';
import {orgIdParamState} from '^atoms/common';
import {OrgTeamMemberNewPageRoute} from '^pages/orgs/[id]/teamMembers/new';
import {LinkTo} from '^components/util/LinkTo';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    ListPageDropdownMenuItem,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';

export const AddTeamMemberJustButton = () => {
    const orgId = useRecoilValue(orgIdParamState);
    return (
        <LinkTo className="btn btn-scordi gap-2 mb-1" href={OrgTeamMemberNewPageRoute.path(orgId)} loadingOnBtn>
            <FaPlus />
            <span className="mr-1.5">구성원 추가하기</span>
        </LinkTo>
    );
};

export const AddTeamMemberDropdown = () => {
    const orgId = useRecoilValue(orgIdParamState);
    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="구성원 추가하기" />

            <ListPageDropdownMenu>
                <ListPageDropdownMenuItem href={OrgTeamMemberNewPageRoute.path(orgId)}>
                    <BsFillPersonPlusFill />
                    <span>한 명 추가하기</span>
                </ListPageDropdownMenuItem>

                <ListPageDropdownMenuItem plain>
                    <a className="w-full py-2 px-4 group-hover:text-scordi transition-all flex items-center gap-2">
                        <BsFillPeopleFill />
                        <span>여러 명 추가하기</span>
                    </a>
                    <div className="block w-full py-2 px-4 text-12 text-gray-400">
                        구성원 초대 현황에 들어가시면, 원하실 때 언제든지 초대 가능 합니다.
                    </div>
                </ListPageDropdownMenuItem>
            </ListPageDropdownMenu>
        </ListPageDropdown>
    );
};
