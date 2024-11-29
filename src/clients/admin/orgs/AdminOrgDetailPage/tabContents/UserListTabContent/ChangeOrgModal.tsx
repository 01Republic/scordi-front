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
import {ApprovalStatus, CreateMembershipRequestDto} from '^models/Membership/types';

interface ChangeOrgModalProps extends ModalProps {
    memberShipId: number;
}

export const ChangeOrgModal = memo(function AddMemberModal(props: ChangeOrgModalProps) {
    const {isOpened, onClose, memberShipId} = props;
    const form = useListPageSearchForm(organizationAdminApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, listPage} = form;
    const [selectedOrg, setSelectedOrg] = useState<{id: number; name: string} | null>(null);

    console.log('멤버십아이디', memberShipId);

    useEffect(() => {
        fetchData({
            relations: ['memberships', 'memberships.user'],
            order: {id: 'DESC'},
        });
    }, []);

    const onSave = () => {
        if (selectedOrg) {
            //membershipApi.destroy(userId);

            // 멤버십 수정
            membershipApi
                .update(memberShipId, {
                    organizationId: selectedOrg.id,
                })
                .then(() => {
                    toast.success(`${selectedOrg.name}로 조직이 변경되었습니다.`);
                    setSelectedOrg(null);
                    onClose();
                })
                .catch(() => {
                    toast.error('조직 변경에 실패했습니다.');
                });
        }
    };

    const onCloseModal = () => {
        setSelectedOrg(null);
        onClose();
    };

    return (
        <div
            data-modal="TeamMemberSelectModal-for-AppShowModal"
            className={`modal modal-bottom ${isOpened ? 'modal-open' : ''}`}
            onClick={onCloseModal}
        >
            <div
                className="modal-box max-w-lg p-0"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
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
                            {listPage.items.map((item: OrganizationDto) => (
                                <OrgSelectItem
                                    key={item.id}
                                    item={item}
                                    setSelectedOrg={setSelectedOrg}
                                    selectedOrg={selectedOrg}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <button
                        disabled={!selectedOrg}
                        className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"
                        onClick={onSave}
                    >
                        {!selectedOrg ? '선택한 항목이 없습니다' : `${selectedOrg.name}로 이동하시겠습니까?`}
                    </button>
                </div>
            </div>
        </div>
    );
});
