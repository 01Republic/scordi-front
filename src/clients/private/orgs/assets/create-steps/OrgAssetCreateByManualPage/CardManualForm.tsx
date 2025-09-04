import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {useOrgIdParam} from '^atoms/common';
import {useAltForm} from '^hooks/useAltForm';
import {errorNotify} from '^utils/toast-notify';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {plainToInstance} from '^types/utils/class-transformer';
import {creditCardApi} from '^models/CreditCard/api';
import {CreateCreditCardDto, CreditCardUsingStatus, UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {FadeUp} from '^components/FadeUp';
import {FormContainer} from '^_components/containers';
import {FormControl} from '^_components/inputs/FormControl';
import {CardNumberInput} from '../../credit-cards/OrgCreditCardNewPage/CardNumberInput';
import {CardUsingStatusSelect} from '../../credit-cards/OrgCreditCardNewPage/CardUsingStatusSelect';
import {CardIsPersonalSelect} from '../../credit-cards/OrgCreditCardNewPage/CardIsPersonalSelect';
import {CardIsCreditCardSelect} from '../../credit-cards/OrgCreditCardNewPage/CardIsCreditCardSelect';
import {CardExpirySelects} from '../../credit-cards/OrgCreditCardNewPage/CardExpirySelects';
import {CardHoldingMemberIdSelect} from '../../credit-cards/OrgCreditCardNewPage/CardHoldingMemberIdSelect';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

interface CardManualFormProps {
    selectedCard: CardAccountsStaticData;
    isPersonal: boolean;
}

export const CardManualForm = memo((props: CardManualFormProps) => {
    const {selectedCard, isPersonal} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        setFormValue({
            usingStatus: CreditCardUsingStatus.InUse,
            isPersonal: isPersonal,
            isCreditCard: true,
        });
    }, [router.isReady]);

    const {formData, setFormValue, handleSubmitPlain} = useAltForm<CreateCreditCardDto>({} as CreateCreditCardDto, {
        plainTransform(plainData) {
            const {isCreditCard, isPersonal, holdingMemberId, ...permittedValues} = plainData as any;
            return {
                ...permittedValues,
                isCreditCard: typeof isCreditCard === 'undefined' ? undefined : isCreditCard === 'true',
                isPersonal: typeof isPersonal === 'undefined' ? undefined : isPersonal === 'true',
                holdingMemberId: holdingMemberId === '' ? null : Number(holdingMemberId),
            };
        },
    });

    const cardCompany = formData.issuerCompany || undefined;

    const onSubmit = (plainData: CreateCreditCardDto) => {
        if (!selectedCard) return;
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

        const expiry = `${month}${year.slice(2, 4)}`;

        data.issuerCompany = selectedCard.displayName;
        data.expiry = expiry;
        setFormValue({...permittedValues, expiry});

        console.log(data);

        setLoading(true);
        creditCardApi
            .create(orgId, data.toCreateDto())
            .then(() => toast.success('카드를 추가했어요.'))
            .then(() => router.push(OrgCreditCardListPageRoute.path(orgId)))
            .catch(errorNotify)
            .finally(() => setLoading(false));
    };

    return (
        <FadeUp show={true} delay="delay-[50ms]" leaveDuration="duration-0" leaveNoEffect>
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
                        <CardIsPersonalSelect isLoading={isLoading} defaultValue={formData.isPersonal ?? isPersonal} />
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
    );
});
