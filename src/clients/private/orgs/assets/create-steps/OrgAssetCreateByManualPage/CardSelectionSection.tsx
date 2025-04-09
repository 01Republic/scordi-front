import { useOrgIdParam } from '^atoms/common';
import { FormContainer } from '^clients/private/_components/containers';
import { FormControl } from '^clients/private/_components/inputs/FormControl';
import { FadeUp } from '^components/FadeUp';
import { useAltForm } from '^hooks/useAltForm';
import { CardAccountsStaticData } from '^models/CodefAccount/card-accounts-static-data';
import { creditCardApi } from '^models/CreditCard/api';
import { CreditCardUsingStatus, UnSignedCreditCardFormData } from '^models/CreditCard/type';
import { CreateCreditCardDto } from '^models/CreditCard/type/CreateCreditCard.dto';
import { OrgCreditCardListPageRoute } from '^pages/orgs/[id]/creditCards';
import { plainToInstance } from '^types/utils/class-transformer';
import { errorNotify } from '^utils/toast-notify';
import { ConnectMethodCard } from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CardExpirySelects } from '../../credit-cards/OrgCreditCardNewPage/CardExpirySelects';
import { CardHoldingMemberIdSelect } from '../../credit-cards/OrgCreditCardNewPage/CardHoldingMemberIdSelect';
import { CardIsCreditCardSelect } from '../../credit-cards/OrgCreditCardNewPage/CardIsCreditCardSelect';
import { CardIsPersonalSelect } from '../../credit-cards/OrgCreditCardNewPage/CardIsPersonalSelect';
import { CardNumberInput } from '../../credit-cards/OrgCreditCardNewPage/CardNumberInput';
import { CardUsingStatusSelect } from '../../credit-cards/OrgCreditCardNewPage/CardUsingStatusSelect';

interface CardSelectionSectionProps {
    onSelect: (card: CardAccountsStaticData | null) => void;
    selectedCard: CardAccountsStaticData | null;
    form: any;
    onBack?: () => void;
    isPersonal: boolean;
}

export const CardSelectionSection = memo(function CardSelectionSection({ onSelect, selectedCard, form, onBack, isPersonal }: CardSelectionSectionProps) {
    const handleCardSelect = (card: CardAccountsStaticData) => {
        if (selectedCard?.param === card.param) {
            onSelect(null);
        } else {
            onSelect(card);
        }
    };

    const router = useRouter();
    const orgId = useOrgIdParam();
    const { formData, setFormValue, handleSubmitPlain } = useAltForm<CreateCreditCardDto>({} as CreateCreditCardDto, {
        plainTransform(plainData) {
            const { isCreditCard, isPersonal, holdingMemberId, ...permittedValues } = plainData as any;
            return {
                ...permittedValues,
                isCreditCard: typeof isCreditCard === 'undefined' ? undefined : isCreditCard === 'true',
                isPersonal: typeof isPersonal === 'undefined' ? undefined : isPersonal === 'true',
                holdingMemberId: holdingMemberId === '' ? null : Number(holdingMemberId),
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
        const { year = '', month = '', ...permittedValues } = plainData as any;
        const data = plainToInstance(UnSignedCreditCardFormData, permittedValues);

        if (!data.name) {
            toast.error('카드 별칭을 입력해주세요');
            return;
        }

        if (!data.number1 || !data.number2 || !data.number3 || !data.number4) {
            toast.error('카드 번호를 입력해주세요');
            return;
        }

        // if (!month || !year) {
        //     toast.error('유효기간 입력이 완료되지 않았습니다');
        //     return;
        // }
        // if (year.length != 4 || month.length != 2) {
        //     toast.error('유효기간 입력이 올바르지 않습니다');
        //     return;
        // }

        const expiry = `${month}${year.slice(2, 4)}`;

        data.expiry = expiry;
        setFormValue({ ...permittedValues, expiry });

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
        setFormValue({ issuerCompany: company ? company.displayName : undefined });
    };

    return (
        <section className="relative mb-20">
            {!selectedCard && (
                <>
                    <h2 className="leading-none text-xl font-semibold mb-4">카드</h2>
                    <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {CardAccountsStaticData.findByPersonal(isPersonal).map((card, i) => (
                            <div key={i}>
                                <ConnectMethodCard
                                    logo={card.logo}
                                    title={card.displayName}
                                    onClick={() => handleCardSelect(card)}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {onBack && selectedCard && (
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
                            카드를 등록해주세요.
                        </h2>
                    </div>
                </div>
            )}



            {selectedCard && (
                <div className="flex items-center gap-4 justify-end mb-5">
                    <p className="text-16 text-gray-500">
                        선택된 카드사: <b>{selectedCard.displayName}</b>
                    </p>
                    <button className="btn btn-xs btn-scordi gap-2" onClick={onBack}>
                        변경하기
                    </button>
                </div>
            )}

            <FadeUp show={!!selectedCard} delay="delay-[50ms]" leaveDuration="duration-0" leaveNoEffect>
                <FormContainer onSubmit={handleSubmitPlain(onSubmit)} isLoading={isLoading}>
                    <input type="hidden" name="issuerCompany" value={cardCompany} />
                    <div className="px-4 py-8 border-b">
                        <div className="max-w-md mx-auto flex flex-col gap-8 mb-16">
                            <h2 className="leading-none text-xl font-semibold">필수정보</h2>
                            <FormControl label="카드 이름" required>
                                <input
                                    name="name"
                                    className={`input input-underline !bg-slate-100 w-full ${isLoading ? 'opacity-50 pointer-events-none' : ''
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
                                    className={`input input-underline !bg-slate-100 w-full ${isLoading ? 'opacity-50 pointer-events-none' : ''
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
        </section>
    );
});

CardSelectionSection.displayName = 'CardSelectionSection';
