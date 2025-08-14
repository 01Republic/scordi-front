import React, {memo, useEffect} from 'react';
import {useCurrentInvoiceAccountEdit} from '../atom';
import {EditButton} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/EditButton';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {InvoiceAccountMemo} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/InvoiceAccountInformationPanel/InvoiceAccountMemo';
import {InvoiceAccountEmail} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/InvoiceAccountInformationPanel/InvoiceAccountEmail';
import {InvoiceAccountHoldingMemberId} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/InvoiceAccountInformationPanel/InvoiceAccountHoldingMemberId';
import {InvoiceAccountTeamList} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/InvoiceAccountInformationPanel/InvoiceAccountTeamList';
import {useTeamTagListInInvoiceAccountDetail} from '^models/TeamInvoiceAccount/hook/hook';

export const InvoiceAccountInformationPanel = memo(function InvoiceAccountInformationPanel() {
    const {currentInvoiceAccount, formData, setFormValue, onSubmit, patch, isEditMode, setIsEditMode, isLoading} =
        useCurrentInvoiceAccountEdit();

    const {search, result} = useTeamTagListInInvoiceAccountDetail();

    useEffect(() => {
        if (!currentInvoiceAccount) return;

        search({
            relations: ['team'],
            where: {invoiceAccountId: currentInvoiceAccount.id},
            itemsPerPage: 0,
        });
    }, [currentInvoiceAccount?.id]);

    const {items} = result;

    if (!currentInvoiceAccount) return <></>;

    return (
        <div>
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-16 font-semibold">세부정보</h3>
                    <EditButton isEditMode={isEditMode} setIsEditMode={setIsEditMode} onSubmit={onSubmit} />
                </div>

                <div className="">
                    <InvoiceAccountMemo
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentInvoiceAccount.memo || undefined}
                        defaultValue={formData.memo || undefined}
                        onChange={(memo) => setFormValue({memo})}
                    />
                </div>

                <div className="flex flex-col gap-2.5">
                    <InvoiceAccountEmail
                        invoiceAccount={currentInvoiceAccount}
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentInvoiceAccount.email || undefined}
                        defaultValue={formData.email || undefined}
                        onChange={(email) => setFormValue({email})}
                    />

                    <InvoiceAccountTeamList defaultValue={items} />

                    <InvoiceAccountHoldingMemberId
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        defaultValue={currentInvoiceAccount.holdingMember || undefined}
                        onChange={(holdingMemberId) => setFormValue({holdingMemberId})}
                    />
                </div>
            </div>

            <div className="p-8 border-t border-gray-200">
                <div className="flex flex-col gap-2.5">
                    <FormControl label="등록일시">
                        <div className="flex items-center justify-between h-[32px] text-gray-500">
                            {yyyy_mm_dd_hh_mm(currentInvoiceAccount.createdAt)}
                        </div>
                    </FormControl>
                    <FormControl label="수정일시">
                        <div className="flex items-center justify-between h-[32px] text-gray-500">
                            {yyyy_mm_dd_hh_mm(currentInvoiceAccount.updatedAt)}
                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    );
});
