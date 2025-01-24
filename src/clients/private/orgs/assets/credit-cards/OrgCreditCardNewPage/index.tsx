import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {plainToInstance} from 'class-transformer';
import {toast} from 'react-hot-toast';
import {errorNotify} from '^utils/toast-notify';
import {useOrgIdParam} from '^atoms/common';
import {CreateCreditCardDto, CreditCardUsingStatus, UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {useAltForm} from '^hooks/useAltForm';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {FadeUp} from '^components/FadeUp';
import {FormContainer} from '^clients/private/_components/containers';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {ConnectMethodCard} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import {CardNumberInput} from './CardNumberInput';
import {CardUsingStatusSelect} from './CardUsingStatusSelect';
import {CardIsPersonalSelect} from './CardIsPersonalSelect';
import {CardIsCreditCardSelect} from './CardIsCreditCardSelect';
import {CardExpirySelects} from './CardExpirySelects';
import {CardHoldingMemberIdSelect} from './CardHoldingMemberIdSelect';

export const OrgCreditCardNewPage = memo(function OrgCreditCardNewPage() {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {formData, setFormValue, handleSubmitPlain} = useAltForm<CreateCreditCardDto>({} as CreateCreditCardDto, {
        plainTransform(plainData) {
            const {isCreditCard, isPersonal, holdingMemberId, ...permittedValues} = plainData as any;
            return {
                ...permittedValues,
                isCreditCard: typeof isCreditCard === 'undefined' ? undefined : isCreditCard === 'true',
                isPersonal: typeof isPersonal === 'undefined' ? undefined : isPersonal === 'true',
                holdingMemberId: typeof holdingMemberId === 'undefined' ? undefined : Number(holdingMemberId),
            };
        },
    });
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        setFormValue({
            usingStatus: CreditCardUsingStatus.InUse,
            isPersonal: false,
            isCreditCard: true,
        });
    }, [router.isReady]);

    const onSubmit = async (plainData: CreateCreditCardDto) => {
        const {year = '', month = '', ...permittedValues} = plainData as any;
        const data = plainToInstance(UnSignedCreditCardFormData, permittedValues);

        if (!data.name) {
            toast.error('카드 별칭을 입력해주세요');
            return;
        }

        if (!data.number1 || !data.number2 || !data.number3 || !data.number4) {
            toast.error('카드 번호를 입력해주세요');
            return;
        }

        if (!month || !year) {
            toast.error('유효기간 입력이 완료되지 않았습니다');
            return;
        }
        if (year.length != 4 || month.length != 2) {
            toast.error('유효기간 입력이 올바르지 않습니다');
            return;
        }
        const expiry = `${month}${year.slice(2, 4)}`;

        data.expiry = expiry;
        setFormValue({...permittedValues, expiry});

        setLoading(true);
        creditCardApi
            .create(orgId, data.toCreateDto())
            .then(() => toast.success('카드를 추가했어요.'))
            .then(() => router.push(OrgCreditCardListPageRoute.path(orgId)))
            .catch(errorNotify)
            .finally(() => setLoading(false));
    };

    const cardCompany = formData.issuerCompany || undefined;
    const setCompany = (company?: CardAccountsStaticData) => {
        setFormValue({issuerCompany: company ? company.displayName : undefined});
    };

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        '자산',
                        {text: '결제수단 (카드)', active: false, href: OrgCreditCardListPageRoute.path(orgId)},
                        {text: '결제수단 추가', active: true},
                    ]}
                />

                <br />

                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-2xl mb-1">결제수단 추가</h1>
                        {/*<p className="text-14 text-gray-500">*/}
                        {/*    결제수단을 스코디에 추가하기 위한 필수/선택 정보를 입력해주세요.*/}
                        {/*</p>*/}
                    </div>
                </div>

                {/* 카드사 선택 단계 */}
                {!cardCompany && (
                    <div>
                        <section className="relative mb-12">
                            <div className="mb-4">
                                <h2 className="leading-none text-xl font-semibold mb-2">
                                    Step1. 어떤 사업자 형태이신가요?
                                </h2>
                                <p className="text-16 text-gray-500">
                                    개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요.
                                </p>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    {label: '기업고객 (법인)', value: false},
                                    {label: '개인고객 (개인)', value: true},
                                ].map((option, i) => {
                                    const active = formData.isPersonal === option.value;
                                    return (
                                        <div key={i}>
                                            <button
                                                onClick={() => setFormValue({isPersonal: option.value})}
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
                                    Step2. 카드사를 선택해주세요.
                                </h2>
                                <p className="text-16 text-gray-500"></p>
                            </div>

                            <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {CardAccountsStaticData.findByPersonal(formData.isPersonal || false).map(
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
                <FadeUp show={!!cardCompany} delay="delay-[50ms]" leaveDuration="duration-0" leaveNoEffect>
                    <div className="mb-10 flex items-center justify-between">
                        <h2 className="leading-none text-xl font-semibold">Step3. 세부 정보를 입력해주세요.</h2>

                        <div className="flex items-center gap-4">
                            <p className="text-16 text-gray-500">
                                선택된 카드사: <b>{cardCompany}</b>
                            </p>
                            <button className="btn btn-xs btn-scordi gap-2" onClick={() => setCompany(undefined)}>
                                변경하기
                            </button>
                        </div>
                    </div>

                    <FormContainer onSubmit={handleSubmitPlain(onSubmit)} isLoading={isLoading}>
                        <input type="hidden" name="issuerCompany" value={cardCompany} />
                        <div className="px-4 py-8 border-b">
                            <div className="max-w-md mx-auto flex flex-col gap-8 mb-16">
                                <h2 className="leading-none text-xl font-semibold">필수정보</h2>
                                <FormControl label="카드 이름" required>
                                    <input
                                        name="name"
                                        className={`input input-underline !bg-slate-100 w-full ${
                                            isLoading ? 'opacity-50 pointer-events-none' : ''
                                        }`}
                                        readOnly={isLoading}
                                        defaultValue={formData.name || ''}
                                        required
                                    />
                                    <span />
                                </FormControl>

                                <FormControl label="카드 번호" required>
                                    <div className="grid grid-cols-4 gap-1.5">
                                        <div>
                                            <CardNumberInput
                                                name="number1"
                                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                                readOnly={isLoading}
                                                defaultValue={formData.number1}
                                            />
                                            <span />
                                        </div>
                                        <div>
                                            <CardNumberInput
                                                name="number2"
                                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                                readOnly={isLoading}
                                                defaultValue={formData.number2}
                                            />
                                            <span />
                                        </div>
                                        <div>
                                            <CardNumberInput
                                                name="number3"
                                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                                readOnly={isLoading}
                                                defaultValue={formData.number3}
                                            />
                                            <span />
                                        </div>
                                        <div>
                                            <CardNumberInput
                                                maxLength={5}
                                                name="number4"
                                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                                readOnly={isLoading}
                                                defaultValue={formData.number4}
                                            />
                                            <span />
                                        </div>
                                    </div>
                                </FormControl>
                            </div>

                            <div className="max-w-md mx-auto flex flex-col gap-8">
                                <h2 className="leading-none text-xl font-semibold">선택정보</h2>
                                <CardUsingStatusSelect
                                    isLoading={isLoading}
                                    defaultValue={formData.usingStatus || CreditCardUsingStatus.InUse}
                                />
                                <CardIsPersonalSelect
                                    isLoading={isLoading}
                                    defaultValue={formData.isPersonal ?? undefined}
                                />
                                <CardIsCreditCardSelect isLoading={isLoading} defaultValue={formData.isCreditCard} />
                                <CardExpirySelects isLoading={isLoading} defaultValue={formData.expiry} />
                                <CardHoldingMemberIdSelect
                                    isLoading={isLoading}
                                    defaultValue={formData.holdingMemberId || undefined}
                                />
                                <FormControl label="비고">
                                    <input
                                        name="memo"
                                        className={`input input-underline !bg-slate-100 w-full ${
                                            isLoading ? 'opacity-50 pointer-events-none' : ''
                                        }`}
                                        readOnly={isLoading}
                                        defaultValue={formData.memo || ''}
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
