import React, {Dispatch, memo, SetStateAction, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CreateCodefBankAssets, CreateCodefCardAssets} from '^models/CodefAccount/type/CreateCodefAssets';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {AssetsConnectStepFlashHandler} from '^_components/pages/assets/connect-steps/common/AssetsConnectStepFlashHandler';
import {SuccessConnectBankSelector} from './_component/SuccessConnectBankSelector';
import {SuccessConnectCardSelector} from './_component/SuccessConnectCardSelector';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {EmptyTable} from '^_components/table/EmptyTable';
import {QueryState, useQueryClient} from '@tanstack/react-query';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {isDefinedValue} from '^utils/array';
import {getCreateCodefAccountsResults, useCreateCodefAccountsResults} from '^models/CodefAccount/hook';

interface SelectAssetsStepProps {
    bankCompanies?: BankAccountsStaticData[];
    cardCompanies?: CardAccountsStaticData[];
    selectedCodefBanks: CodefBankAccountDto[];
    setSelectedCodefBanks: Dispatch<SetStateAction<CodefBankAccountDto[]>>;
    selectedCodefCards: CodefCardDto[];
    setSelectedCodefCards: Dispatch<SetStateAction<CodefCardDto[]>>;
    onBack: () => any;
    onNext: () => any;
}

export const SelectAssetsStep = memo((props: SelectAssetsStepProps) => {
    const {bankCompanies = [], cardCompanies = []} = props;
    const orgId = useOrgIdParam();
    const {selectedCodefBanks, setSelectedCodefBanks, selectedCodefCards, setSelectedCodefCards} = props;
    const {onBack, onNext} = props;
    const bankResults = useCreateCodefAccountsResults(orgId, bankCompanies);
    const cardResults = useCreateCodefAccountsResults(orgId, cardCompanies);
    console.log('bankResults2', bankResults);
    console.log('cardResults2', cardResults);

    const router = useRouter();

    const successBanks = bankResults?.successes || [];
    const successCards = cardResults?.successes || [];
    const disabled = successBanks.length === 0 && successCards.length === 0;

    return (
        <PureLayout>
            <div className="flex flex-col gap-20">
                <StatusHeader
                    title="자산 연동이 완료되었어요"
                    icon={
                        <LottieNoSSR
                            src="https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie"
                            loop
                            autoplay
                            className="w-[82px] h-24"
                            layout={{fit: 'fill'}}
                        />
                    }
                    onBack={onBack}
                />
                <AssetsConnectStepFlashHandler
                    failuresBankResults={bankResults.failures}
                    failuresCardResults={cardResults.failures}
                />

                {disabled ? (
                    <EmptyTable message="연동된 자산이 없어요" />
                ) : (
                    <>
                        {successBanks.length > 0 && (
                            <SuccessConnectBankSelector
                                companies={successBanks}
                                selectedCodefBanks={selectedCodefBanks}
                                setSelectedCodefBanks={setSelectedCodefBanks}
                            />
                        )}

                        {successCards.length > 0 && (
                            <SuccessConnectCardSelector
                                companies={successCards}
                                selectedCodefCards={selectedCodefCards}
                                setSelectedCodefCards={setSelectedCodefCards}
                            />
                        )}
                    </>
                )}

                <div className="flex w-full justify-center">
                    <NextStepButton
                        onClick={() => {
                            disabled ? router.replace(OrgMainPageRoute.path(orgId)) : onNext;
                        }}
                        text={disabled ? '완료' : '다음'}
                    />
                </div>
            </div>
        </PureLayout>
    );
});
