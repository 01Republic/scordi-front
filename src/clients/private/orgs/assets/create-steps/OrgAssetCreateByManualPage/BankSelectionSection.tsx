import { orgIdParamState } from '^atoms/common';
import { FormContainer } from '^clients/private/_components/containers/FormContainer';
import { FormControl } from '^clients/private/_components/inputs/FormControl';
import { FadeUp } from '^components/FadeUp';
import { bankAccountApi } from '^models/BankAccount/api';
import { BankAccountKind } from '^models/BankAccount/type/BankAccountKind.enum';
import { BankAccountUsingStatus } from '^models/BankAccount/type/BankAccountUsingStatus.enum';
import { CreateBankAccountRequestDto } from '^models/BankAccount/type/create.bank-account.request.dto';
import { BankAccountsStaticData } from '^models/CodefAccount/bank-account-static-data';
import { OrgBankAccountListPageRoute } from '^pages/orgs/[id]/bankAccounts';
import { errorNotify } from '^utils/toast-notify';
import { ConnectMethodCard } from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { BankAccountHoldingMemberIdSelect } from '../../bank-accounts/OrgBankAccountNewPage/BankAccountHoldingMemberIdSelect';
import { BankAccountIsPersonalSelect } from '../../bank-accounts/OrgBankAccountNewPage/BankAccountIsPersonalSelect';
import { BankUsingStatusSelect } from '../../bank-accounts/OrgBankAccountNewPage/BankUsingStatusSelect';

interface BankSelectionSectionProps {
    onSelect: (bank: BankAccountsStaticData | null) => void;
    selectedBank: BankAccountsStaticData | null;
    form: UseFormReturn<any>;
    onBack?: () => void;
    isPersonal: boolean;
}

export const BankSelectionSection = memo(function BankSelectionSection({ onSelect, selectedBank, form, onBack, isPersonal }: BankSelectionSectionProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const handleBankSelect = (bank: BankAccountsStaticData) => {
        if (selectedBank?.param === bank.param) {
            onSelect(null);
        } else {
            onSelect(bank);
        }
    };

    useEffect(() => {
        if (!router.isReady) return;
        form.setValue('usingStatus', BankAccountUsingStatus.InUse);
        form.setValue('isPersonal', isPersonal);
        form.setValue('kind', BankAccountKind.DEPOSIT_TRUST);
    }, [router.isReady]);

    const onSubmit = async (data: CreateBankAccountRequestDto) => {
        if (!data.name) {
            toast.error('계좌 별칭을 입력해주세요');
            return;
        }

        setIsLoading(true);
        bankAccountApi
            .create(orgId, data)
            .then(() => toast.success('계좌를 추가했어요.'))
            .then(() => router.push(OrgBankAccountListPageRoute.path(orgId)))
            .catch(errorNotify)
            .finally(() => setIsLoading(false));
    };

    return (
        <section className="relative mb-20">
            {!selectedBank && (
                <section className="flex flex-col gap-6">
                    <h2 className="text-xl font-semibold text-neutral-900">은행</h2>
                    <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {companies.map((company) => (
                            <InstitutionOption
                                key={company.param}
                                logo={company.logo}
                                title={company.displayName}
                                onClick={() => handleBankSelect(company)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {onBack && selectedBank && (
                <div className="mb-10 space-y-8">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <span>뒤로가기</span>
                    </button>

                    <div>
                        <h2 className="leading-none text-xl font-semibold mb-4">
                            계좌를 등록해주세요.
                        </h2>
                    </div>
                </div>
            )}

            {selectedBank && (
                <div className="flex items-center gap-4 justify-end mb-5">
                    <p className="text-16 text-gray-500">
                        선택된 은행: <b>{selectedBank.displayName}</b>
                    </p>
                    <button className="btn btn-xs btn-scordi gap-2" onClick={onBack}>
                        변경하기
                    </button>
                </div>
            )}

            <FadeUp show={!!selectedBank} delay="delay-[50ms]" leaveDuration="duration-0" leaveNoEffect>
                <FormContainer onSubmit={form.handleSubmit(onSubmit)} isLoading={isLoading}>
                    <input type="hidden" name="issuerCompany" value={selectedBank?.displayName} />
                    <div className="px-4 py-8 border-b">
                        <div className="max-w-md mx-auto flex flex-col gap-8 mb-16">
                            <h2 className="leading-none text-xl font-semibold">필수정보</h2>
                            <FormControl label="계좌 이름" required>
                                <input
                                    className={`input input-underline !bg-slate-100 w-full ${isLoading ? 'opacity-50 pointer-events-none' : ''
                                        }`}
                                    readOnly={isLoading}
                                    {...form.register('name', { required: true })}
                                    required
                                />
                                <span />
                            </FormControl>
                        </div>

                        <div className="max-w-md mx-auto flex flex-col gap-8">
                            <h2 className="leading-none text-xl font-semibold">선택정보</h2>
                            <FormControl label="계좌 번호">
                                <input
                                    type={'number'}
                                    className={`input input-underline !bg-slate-100 w-full ${isLoading ? 'opacity-50 pointer-events-none' : ''
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
                                    className={`input input-underline !bg-slate-100 w-full ${isLoading ? 'opacity-50 pointer-events-none' : ''
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
        </section>
    );
});

BankSelectionSection.displayName = 'BankSelectionSection';
