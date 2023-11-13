import React, {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilState, atom} from 'recoil';
import {useModal} from '../../share/modals/useModal';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {UpdateOrganizationRequestDto} from '^types/organization.type';
import {errorNotify} from '^utils/toast-notify';
import {useToast} from '^hooks/useToast';
import {organizationApi} from '^api/organization.api';

export const isOpenModifyOrgNameModalAtom = atom({
    key: 'v3/isOpenModifyOrgNameModalAtom',
    default: false,
});

export const ModifyOrgNameModal = memo(() => {
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);
    const {close, Modal, CloseButton} = useModal({isShowAtom: isOpenModifyOrgNameModalAtom});
    const form = useForm<UpdateOrganizationRequestDto>();
    const {toast} = useToast();

    useEffect(() => {
        if (!currentOrg) return;

        form.setValue('name', currentOrg.name);
    }, [currentOrg]);

    const updateOrgName = (data: UpdateOrganizationRequestDto) => {
        if (!currentOrg) return;

        const newOrgName = data.name;

        if (!newOrgName) {
            toast.error('조직명은 필수입니다.');
            return;
        }

        if (newOrgName === currentOrg.name) {
            toast.error('기존 조직명과 동일한 이름을 선택할 수 없습니다.');
            return;
        }

        form.reset();
        close();

        organizationApi
            .update(currentOrg.id, data)
            .then((res) => {
                setCurrentOrg({...currentOrg, name: res.data.name});
                toast.success('조직명이 변경됐습니다.');
            })
            .catch(errorNotify);
    };

    if (!currentOrg) return <></>;

    return (
        <Modal>
            <form className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <h3 className="font-bold text-lg self-center">조직명 변경하기</h3>
                    <CloseButton />
                </div>
                <TextInput type="text" placeholder="변경하실 조직명을 입력해주세요" {...form.register('name')} />

                <DefaultButton text={'확인'} onClick={form.handleSubmit((data) => updateOrgName(data))} />
            </form>
        </Modal>
    );
});
