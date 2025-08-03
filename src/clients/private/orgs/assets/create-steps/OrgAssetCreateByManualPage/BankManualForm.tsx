import {FormContainer} from '^_components/containers';
import {FormControl} from '^_components/inputs/FormControl';
import {orgIdParamState} from '^atoms/common';
import {FadeUp} from '^components/FadeUp';
import {bankAccountApi} from '^models/BankAccount/api';
import {BankAccountKind, BankAccountUsingStatus, CreateBankAccountRequestDto} from '^models/BankAccount/type';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {errorNotify} from '^utils/toast-notify';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useEffect, useState} from 'react';
import {FieldErrors, useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {BankAccountHoldingMemberIdSelect} from '../../bank-accounts/OrgBankAccountNewPage/BankAccountHoldingMemberIdSelect';
import {BankAccountIsPersonalSelect} from '../../bank-accounts/OrgBankAccountNewPage/BankAccountIsPersonalSelect';
import {BankUsingStatusSelect} from '../../bank-accounts/OrgBankAccountNewPage/BankUsingStatusSelect';

interface BankManualFormProps {
    selectedBank: BankAccountsStaticData;
    isPersonal: boolean;
}

export const BankManualForm = memo((props: BankManualFormProps) => {
    const {t} = useTranslation('assets');
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
            .then(() => toast.success(t('bankAccount.messages.saveSuccess') as string))
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
                        <h2 className="leading-none text-xl font-semibold">
                            {t('bankAccount.new.form.requiredInfo') as string}
                        </h2>
                        <FormControl label={t('bankAccount.new.form.name') as string} required>
                            <input
                                className={`input input-underline !bg-slate-100 w-full ${
                                    isLoading ? 'opacity-50 pointer-events-none' : ''
                                }`}
                                readOnly={isLoading}
                                {...form.register('name', {
                                    required: t('bankAccount.new.validation.nameRequired') as string,
                                })}
                            />
                            <span />
                        </FormControl>
                        <FormControl label={t('bankAccount.new.form.number') as string} required>
                            <input
                                type="number"
                                className={`input input-underline !bg-slate-100 w-full ${
                                    isLoading ? 'opacity-50 pointer-events-none' : ''
                                }`}
                                readOnly={isLoading}
                                {...form.register('number', {
                                    required: t('bankAccount.new.validation.numberRequired') as string,
                                })}
                            />
                            <span />
                        </FormControl>
                    </div>

                    <div className="max-w-md mx-auto flex flex-col gap-8">
                        <h2 className="leading-none text-xl font-semibold">
                            {t('bankAccount.new.form.optionalInfo') as string}
                        </h2>

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
