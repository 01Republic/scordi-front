import React, {memo, useState} from 'react';
import {orgIdParamState} from '^atoms/common';
import {useCurrentOrg2} from '^models/Organization/hook';
import {useForm} from 'react-hook-form';
import {UpdateOrganizationRequestDto} from '^models/Organization/type';
import {organizationApi} from '^models/Organization/api';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {AddressSearchModal} from '^clients/private/orgs/settings/OrgSettingsInformationPage/AddressSearchModal';
import {useTranslation} from 'next-i18next';

interface ChangeOrgInformationModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const ChangeOrgInformationModal = memo(function (props: ChangeOrgInformationModalProps) {
    const {isOpened, onClose} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {currentOrg} = useCurrentOrg2();
    const form = useForm<UpdateOrganizationRequestDto>();
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const {t} = useTranslation('workspaceSettings');

    const onSave = () => {
        form.handleSubmit(async (data) => {
            organizationApi
                .update(orgId, data)
                .then(() => {
                    toast.success(t('changeModal.saveSuccess'));
                    onClose();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        })();
    };

    const handleComplete = (data: any) => {
        form.setValue('address', data.address);
        setIsPostcodeOpen(false);
    };

    return (
        <>
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
                        <h3 className="font-bold text-lg text-white">{t('changeModal.title')}</h3>
                        <p className="text-sm text-white opacity-70">{t('changeModal.desc')}</p>
                    </div>
                    <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                        <div className="flex-1 py-4 px-2 text-sm space-y-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="account-id" className="block text-16">
                                    {t('workspaceName')}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="one-time-code"
                                    className="input w-full input-bordered"
                                    {...form.register('name')}
                                    defaultValue={currentOrg?.name}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="account-id" className="block text-16">
                                    {t('address')}
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    autoComplete="one-time-code"
                                    className="input w-full input-bordered"
                                    placeholder={t('changeModal.addressPlaceholder') ?? ''}
                                    defaultValue={
                                        currentOrg && currentOrg.address !== null ? currentOrg.address : undefined
                                    }
                                    {...form.register('address')}
                                    onClick={() => setIsPostcodeOpen(true)}
                                    readOnly={true}
                                />
                                <input
                                    id="address-detail"
                                    type="text"
                                    autoComplete="one-time-code"
                                    className="input w-full input-bordered"
                                    placeholder={t('changeModal.addressDetailPlaceholder') ?? ''}
                                    defaultValue={
                                        currentOrg && currentOrg.addressDetail !== null
                                            ? currentOrg.addressDetail
                                            : undefined
                                    }
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
                            {t('changeModal.saveBtn')}
                        </button>
                    </div>
                </div>
            </div>
            {/* 주소 검색 모달 */}
            <AddressSearchModal
                isOpened={isPostcodeOpen}
                onClose={() => setIsPostcodeOpen(false)}
                onComplete={handleComplete}
            />
        </>
    );
});
