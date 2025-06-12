import React, {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useForm} from 'react-hook-form';
import cn from 'classnames';
import {AlertOctagon} from 'lucide-react';
import {errorToast} from '^api/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useShowSubscription, useUpdateSubscription} from '^models/Subscription/hook';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';
import {useUpdateVendorManager, useUpsertVendorManager} from '^models/vendor/VendorManager/hooks';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {VendorManagerSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorManagerSelectModal';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {CardSection} from '^clients/private/_components/CardSection';
import {VendorContractMemo} from './VendorContractMemo';
import {VendorCompanyName} from './VendorCompanyName';
import {VendorManager} from './VendorManager';

export const SubscriptionBusinessInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {currentSubscription: subscription} = useCurrentSubscription();
    const {mutateAsync: updateVendorManger} = useUpdateVendorManager();
    const {mutateAsync: upsertVendorManger} = useUpsertVendorManager();
    const {mutateAsync: updateSubscription} = useUpdateSubscription();
    const [isManagerSelectModalOpened, setIsManagerSelectModalOpened] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<VendorCompanyDto>();
    const [selectedManager, setSelectedManager] = useState<VendorManagerDto>();
    const [isError, setIsError] = useState<boolean>(false);
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isPhoneError, setIsPhoneError] = useState<boolean>(false);

    if (!subscription?.id) return <></>;

    useEffect(() => {
        if (selectedCompany) {
            setIsError(false);
        }
        if (selectedManager) {
            setIsEmailError(false);
            setIsPhoneError(false);
        }
    }, [selectedCompany, selectedManager]);

    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    if (!subscription) return <></>;

    const orgId = subscription.organizationId;
    const subscriptionId = subscription.id;
    const {data, isLoading} = useShowSubscription(subscriptionId, {
        relations: ['vendorContracts', 'vendorContracts.vendorCompany', 'vendorContracts.vendorManager'],
    });

    const vendorContract =
        data?.vendorContracts && data?.vendorContracts.length > 0 ? data?.vendorContracts[0] : undefined;

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

    const openManagerSelectModal = () => {
        setIsManagerSelectModalOpened(!!selectedCompany);
        !selectedCompany && setIsError(true);
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
            ? updateVendorManger({orgId, vendorMangerId: selectedManager.id})
            : Promise.resolve();

        // 매니저 이메일, 전화번호 업데이트
        const upsertManagerPromise = upsertVendorManger({
            orgId,
            dto: {
                vendorCompanyName: selectedCompany?.name || '',
                name: selectedManager?.name || '',
                email,
                phone,
            },
        });

        const updateSubscriptionPromise = updateSubscription({subscriptionId: subscription.id, data});

        Promise.all([updateManagerPromise, upsertManagerPromise, updateSubscriptionPromise])
            .then(() => setIsSaving(true))
            .then(() => {
                toast.success('변경사항을 저장했어요.');
                setIsEditMode(false);
            })
            .catch(errorToast)
            .finally(() => {
                setIsSaving(false);
            });
    };

    useEffect(() => {
        setSelectedCompany(vendorContract?.vendorCompany);
        setSelectedManager(vendorContract?.vendorManager);
    }, [vendorContract]);

    useEffect(() => {
        setEmail(selectedManager?.email || '');
        setPhone(selectedManager?.phone || '');
    }, [selectedManager]);

    return (
        <CardSection.Base>
            <CardSection.Form
                title="거래처 정보"
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                onSubmit={form.handleSubmit(onSubmit)}
                isButtonText={!vendorContract}
                isSaving={isSaving}
            >
                <VendorCompanyName
                    isEditMode={isEditMode}
                    vendorContract={vendorContract}
                    selectedCompany={selectedCompany}
                    selectedManager={selectedManager}
                    onCompanyChange={onCompanyChange}
                />
                <VendorManager
                    isEditMode={isEditMode}
                    isError={isError}
                    vendorContract={vendorContract}
                    selectedManager={selectedManager}
                    onManagerChange={onManagerChange}
                    onClick={openManagerSelectModal}
                />
                <FormControl label="이메일">
                    {isEditMode ? (
                        <div>
                            <input
                                className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                                value={email}
                                onChange={(e) => {
                                    const newEmail = e.target.value;
                                    setEmail(newEmail);
                                }}
                                readOnly={!selectedManager}
                                onClick={() => !selectedManager && setIsEmailError(true)}
                            />
                            {isEmailError && (
                                <div className="flex items-center gap-[3px] -mb-2 pt-2 w-full">
                                    <AlertOctagon className="text-error" />
                                    <p className="text-error text-13 ">담당자를 먼저 선택해주세요.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center" style={{height: '49.5px'}}>
                            {vendorContract?.vendorManager?.email || <EmptyValue />}
                        </div>
                    )}
                </FormControl>
                <FormControl label="전화번호">
                    {isEditMode ? (
                        <>
                            <input
                                className={cn('input border-gray-200 bg-gray-100 w-full flex flex-col justify-center', {
                                    'cursor-pointer': !selectedManager,
                                })}
                                value={phone}
                                onChange={(e) => {
                                    const newPhone = e.target.value;
                                    setPhone(newPhone);
                                }}
                                readOnly={!selectedManager}
                                onClick={() => !selectedManager && setIsPhoneError(true)}
                            />
                            {isPhoneError && (
                                <div className="flex items-center gap-[3px] -mb-2 pt-2 w-full">
                                    <AlertOctagon className="text-error" />
                                    <p className="text-error text-13">담당자를 먼저 선택해주세요.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center" style={{height: '49.5px'}}>
                            {vendorContract?.vendorManager?.phone || <EmptyValue />}
                        </div>
                    )}
                    <span />
                </FormControl>
                <VendorContractMemo isEditMode={isEditMode} form={form} vendorContract={vendorContract} />
                <VendorManagerSelectModal
                    isOpened={isManagerSelectModalOpened}
                    onClose={() => setIsManagerSelectModalOpened(false)}
                    selectedCompany={selectedCompany}
                    vendorManagerId={vendorContract?.vendorManager?.id || undefined}
                    onSelect={onManagerChange}
                />
            </CardSection.Form>
        </CardSection.Base>
    );
});
