import React, {memo, useEffect, useState} from 'react';
import {Loader, X} from 'lucide-react';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefBankAccountTagUI} from '^admin/factories/codef-bank-account-parsers/form/share/CodefBankAccountTagUI';

interface SelectedCodefBankAccountProps {
    codefBankAccount?: CodefBankAccountDto;
    onClick: () => any;
}

export const SelectedCodefBankAccount = memo((props: SelectedCodefBankAccountProps) => {
    const {codefBankAccount, onClick} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [ensuredCodefBankAccount, setEnsuredCodefBankAccount] = useState<CodefBankAccountDto>();

    useEffect(() => {
        if (!codefBankAccount) {
            setEnsuredCodefBankAccount(undefined);
            return;
        }

        setIsLoading(true);
        codefBankAccountApi
            .show(0, codefBankAccount.id)
            .then((res) => {
                setEnsuredCodefBankAccount(res.data);
            })
            .finally(() => setIsLoading(false));
    }, [codefBankAccount]);

    if (!codefBankAccount) return <></>;

    return (
        <div className="flex items-center justify-between mb-3 text-12">
            <div className="flex items-center">
                <div className="mr-2">선택된 계좌:</div>
                <div className="flex items-center group cursor-pointer" onClick={onClick}>
                    <div>
                        <CodefBankAccountTagUI codefBankAccount={codefBankAccount} />
                    </div>
                    <X size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                </div>
            </div>

            <div className="flex items-center">
                {isLoading && (
                    <div>
                        <div className="animate-spin">
                            <Loader />
                        </div>
                    </div>
                )}
                {ensuredCodefBankAccount && (
                    <div className="flex items-center text-gray-400">
                        <div>
                            {ensuredCodefBankAccount.account?.connectedIdentity?.organization?.name} /{' '}
                            {ensuredCodefBankAccount.account?.company}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
SelectedCodefBankAccount.displayName = 'SelectedCodefBankAccount';
