import {FormControl} from '^clients/private/_components/inputs/FormControl';
import React, {memo, useEffect, useState} from 'react';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';
import {VendorCompanySelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorCompanySelectModal';
import {VendorManagerSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorManagerSelectModal';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {useForm} from 'react-hook-form';
import {vendorManagerApi} from '^models/vendor/VendorManager/api';
import {errorToast} from '^api/api';
import {EmptyValue} from '../EmptyValue';
import {X} from 'lucide-react';

export const SubscriptionBusinessInfoSectiontest = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {reload, currentSubscription: subscription} = useCurrentSubscription();
    const [isCompanySelectModalOpened, setIsCompanySelectModalOpened] = useState(false);
    const [isManagerSelectModalOpened, setIsManagerSelectModalOpened] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<VendorCompanyDto>();
    const [selectedManager, setSelectedManager] = useState<VendorManagerDto>();

    // 매니저 정보 업데이트를 위한 정보값
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    if (!subscription) return <></>;

    const onCompanyChange = (vendorCompany?: VendorCompanyDto) => {
        form.setValue('vendorContract.vendorCompanyId', vendorCompany?.id || null);
        form.setValue(
            'vendorContract.vendorManagerId',
            vendorCompany?.id === selectedCompany?.id ? selectedManager?.id : null,
        );

        setSelectedCompany(vendorCompany);
        if (vendorCompany) {
            const isChanged = vendorCompany.id !== selectedCompany?.id;
            if (isChanged) setSelectedManager(undefined);
            setIsManagerSelectModalOpened(true);
        } else {
            setSelectedManager(undefined);
        }
    };

    const onManagerChange = (vendorManager?: VendorManagerDto) => {
        setSelectedManager(vendorManager);
        form.setValue('vendorContract.vendorManagerId', vendorManager?.id || null);
        setEmail(selectedManager?.email || '');
        setPhone(selectedManager?.phone || '');
    };

    const onSubmit = (data: UpdateSubscriptionRequestDto) => {
        // 연결된 매니저 변경 시
        const updateManagerPromise = selectedManager
            ? vendorManagerApi.update(subscription.organizationId, selectedManager.id)
            : Promise.resolve();

        // 매니저 이메일, 전화번호 업데이트
        const upsertManagerPromise = vendorManagerApi.upsert(subscription.organizationId, {
            vendorCompanyName: selectedCompany?.name || '',
            name: selectedManager?.name || '',
            email,
            phone,
        });

        const updateSubscriptionPromise = subscriptionApi.update(subscription.id, data);

        setIsSaving(true);
        Promise.all([updateManagerPromise, upsertManagerPromise, updateSubscriptionPromise])
            .then(() => reload())
            .then(() => {
                toast.success('변경사항을 저장했어요.');
                setIsEditMode(false);
            })
            .catch(errorToast)
            .finally(() => setIsSaving(false));
    };

    const vendorContract =
        subscription?.vendorContracts && subscription?.vendorContracts.length > 0
            ? subscription?.vendorContracts[0]
            : undefined;

    useEffect(() => {
        setSelectedCompany(vendorContract?.vendorCompany);
        setSelectedManager(vendorContract?.vendorManager);
    }, [vendorContract]);

    useEffect(() => {
        setEmail(selectedManager?.email || '');
        setPhone(selectedManager?.phone || '');
    }, [selectedManager]);

    return (
        <section>
            <div className="card card-bordered bg-white rounded-md relative">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a className="link text-14" onClick={() => setIsEditMode((v) => !v)}>
                            {isEditMode ? '취소' : vendorContract ? '수정' : '추가'}
                        </a>

                        {isEditMode && (
                            <button className={`btn btn-sm btn-scordi ${isSaving ? 'loading' : ''}`} type={'submit'}>
                                저장
                            </button>
                        )}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md">
                            <h2 className="leading-none text-xl font-semibold">거래처 정보</h2>

                            <div
                                className={`flex flex-col gap-4 overflow-hidden transition-all h-auto ${
                                    isEditMode || vendorContract ? '' : '!h-0'
                                }`}
                            >
                                <div className="pt-4"></div>

                                <FormControl label="거래처">
                                    {isEditMode ? (
                                        <div
                                            className="cursor-pointer input border-gray-200 bg-gray-100 w-full flex items-center justify-between"
                                            onClick={() => setIsCompanySelectModalOpened(true)}
                                        >
                                            <div>{selectedCompany?.name || <EmptyValue />}</div>
                                            {selectedCompany && (
                                                <X
                                                    size={16}
                                                    className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                                                    onClick={(e) => {
                                                        onCompanyChange(undefined);
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center" style={{height: '49.5px'}}>
                                            {vendorContract?.vendorCompany?.name || <EmptyValue />}
                                        </div>
                                    )}
                                    <span />
                                </FormControl>

                                <FormControl label="담당자">
                                    {isEditMode ? (
                                        <div
                                            className="cursor-pointer input border-gray-200 bg-gray-100 w-full flex items-center justify-between"
                                            onClick={() => setIsManagerSelectModalOpened(true)}
                                        >
                                            <div>{selectedManager?.name || <EmptyValue />}</div>
                                            {selectedManager && (
                                                <X
                                                    size={16}
                                                    className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                                                    onClick={(e) => {
                                                        onManagerChange(undefined);
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center" style={{height: '49.5px'}}>
                                            {vendorContract?.vendorManager?.name || <EmptyValue />}
                                        </div>
                                    )}
                                    <span />
                                </FormControl>

                                <FormControl label="이메일">
                                    {isEditMode ? (
                                        <input
                                            className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                                            value={email}
                                            onChange={(e) => {
                                                const newEmail = e.target.value;
                                                setEmail(newEmail);
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center" style={{height: '49.5px'}}>
                                            {selectedManager?.email || <EmptyValue />}
                                        </div>
                                    )}
                                    <span />
                                </FormControl>

                                <FormControl label="전화번호">
                                    {isEditMode ? (
                                        <input
                                            className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                                            value={phone}
                                            onChange={(e) => {
                                                const newPhone = e.target.value;
                                                setPhone(newPhone);
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center" style={{height: '49.5px'}}>
                                            {selectedManager?.phone || <EmptyValue />}
                                        </div>
                                    )}
                                    <span />
                                </FormControl>

                                <FormControl label="비고">
                                    {isEditMode ? (
                                        <input
                                            className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                                            defaultValue={vendorContract?.memo || undefined}
                                            onChange={(e) => {
                                                form.setValue('vendorContract.memo', e.target.value);
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center" style={{height: '49.5px'}}>
                                            {vendorContract?.memo || <EmptyValue />}
                                        </div>
                                    )}
                                    <span />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <VendorCompanySelectModal
                isOpened={isCompanySelectModalOpened}
                onClose={() => setIsCompanySelectModalOpened(false)}
                vendorCompanyId={vendorContract?.vendorCompany?.id || undefined}
                onSelect={onCompanyChange}
            />

            <VendorManagerSelectModal
                isOpened={isManagerSelectModalOpened}
                onClose={() => setIsManagerSelectModalOpened(false)}
                selectedCompany={selectedCompany}
                vendorManagerId={vendorContract?.vendorManager?.id || undefined}
                onSelect={onManagerChange}
            />
        </section>
    );
});
