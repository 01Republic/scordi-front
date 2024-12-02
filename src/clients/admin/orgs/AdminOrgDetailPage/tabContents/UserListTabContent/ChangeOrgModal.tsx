import React, {memo, useEffect, useState} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {TeamMemberDto, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {TeamMemberSelectItem} from '^v3/share/modals/AppShowPageModal/TeamMemberSelectModal/TeamMemberSelectItem';
import {toast} from 'react-hot-toast';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {organizationAdminApi} from '^models/Organization/api';
import {OrgSelectItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/UserListTabContent/OrgSelectItem';
import {FindAllOrganizationQueryDto, OrganizationDto} from '^models/Organization/type';
import {membershipApi} from '^models/Membership/api';
import {ApprovalStatus, CreateMembershipRequestDto, MembershipDto} from '^models/Membership/types';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';

interface ChangeOrgModalProps extends ModalProps {
    membership?: MembershipDto;
}

export const ChangeOrgModal = memo(function AddMemberModal(props: ChangeOrgModalProps) {
    const {isOpened, onClose, membership} = props;
    const form = useListPageSearchForm(organizationAdminApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, listPage} = form;

    useEffect(() => {
        if (!isOpened) return;

        fetchData({
            relations: ['memberships', 'memberships.user'],
            order: {id: 'DESC'},
        });
    }, [isOpened]);

    const selectOrg = (org: OrganizationDto) => {
        if (!membership) return;
        if (!confirm(`정말 변경할까요?\n선택한 조직: [${org.id}] ${org.name}`)) return;

        // 멤버십 수정
        membershipApi
            .update(membership.id, {organizationId: org.id})
            .then(() => {
                toast.success(`조직이 변경되었습니다.`);
                onClose();
            })
            .catch(() => {
                toast.error('조직 변경에 실패했습니다.');
            });
    };

    const onCloseModal = () => {
        onClose();
    };

    return (
        <SlideUpModal open={isOpened} onClose={onCloseModal} size="lg" modalClassName="p-0">
            <div className="p-4 bg-scordi">
                <h3 className="font-bold text-lg text-white">변경할 조직을 선택해주세요.</h3>
                <p className="text-sm text-white opacity-70">검색을 이용해 조직을 찾을 수 있어요</p>
            </div>
            <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                <div className="min-w-[25vw] mt-3">
                    <SearchForm
                        searchForm={searchForm}
                        onSearch={onSearch}
                        registerName="keyword"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="flex-1 py-4 px-2 text-sm">
                    <ul>
                        {membership &&
                            listPage.items.map((item: OrganizationDto) => (
                                <OrgSelectItem
                                    key={item.id}
                                    item={item}
                                    disabled={membership.organizationId === item.id}
                                    onClick={selectOrg}
                                />
                            ))}
                    </ul>
                </div>
            </div>
        </SlideUpModal>
    );
});
