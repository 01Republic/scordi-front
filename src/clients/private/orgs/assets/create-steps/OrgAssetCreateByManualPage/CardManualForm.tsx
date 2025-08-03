import {FormContainer} from '^_components/containers';
import {FormControl} from '^_components/inputs/FormControl';
import {useOrgIdParam} from '^atoms/common';
import {FadeUp} from '^components/FadeUp';
import {useAltForm} from '^hooks/useAltForm';
import {creditCardApi} from '^models/CreditCard/api';
import {CreateCreditCardDto, CreditCardUsingStatus, UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {plainToInstance} from '^types/utils/class-transformer';
import {errorNotify} from '^utils/toast-notify';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {CardExpirySelects} from '../../credit-cards/OrgCreditCardNewPage/CardExpirySelects';
import {CardHoldingMemberIdSelect} from '../../credit-cards/OrgCreditCardNewPage/CardHoldingMemberIdSelect';
import {CardIsCreditCardSelect} from '../../credit-cards/OrgCreditCardNewPage/CardIsCreditCardSelect';
import {CardIsPersonalSelect} from '../../credit-cards/OrgCreditCardNewPage/CardIsPersonalSelect';
import {CardNumberInput} from '../../credit-cards/OrgCreditCardNewPage/CardNumberInput';
import {CardUsingStatusSelect} from '../../credit-cards/OrgCreditCardNewPage/CardUsingStatusSelect';

interface CardManualFormProps {
    isPersonal: boolean;
}

export const CardManualForm = memo((props: CardManualFormProps) => {
    const {t} = useTranslation('assets');
    const {isPersonal} = props;
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
        const {year = '', month = '', ...permittedValues} = plainData as any;
        const data = plainToInstance(UnSignedCreditCardFormData, permittedValues);

        if (!data.name) {
            toast.error(t('creditCard.new.validation.nameRequired') as string);
            return;
        }

        if (!data.number1 || !data.number2 || !data.number3 || !data.number4) {
            toast.error(t('creditCard.new.validation.numberRequired') as string);
            return;
        }

        const expiry = `${month}${year.slice(2, 4)}`;

        data.expiry = expiry;
        setFormValue({...permittedValues, expiry});

        setLoading(true);
        creditCardApi
            .create(orgId, data.toCreateDto())
            .then(() => toast.success(t('creditCard.messages.saveSuccess') as string))
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
                        <h2 className="leading-none text-xl font-semibold">
                            {t('creditCard.new.form.requiredInfo') as string}
                        </h2>
                        <FormControl label={t('creditCard.new.form.name') as string} required>
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
