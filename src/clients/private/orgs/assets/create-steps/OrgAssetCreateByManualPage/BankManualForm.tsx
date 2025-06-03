import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {FieldErrors, useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {errorNotify} from '^utils/toast-notify';
import {orgIdParamState} from '^atoms/common';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {bankAccountApi} from '^models/BankAccount/api';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {BankAccountKind, BankAccountUsingStatus, CreateBankAccountRequestDto} from '^models/BankAccount/type';
import {FadeUp} from '^components/FadeUp';
import {FormContainer} from '^_components/containers';
import {FormControl} from '^_components/inputs/FormControl';
import {BankUsingStatusSelect} from '../../bank-accounts/OrgBankAccountNewPage/BankUsingStatusSelect';
import {BankAccountIsPersonalSelect} from '../../bank-accounts/OrgBankAccountNewPage/BankAccountIsPersonalSelect';
import {BankAccountHoldingMemberIdSelect} from '../../bank-accounts/OrgBankAccountNewPage/BankAccountHoldingMemberIdSelect';

interface BankManualFormProps {
    selectedBank: BankAccountsStaticData;
    isPersonal: boolean;
}

export const BankManualForm = memo((props: BankManualFormProps) => {
    const {selectedBank, isPersonal} = props;

    const form = useForm<CreateBankAccountRequestDto>({
        mode: 'onChange',
    });

    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        form.setValue('usingStatus', BankAccountUsingStatus.InUse);
        form.setValue('isPersonal', isPersonal);
        form.setValue('kind', BankAccountKind.DEPOSIT_TRUST);
    }, [router.isReady]);

    const onSubmit = async (data: CreateBankAccountRequestDto) => {
        if (!selectedBank) return;
        const payload = {...data, bank: selectedBank.param};

        setIsLoading(true);
        bankAccountApi
            .create(orgId, payload)
            .then(() => toast.success('계좌를 추가했어요.'))
            .then(() => router.push(OrgBankAccountListPageRoute.path(orgId)))
            .catch(errorNotify)
            .finally(() => setIsLoading(false));
    };

    const onError = (errors: FieldErrors<CreateBankAccountRequestDto>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message);
        }
    };

    return (
        <FadeUp show={true} leaveDuration="duration-0" leaveNoEffect>
            <FormContainer onSubmit={form.handleSubmit(onSubmit, onError)} isLoading={isLoading}>
                <div className="px-4 py-8 border-b">
                    <div className="max-w-md mx-auto flex flex-col gap-8 mb-16">
                        <h2 className="leading-none text-xl font-semibold">필수정보</h2>
                        <FormControl label="계좌 이름" required>
                            <input
                                className={`input input-underline !bg-slate-100 w-full ${
                                    isLoading ? 'opacity-50 pointer-events-none' : ''
                                }`}
                                readOnly={isLoading}
                                {...form.register('name', {required: '계좌 이름을 입력해주세요'})}
                            />
                            <span />
                        </FormControl>
                        <FormControl label="계좌 번호" required>
                            <input
                                type="number"
                                className={`input input-underline !bg-slate-100 w-full ${
                                    isLoading ? 'opacity-50 pointer-events-none' : ''
                                }`}
                                readOnly={isLoading}
                                {...form.register('number', {required: '계좌 번호를 입력해주세요'})}
                            />
                            <span />
                        </FormControl>
                    </div>

                    <div className="max-w-md mx-auto flex flex-col gap-8">
                        <h2 className="leading-none text-xl font-semibold">선택정보</h2>

                        <BankUsingStatusSelect
                            isLoading={isLoading}
                            defaultValue={form.getValues('usingStatus') || BankAccountUsingStatus.InUse}
                            onChange={(status) => form.setValue('usingStatus', status)}
                        />
                        <BankAccountIsPersonalSelect
                            isLoading={isLoading}
                            defaultValue={isPersonal}
                            onChange={(val) => form.setValue('isPersonal', val || !isPersonal)}
                        />
                        <BankAccountHoldingMemberIdSelect
                            isLoading={isLoading}
                            defaultValue={form.getValues('holdingMemberId') || undefined}
                            onChange={(member) => form.setValue('holdingMemberId', member)}
                        />
                        <FormControl label="비고">
                            <input
                                className={`input input-underline !bg-slate-100 w-full ${
                                    isLoading ? 'opacity-50 pointer-events-none' : ''
                                }`}
                                readOnly={isLoading}
                                {...form.register('memo')}
                            />
                            <span />
                        </FormControl>
                    </div>
                </div>
            </FormContainer>
        </FadeUp>
    );
});
