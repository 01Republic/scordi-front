import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {FaCaretDown, FaPlus} from 'react-icons/fa6';
import {BsFillPeopleFill, BsFillPersonPlusFill} from 'react-icons/bs';
import {orgIdParamState} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {OrgTeamMemberNewPageRoute} from '^pages/orgs/[id]/teamMembers/new';

export const ListPageHeader = memo(function ListPageHeader() {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <>
            <Breadcrumb paths={['팀', {text: '구성원', active: true}]} />
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl">구성원</h1>

                <div>
                    <AddTeamMemberJustButton />
                    {/*<AddTeamMemberDropdown />*/}
                </div>
            </div>
        </>
    );
});

const AddTeamMemberJustButton = () => {
    const orgId = useRecoilValue(orgIdParamState);
    return (
        <LinkTo className="btn btn-scordi gap-2 mb-1" href={OrgTeamMemberNewPageRoute.path(orgId)} loadingOnBtn>
            <FaPlus />
            <span className="mr-1.5">구성원 추가하기</span>
        </LinkTo>
    );
};

const AddTeamMemberDropdown = () => {
    const orgId = useRecoilValue(orgIdParamState);
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <button tabIndex={0} className="btn btn-scordi gap-2 mb-1">
                <FaPlus />
                <span className="mr-1.5">구성원 추가하기</span>
                <FaCaretDown />
            </button>
            <div
                tabIndex={0}
                className="dropdown-content menu p-0 shadow-xl bg-white rounded-btn min-w-[220px] !z-[1] text-14"
            >
                <div className="group">
                    <LinkTo
                        href={OrgTeamMemberNewPageRoute.path(orgId)}
                        className="w-full py-2 px-4 group-hover:text-scordi transition-all flex items-center gap-2"
                        displayLoading={false}
                    >
                        <BsFillPersonPlusFill />
                        <span>한 명 추가하기</span>
                    </LinkTo>
                </div>
                <div className="group">
                    <a className="w-full py-2 px-4 group-hover:text-scordi transition-all flex items-center gap-2">
                        <BsFillPeopleFill />
                        <span>여러 명 추가하기</span>
                    </a>
                    <div className="block w-full py-2 px-4 text-12 text-gray-400">
                        구성원 초대 현황에 들어가시면, 원하실 때 언제든지 초대 가능 합니다.
                    </div>
                </div>
            </div>
        </div>
    );
};
