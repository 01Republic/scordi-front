import React, {memo, Dispatch, SetStateAction} from 'react';
import {useFormContext} from 'react-hook-form';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {BusinessTypeSelector} from '^_components/pages/assets/connect-steps/common/BusinessTypeSelector';
import {CardCompanySelector} from '^_components/pages/assets/connect-steps/common/CardCompanySelector';

interface AccountConnectStepProps {
    setStep: () => void;
    cardCompany: CardAccountsStaticData | undefined;
    setCardCompany: React.Dispatch<React.SetStateAction<CardAccountsStaticData | undefined>>;
    setCodefCard: Dispatch<SetStateAction<CodefCardDto[] | undefined>>;
}

export const AccountConnectStep = memo((props: AccountConnectStepProps) => {
    const {setStep, cardCompany, setCardCompany, setCodefCard} = props;

    const {reset} = useFormContext<CreateAccountRequestDto>();
    return (
        <PureLayout>
            <div className="w-full flex flex-col gap-20">
                <div className="flex flex-col gap-10">
                    <StatusHeader
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                        onBack={() => reset({loginType: undefined})}
                    />
                    <BusinessTypeSelector />
                </div>

                <CardCompanySelector
                    setStep={setStep}
                    cardCompany={cardCompany}
                    setCardCompany={setCardCompany}
                    setCodefCard={setCodefCard}
                />
            </div>
        </PureLayout>
    );
});
