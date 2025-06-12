import React, {memo} from 'react';
import {MoreHorizontal} from 'lucide-react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {FetchBillingHistoriesItem} from './FetchBillingHistoriesItem';
import {RemoveBankAccountItem} from './RemoveBankAccountItem';
import {CreateBankAccountItem} from './CreateBankAccountItem';
import {PatchAllForCodefBankAccount} from './PatchAllForCodefBankAccount';
import {RemoveAllOfCodefBankAccount} from './RemoveAllOfCodefBankAccount';
import {PatchSubscriptionsByCodefBankAccount} from './PatchSubscriptionsByCodefBankAccount';

interface Props {
    codefBankAccount: CodefBankAccountDto;
    reload: () => Promise<any>;
    moveTab: (tabIndex: number) => any;
}

export const CodefBankAccountActionColumn = memo((props: Props) => {
    const {codefBankAccount, reload, moveTab} = props;

    const {id, bankAccountId, codefBillingHistories = []} = codefBankAccount;
    const isConnected = !!codefBankAccount.bankAccountId;
    const isSleep = false;
    const sleepStyleClass: string = 'opacity-20';

    return (
        <MoreDropdown
            placement="bottom-end"
            Trigger={() => (
                <button className={`btn btn-xs btn-square !border-gray-400 !bg-white !text-gray-600`}>
                    <MoreHorizontal fontSize={16} />
                </button>
            )}
        >
            {() => (
                <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                    {!isSleep && <FetchBillingHistoriesItem codefAsset={codefBankAccount} reload={reload} />}
                    {isConnected ? (
                        <RemoveBankAccountItem codefAsset={codefBankAccount} reload={reload} />
                    ) : !isSleep ? (
                        <CreateBankAccountItem codefAsset={codefBankAccount} reload={reload} />
                    ) : (
                        <></>
                    )}
                    {!isSleep && isConnected && !!codefBillingHistories.length && (
                        <PatchSubscriptionsByCodefBankAccount codefAsset={codefBankAccount} reload={reload} />
                    )}
                    {!isSleep && <PatchAllForCodefBankAccount codefAsset={codefBankAccount} reload={reload} />}
                    <RemoveAllOfCodefBankAccount codefAsset={codefBankAccount} reload={reload} />
                </div>
            )}
        </MoreDropdown>
    );
});
