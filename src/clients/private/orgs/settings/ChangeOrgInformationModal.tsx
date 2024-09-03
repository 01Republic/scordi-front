import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';
import {BsCheckCircle, BsCheckCircleFill} from 'react-icons/bs';
import React, {memo} from 'react';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {useForm} from 'react-hook-form';
import {UpdateOrganizationRequestDto} from '^models/Organization/type';
import {organizationApi} from '^models/Organization/api';
import {toast} from 'react-toastify';

interface ChangeOrgInformationModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const ChangeOrgInformationModal = memo(function (props: ChangeOrgInformationModalProps) {
    const {isOpened, onClose} = props;
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const {currentOrg} = useCurrentOrg(orgId);
    const form = useForm<UpdateOrganizationRequestDto>();

    const onSave = () => {
        form.handleSubmit(async (data) => {
            organizationApi
                .update(orgId, data)
                .then(() => {
                    toast.success('워크스페이스 정보가 수정되었습니다.');
                    onClose();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        })();
    };

    return (
        <div
            data-modal="TeamMemberSelectModal-for-AppShowModal"
            className={`modal modal-bottom ${isOpened ? 'modal-open' : ''}`}
            onClick={onClose}
        >
            <div
                className="modal-box max-w-lg p-0"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <div className="p-4 bg-scordi">
                    <h3 className="font-bold text-lg text-white">워크스페이스 정보 수정</h3>
                    <p className="text-sm text-white opacity-70">워크스페이스의 기본 정보를 수정합니다.</p>
                </div>
                <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                    <div className="flex-1 py-4 px-2 text-sm space-y-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="account-id" className="block text-16">
                                워크스페이스명
                            </label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="one-time-code"
                                className="input w-full input-bordered"
                                disabled={true}
                                value={currentOrg?.name}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="account-id" className="block text-16">
                                주소
                            </label>
                            <input
                                id="address"
                                type="text"
                                autoComplete="one-time-code"
                                className="input w-full input-bordered"
                                placeholder={'주소를 입력해주세요'}
                                {...form.register('address')}
                            />
                            <input
                                id="address-detail"
                                type="text"
                                autoComplete="one-time-code"
                                className="input w-full input-bordered"
                                placeholder={'상세 주소를 입력해주세요'}
                                {...form.register('addressDetail')}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <button
                        className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"
                        onClick={onSave}
                    >
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
});
