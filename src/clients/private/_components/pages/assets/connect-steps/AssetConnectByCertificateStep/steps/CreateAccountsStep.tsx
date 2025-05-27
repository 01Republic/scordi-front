import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {encryptValue} from '^utils/crypto';
import {useOrgIdParam} from '^atoms/common';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useCreateCodefAccounts} from '^models/CodefAccount/hook';
import {LoadingScreen2} from '../../common/LoadingScreen';

interface CreateAccountsStepProps {
    selectedBankCompanies: BankAccountsStaticData[];
    selectedCardCompanies: CardAccountsStaticData[];
    onNext: () => any;
}

export const CreateAccountsStep = memo((props: CreateAccountsStepProps) => {
    const {selectedBankCompanies, selectedCardCompanies, onNext} = props;
    const orgId = useOrgIdParam();
    const form = useFormContext<CreateAccountRequestDto>();
    const formData = form.getValues();

    // 은행사 연동 요청
    const bankResults = useCreateCodefAccounts(orgId, selectedBankCompanies, () => {
        const password = encryptValue(formData.password, formData.id);
        return {...formData, password};
    });

    // 카드사 연동 요청
    const cardResults = useCreateCodefAccounts(orgId, selectedCardCompanies, () => {
        const password = encryptValue(formData.password, formData.id);
        return {...formData, password};
    });

    const results = [...bankResults, ...cardResults];
    const totalCount = results.length;
    const finishedCount = results.filter((result) => result.isFetched).length;

    return (
        <LoadingScreen2
            message={'은행사 또는 카드사를 기준으로 계좌와 카드를 찾고 있어요'}
            percentage={totalCount > 0 ? Math.ceil((finishedCount / totalCount) * 100) : 0}
            onFinish={() => onNext()}
            minTimeout={3 * 1000}
        />
    );
});
