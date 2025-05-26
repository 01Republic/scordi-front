import {Dispatch, memo, SetStateAction, useContext} from 'react';
import {useFormContext} from 'react-hook-form';
import {encryptValue} from '^utils/crypto';
import {allSettledGroupWithContext} from '^utils/array';
import {useOrgIdParam} from '^atoms/common';
import {codefAccountApi} from '^models/CodefAccount/api';
import {CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateCodefBankAssets, CreateCodefCardAssets} from '^models/CodefAccount/type/CreateCodefAssets';
import {LoadingScreen} from '^_components/pages/assets/connect-steps/common/LoadingScreen';
import {AssetConnectOptionContext, EntryPath} from '^_components/pages/assets/connect-steps';

interface AccountConnectLoadingStepProps {
    selectedBankCompanies: BankAccountsStaticData[];
    selectedCardCompanies: CardAccountsStaticData[];
    setBankResults: Dispatch<SetStateAction<CreateCodefBankAssets>>;
    setCardResults: Dispatch<SetStateAction<CreateCodefCardAssets>>;
    setStep: () => void;
}

export const AccountConnectLoadingStep = memo((props: AccountConnectLoadingStepProps) => {
    const {selectedBankCompanies, selectedCardCompanies, setCardResults, setBankResults, setStep} = props;

    const form = useFormContext<CreateAccountRequestDto>();

    const orgId = useOrgIdParam();

    const createAccount = async () => {
        const formData = form.getValues();

        // 은행사 연동 요청
        const {successes: banks, failures: bankFailures} = await allSettledGroupWithContext(
            selectedBankCompanies,
            (bank) =>
                codefAccountApi.create(orgId, {
                    ...formData,
                    organization: bank.param,
                    businessType: CodefRequestBusinessType.Bank,
                    password: encryptValue(formData.password, formData.id),
                }),
        );

        setBankResults({successes: banks, failures: bankFailures});

        // 카드사 연동 요청
        const {successes: cards, failures: cardFailures} = await allSettledGroupWithContext(
            selectedCardCompanies,
            (card) =>
                codefAccountApi.create(orgId, {
                    ...formData,
                    organization: card.param,
                    businessType: CodefRequestBusinessType.Card,
                    password: encryptValue(formData.password, formData.id),
                }),
        );
        setCardResults({successes: cards, failures: cardFailures});
    };

    return (
        <LoadingScreen
            message="은행사 또는 카드사를 기준으로 계좌와 카드를 찾고 있어요"
            onCreat={createAccount}
            onClose={setStep}
        />
    );
});
