import React, {memo, useEffect, useState} from 'react';
import {Avatar} from '^components/Avatar';
import {Icon} from '^components/Icon';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {Modal} from '^components/Modal';
import {useForm} from 'react-hook-form';
import {UpdateOrganizationRequestDto} from '^types/organization.type';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {toast} from 'react-toastify';
import {updateOrganization} from '^api/organization.api';
import {errorNotify} from '^utils/toast-notify';

interface OrganizationProps {
    isOrganization: boolean;
}

export const ProfilePanel = memo((props: OrganizationProps) => {
    const {isOrganization} = props;
    const currentUser = useRecoilValue(currentUserAtom);
    const currentOrg = useRecoilValue(currentOrgAtom);
    const [orgName, setOrgName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const orgNameForm = useForm<UpdateOrganizationRequestDto>();

    useEffect(() => {
        // currentOrg?.name && setOrgName(currentOrg?.name);
    }, [orgName]);

    const UpdateOrgName = (dto: UpdateOrganizationRequestDto) => {
        if (!dto.name) {
            toast.error('조직명은 필수입니다.');
            return;
        }

        if (dto.name === currentOrg?.name) {
            toast.error('이미 등록된 조직명과 같습니다.');
            return;
        }

        orgNameForm.reset();
        setIsModalOpen(false);

        const orgId = currentOrg?.id;
        orgId &&
            updateOrganization(orgId, dto)
                .then((res) => {
                    setOrgName(res.data.name);
                    toast.success('조직명이 변경됐습니다.');
                })
                .catch(errorNotify);
    };

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div
                    onClick={() => {
                        isOrganization && setIsModalOpen(true);
                    }}
                    className="flex items-center gap-6 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral"
                >
                    <Avatar
                        src={isOrganization ? currentOrg?.image : currentUser?.profileImgUrl}
                        className="w-16 h-16 outline outline-offset-1 outline-slate-100"
                    />
                    <div className="flex-1">
                        <h1 className="text-xl text-500">
                            {isOrganization ? (!orgName ? currentOrg?.name : orgName) : currentUser?.name}
                        </h1>
                        {/* TODO: currentUser에서 직급 가져올 수 없음 수정 예정 */}
                        <p className="text-[16px]">
                            <small className="mr-0.5">{isOrganization ? '' : ''} </small>
                        </p>
                    </div>
                    <Icon.ChevronRight />
                </div>

                {isOrganization && (
                    <Modal type="info" isOpen={isModalOpen} title="조직명 변경">
                        <form onSubmit={orgNameForm.handleSubmit(UpdateOrgName)} className="mt-5 flex flex-col gap-5">
                            <TextInput
                                type="text"
                                defaultValue={orgName ? orgName : currentOrg?.name}
                                placeholder="변경하실 조직명을 입력해주세요"
                                {...orgNameForm.register('name')}
                            />
                            <DefaultButton text={'확인'} type={'submit'} />
                        </form>
                    </Modal>
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
