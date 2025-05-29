import React, {memo, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {AssetsConnectStepFlashHandler} from '^_components/pages/assets/connect-steps/common/AssetsConnectStepFlashHandler';
import {SuccessConnectBankSelector} from './_component/SuccessConnectBankSelector';
import {SuccessConnectCardSelector} from './_component/SuccessConnectCardSelector';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {EmptyTable} from '^_components/table/EmptyTable';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {isDefinedValue} from '^utils/array';

interface SelectAssetsStepProps {
    codefAccounts: CodefAccountDto[];
    failedCompanies?: CodefApiAccountItemDto[];
    onBack?: () => any;
    onNext: (codefBanks: CodefBankAccountDto[], codefCards: CodefCardDto[], disabled: boolean) => any;
    disabledCTAButtonText?: string;
}

/**
 * 자산 선택p
 */
export const SelectAssetsStep = memo((props: SelectAssetsStepProps) => {
    const {codefAccounts = [], failedCompanies = [], onBack, onNext, disabledCTAButtonText} = props;
    const disabled = codefAccounts.length === 0;

    const successBanks = codefAccounts
        .filter((item) => item.isBankCompany)
        .map((item) => BankAccountsStaticData.findOne(item.organization))
        .filter(isDefinedValue);
    const successCards = codefAccounts
        .filter((item) => item.isCardCompany)
        .map((item) => CardAccountsStaticData.findOne(item.organization))
        .filter(isDefinedValue);
    const [selectedCodefBanks, setSelectedCodefBanks] = useState<CodefBankAccountDto[]>([]);
    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);

    return (
        <PureLayout>
            <div className="flex flex-col gap-20">
                <StatusHeader
                    title={
                        disabled ? '선택하신 금융기관에서는 자산을 조회하지 못했어요 💦' : '자산 연동이 완료되었어요'
                    }
                    icon={
                        disabled ? (
                            <div className="w-0 h-24 -mr-1">&nbsp;</div>
                        ) : (
                            <LottieNoSSR
                                src="https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie"
                                loop
                                autoplay
                                className={`w-[82px] h-24`}
                                layout={{fit: 'fill'}}
                            />
                        )
                    }
                    onBack={onBack}
                />

                {failedCompanies.length > 0 && <AssetsConnectStepFlashHandler failures={failedCompanies} />}

                {disabled ? (
                    <EmptyTable message="연동된 자산이 없어요" />
                ) : (
                    <>
                        {successBanks.length > 0 && (
                            <SuccessConnectBankSelector companies={successBanks} onSelect={setSelectedCodefBanks} />
                        )}

                        {successCards.length > 0 && (
                            <SuccessConnectCardSelector companies={successCards} onSelect={setSelectedCodefCards} />
                        )}
                    </>
                )}

                <div className="flex w-full justify-center">
                    <NextStepButton
                        onClick={() => onNext(selectedCodefBanks, selectedCodefCards, disabled)}
                        text={(() => {
                            if (!disabled) return '다음';
                            return disabledCTAButtonText || '완료';
                        })()}
                    />
                </div>
            </div>
        </PureLayout>
    );
});
