import {FormControl} from '^clients/private/_components/inputs/FormControl';
import React, {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {VendorCompanySelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorCompanySelectModal';
import {VendorManagerSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorManagerSelectModal';
import {useVendorCompanyListInCreateSubscription} from '^models/VendorCompany/hook';
import {useVendorManagerListInCreateSubscription} from '^models/VendorManager/hook';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';

type updateSubscriptionBasicInfo = {
    name: string;
    team: string;
    man: string;
    text: string;
};

export const SubscriptionBusinessInfoSection = memo(() => {
    const [formData, setFormData] = useState<UpdateSubscriptionRequestDto>({});
    const [isEditMode, setIsEditMode] = useState(false);
    const verdorCompanyForm = useForm<VendorCompanyDto>({});
    const vendorManagerForm = useForm<VendorManagerDto>({});
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const [isCompanySelectModalOpened, setIsCompanySelectModalOpened] = useState(false);
    const [isManagerSelectModalOpened, setIsManagerSelectModalOpened] = useState(false);
    const {result: searchedCompany} = useVendorCompanyListInCreateSubscription();
    const {result: searchedManager} = useVendorManagerListInCreateSubscription();
    const [selectedCompany, setSelectedCompany] = useState<VendorCompanyDto>();
    const [selectedManager, setSelectedManager] = useState<VendorManagerDto>();

    const onCompanyChange = (vendorCompany?: VendorCompanyDto) => {
        setSelectedCompany(vendorCompany);
        setFormData((f) => ({
            ...f,
            vendorCompanyId: vendorCompany?.id,
            vendorManagerId: vendorCompany && vendorCompany.id === f.vendorCompanyId ? f.vendorManagerId : undefined,
        }));
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
        setFormData((f) => ({
            ...f,
            vendorManagerId: vendorManager?.id,
        }));
    };

    const onSubmit = () => {
        console.log(VendorCompanyDto);
        console.log(VendorManagerDto);
    };

    return (
        <section>
            <div className="card card-bordered bg-white rounded-md relative">
                <form>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a className="link text-14" onClick={() => setIsEditMode((v) => !v)}>
                            {isEditMode ? '취소' : '수정'}
                        </a>

                        {isEditMode && (
                            <button className="btn btn-sm btn-scordi" onClick={onSubmit}>
                                저장
                            </button>
                        )}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">거래처 정보</h2>

                            <FormControl label="거래처" required={isEditMode}>
                                {isEditMode ? (
                                    <a
                                        className={'input-underline'}
                                        onClick={() => setIsCompanySelectModalOpened(true)}
                                    >
                                        <input
                                            className="input input-underline !bg-slate-100 w-full"
                                            value={subscription?.vendorCompany?.name || undefined}
                                        />
                                    </a>
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.vendorCompany?.name}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="담당자" required={isEditMode}>
                                {isEditMode ? (
                                    <a
                                        className={'input-underline'}
                                        onClick={() => setIsManagerSelectModalOpened(true)}
                                    >
                                        <input
                                            className="input input-underline !bg-slate-100 w-full"
                                            value={subscription?.vendorManager?.name || undefined}
                                            required
                                        />
                                    </a>
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.vendorManager?.name || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="이메일" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        value={subscription?.vendorManager?.email || undefined}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.vendorManager?.email || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="전화번호" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        value={subscription?.vendorManager?.phone || undefined}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.vendorManager?.phone || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="비고" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        value={subscription?.vendorManager?.jobName || undefined}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {/* TODO 메모 없음 */}
                                        {subscription?.vendorManager?.jobName || undefined}
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
                vendorCompanyId={formData.vendorCompanyId}
                onSelect={onCompanyChange}
            />

            <VendorManagerSelectModal
                isOpened={isManagerSelectModalOpened}
                onClose={() => setIsManagerSelectModalOpened(false)}
                selectedCompany={selectedCompany}
                vendorManagerId={formData.vendorManagerId}
                onSelect={onManagerChange}
            />
        </section>
    );
});
