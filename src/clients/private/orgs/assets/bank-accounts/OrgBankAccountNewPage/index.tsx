import {orgIdParamState} from '^atoms/common';
import {FormContainer} from '^clients/private/_components/containers';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {FadeUp} from '^components/FadeUp';
import {bankAccountApi} from '^models/BankAccount/api';
import {BankAccountKind, BankAccountUsingStatus, CreateBankAccountRequestDto} from '^models/BankAccount/type';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {errorNotify} from '^utils/toast-notify';
import {ConnectMethodCard} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {BankAccountHoldingMemberIdSelect} from './BankAccountHoldingMemberIdSelect';
import {BankAccountIsPersonalSelect} from './BankAccountIsPersonalSelect';
import {BankUsingStatusSelect} from './BankUsingStatusSelect';

export const OrgBankAccountNewPage = memo(function OrgBankAccountNewPage() {
    const {t} = useTranslation('assets');
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const form = useForm<CreateBankAccountRequestDto>();
    const [isLoading, setLoading] = useState(false);
    const [selectedBank, setSelectedBank] = useState<BankAccountsStaticData>();

    useEffect(() => {
        if (!router.isReady) return;
        form.setValue('usingStatus', BankAccountUsingStatus.InUse);
        form.setValue('isPersonal', false);
        form.setValue('kind', BankAccountKind.DEPOSIT_TRUST);
    }, [router.isReady]);

    const onSubmit = async (data: CreateBankAccountRequestDto) => {
        if (!data.name) {
            toast.error(t('bankAccount.new.validation.nameRequired') as string);
            return;
        }

        setLoading(true);
        bankAccountApi
            .create(orgId, data)
            .then(() => toast.success(t('bankAccount.messages.saveSuccess') as string))
            .then(() => router.push(OrgBankAccountListPageRoute.path(orgId)))
            .catch(errorNotify)
            .finally(() => setLoading(false));
    };

    const setCompany = (bank?: BankAccountsStaticData) => {
        bank ? form.setValue('bank', bank.param) : form.resetField('bank');
        setSelectedBank(bank);
    };

    form.register('bank');

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        t('common.asset') as string,
                        {
                            text: t('bankAccount.title') as string,
                            active: false,
                            href: OrgBankAccountListPageRoute.path(orgId),
                        },
                        {text: t('common.addAsset') as string, active: true},
                    ]}
                />

                <br />

                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-2xl mb-1">{t('common.addAsset') as string}</h1>
                    </div>
                </div>

                {/* 은행사 선택 단계 */}
                {!selectedBank && (
                    <div>
                        <section className="relative mb-12">
                            <div className="mb-4">
                                <h2 className="leading-none text-xl font-semibold mb-2">
                                    {t('bankAccount.new.step1.title') as string}
                                </h2>
                                <p className="text-16 text-gray-500">
                                    {t('bankAccount.new.step1.description') as string}
                                </p>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    {label: t('bankAccount.new.step1.corporate') as string, value: false},
                                    {label: t('bankAccount.new.step1.personal') as string, value: true},
                                ].map((option, i) => {
                                    const active = form.watch('isPersonal') === option.value;
                                    return (
                                        <div key={i}>
                                            <button
                                                onClick={() => form.setValue('isPersonal', option.value)}
                                                className={`btn no-animation btn-animation gap-4 btn-block rounded-md justify-start font-normal ${
                                                    active
                                                        ? '!bg-indigo-50 !border-scordi'
                                                        : '!bg-white border-gray-200 hover:border-scordi'
                                                }`}
                                            >
                                                <span
                                                    className={`w-[10px] h-[10px] rounded-full outline outline-1 outline-offset-2 ${
                                                        active
                                                            ? 'bg-indigo-400 outline-indigo-500'
                                                            : 'bg-slate-300  outline-slate-300'
                                                    }`}
                                                ></span>
                                                <span>{option.label}</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="relative mb-20">
                            <div className="mb-10">
                                <h2 className="leading-none text-xl font-semibold mb-4">
                                    {t('bankAccount.new.step2.title') as string}
                                </h2>
                                <p className="text-16 text-gray-500"></p>
                            </div>

                            <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {BankAccountsStaticData.findByPersonal(form.getValues('isPersonal') || false).map(
                                    (company, i) => (
                                        <div key={i}>
                                            <ConnectMethodCard
                                                logo={company.logo}
                                                title={company.displayName}
                                                onClick={() => setCompany(company)}
                                            />
                                        </div>
                                    ),
                                )}
                            </div>
                        </section>
                    </div>
                )}

                {/* 정보입력 단계 */}
                <FadeUp show={!!selectedBank} delay="delay-[50ms]" leaveDuration="duration-0" leaveNoEffect>
                    <div className="mb-10 flex items-center justify-between">
                        <h2 className="leading-none text-xl font-semibold">
                            {t('bankAccount.new.step3.title') as string}
                        </h2>

                        <div className="flex items-center gap-4">
                            <p className="text-16 text-gray-500">
                                {t('bankAccount.new.step3.selectedBank') as string}: <b>{selectedBank?.displayName}</b>
                            </p>
                            <button className="btn btn-xs btn-scordi gap-2" onClick={() => setCompany(undefined)}>
                                {t('bankAccount.new.step3.change') as string}
                            </button>
                        </div>
                    </div>

                    <FormContainer onSubmit={form.handleSubmit(onSubmit)} isLoading={isLoading}>
                        <input type="hidden" name="issuerCompany" value={selectedBank?.displayName} />
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
                                        {...form.register('name', {required: true})}
                                        required
                                    />
                                    <span />
                                </FormControl>
                            </div>

                            <div className="max-w-md mx-auto flex flex-col gap-8">
                                <h2 className="leading-none text-xl font-semibold">
                                    {t('bankAccount.new.form.optionalInfo') as string}
                                </h2>
                                <FormControl label={t('bankAccount.new.form.number') as string}>
                                    <input
                                        type={'number'}
                                        className={`input input-underline !bg-slate-100 w-full ${
                                            isLoading ? 'opacity-50 pointer-events-none' : ''
                                        }`}
                                        readOnly={isLoading}
                                        {...form.register('number')}
                                    />
                                    <span />
                                </FormControl>
                                <BankUsingStatusSelect
                                    isLoading={isLoading}
                                    defaultValue={form.getValues('usingStatus') || BankAccountUsingStatus.InUse}
                                    onChange={(status) => form.setValue('usingStatus', status)}
                                />
                                <BankAccountIsPersonalSelect
                                    isLoading={isLoading}
                                    defaultValue={form.getValues('isPersonal') ?? undefined}
                                    onChange={(isPersonal) => form.setValue('isPersonal', isPersonal || false)}
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
            </MainContainer>
        </MainLayout>
    );
});
