import React, {memo} from 'react';
import {useCurrentBankAccountEdit} from '../atom';
import {EditButton} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/EditButton';
import {CardCompanyNotSetAlert} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/InformationAlert';
import {BankAccountNumber} from './BankAccountNumber';
import {BankAccountMemo} from './BankAccountMemo';
import {BankAccountName} from './BankAccountName';
import {BankAccountIsPersonal} from './BankAccountIsPersonal';
import {BankAccountHoldingMember} from './BankAccountHoldingMember';

export const BankAccountInformationPanel = memo(() => {
    const {currentBankAccount, formData, setFormValue, onSubmit, patch, isEditMode, setIsEditMode, isLoading} =
        useCurrentBankAccountEdit();

    if (!currentBankAccount) return <></>;

    return (
        <div>
            {!currentBankAccount.bank && <CardCompanyNotSetAlert />}

            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-16 font-semibold">세부정보</h3>
                    <EditButton isEditMode={isEditMode} setIsEditMode={setIsEditMode} onSubmit={onSubmit} />
                </div>

                <div className="">
                    <BankAccountMemo
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentBankAccount.memo || undefined}
                        defaultValue={formData.memo || undefined}
                        onChange={(memo) => setFormValue({memo})}
                    />
                </div>

                <div className="flex flex-col gap-2.5">
                    <BankAccountName
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentBankAccount.name || undefined}
                        defaultValue={formData.name || undefined}
                        onChange={(name) => setFormValue({name})}
                    />

                    <BankAccountIsPersonal
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentBankAccount.isPersonal}
                        defaultValue={formData.isPersonal ?? undefined}
                        onChange={(isPersonal) => setFormValue({isPersonal})}
                    />

                    <BankAccountNumber
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentBankAccount.displayNumber || ''}
                        defaultValue={formData.number ?? undefined}
                        onChange={(number) => setFormValue({number})}
                    />
                </div>
            </div>

            <div className="p-8 border-t border-gray-200">
                <BankAccountHoldingMember
                    isEditMode={isEditMode}
                    isLoading={isLoading}
                    defaultValue={currentBankAccount.holdingMemberId || undefined}
                    onChange={(holdingMemberId) => patch({holdingMemberId})}
                />
            </div>
        </div>
    );
});
