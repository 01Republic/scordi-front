import {FormControl} from '^clients/private/_components/inputs/FormControl';
import React, {memo, useState} from 'react';
import {useRecoilState} from 'recoil';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';
import {VendorCompanySelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorCompanySelectModal';
import {VendorManagerSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorManagerSelectModal';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {useForm} from 'react-hook-form';

export const SubscriptionBusinessInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [subscription, setSubscription] = useRecoilState(subscriptionSubjectAtom);
    const [isCompanySelectModalOpened, setIsCompanySelectModalOpened] = useState(false);
    const [isManagerSelectModalOpened, setIsManagerSelectModalOpened] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<VendorCompanyDto>();
    const [selectedManager, setSelectedManager] = useState<VendorManagerDto>();

    if (!subscription) return null;

    const onCompanyChange = (vendorCompany?: VendorCompanyDto) => {
        setSelectedCompany(vendorCompany);
        form.setValue('vendorContract.vendorCompanyId', vendorCompany?.id);
        form.setValue(
            'vendorContract.vendorManagerId',
            vendorCompany?.id === selectedCompany?.id ? selectedManager?.id : undefined,
        );

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
        form.setValue('vendorContract.vendorManagerId', vendorManager?.id);
    };

    const onSubmit = (data: UpdateSubscriptionRequestDto) => {
        subscriptionApi.update(subscription?.id, data).then((res) => {
            toast.success('변경사항을 저장했어요.');
            setIsEditMode(false);
            // TODO 리턴값에 벤더 관련 내용이 없음
            setSubscription(res.data);
        });
    };

    const vendorContract =
        subscription?.vendorContracts && subscription?.vendorContracts.length > 0
            ? subscription?.vendorContracts[0]
            : undefined;

    console.log('vendorContract', vendorContract);

    return (
        <section>
            <div className="card card-bordered bg-white rounded-md relative">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a className="link text-14" onClick={() => setIsEditMode((v) => !v)}>
                            {isEditMode ? '취소' : '수정'}
                        </a>

                        {isEditMode && (
                            <button className="btn btn-sm btn-scordi" type={'submit'}>
                                저장
                            </button>
                        )}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">거래처 정보</h2>

                            <FormControl label="거래처">
                                {isEditMode ? (
                                    <a
                                        className={
                                            'block py-3 input input-underline !bg-slate-100 w-full cursor-pointer'
                                        }
                                        onClick={() => setIsCompanySelectModalOpened(true)}
                                    >
                                        {vendorContract?.vendorCompany?.name || undefined}
                                    </a>
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {vendorContract?.vendorCompany?.name || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="담당자">
                                {isEditMode ? (
                                    <a
                                        className={
                                            'block py-3 input input-underline !bg-slate-100 w-full cursor-pointer'
                                        }
                                        onClick={() => setIsManagerSelectModalOpened(true)}
                                    >
                                        {vendorContract?.vendorManager?.name || undefined}
                                    </a>
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {vendorContract?.vendorManager?.name || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="이메일">
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        defaultValue={vendorContract?.vendorManager?.email || undefined}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {vendorContract?.vendorManager?.email || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="전화번호">
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        defaultValue={vendorContract?.vendorManager?.phone || undefined}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {vendorContract?.vendorManager?.phone || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="비고">
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        defaultValue={vendorContract?.memo || undefined}
                                        onChange={(e) => {
                                            form.setValue('vendorContract.memo', e.target.value);
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {vendorContract?.memo || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>
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