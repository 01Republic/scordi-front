import {atom, useRecoilState} from 'recoil';
import {BankAccountDto} from '^models/BankAccount/type';
import {bankAccountApi} from '^models/BankAccount/api';

export const bankAccountSubjectAtom = atom<BankAccountDto | null>({
    key: 'OrgBankAccountShowPage/bankAccountSubjectAtom',
    default: null,
});

export const useCurrentBankAccount = () => {
    const [currentBankAccount, setCurrentBankAccount] = useRecoilState(bankAccountSubjectAtom);

    const findOne = async (orgId: number, id: number) => {
        return bankAccountApi.show(orgId, id).then((res) => {
            setCurrentBankAccount(res.data);
            return res.data;
        });
    };

    const reload = async () => {
        if (!currentBankAccount) return;
        return findOne(currentBankAccount.organizationId, currentBankAccount.id);
    };

    return {currentBankAccount, setCurrentBankAccount, findOne, reload};
};
