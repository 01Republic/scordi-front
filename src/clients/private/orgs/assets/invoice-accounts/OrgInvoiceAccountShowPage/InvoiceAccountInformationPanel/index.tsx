import React, {memo} from 'react';
import {useCurrentInvoiceAccountEdit} from '../atom';
import {EditButton} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/EditButton';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';

export const InvoiceAccountInformationPanel = memo(function InvoiceAccountInformationPanel() {
    const {currentInvoiceAccount, isEditMode, setIsEditMode, onSubmit} = useCurrentInvoiceAccountEdit();

    if (!currentInvoiceAccount) return <></>;

    return (
        <div>
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-16 font-semibold">기본 정보</h3>
                    <EditButton isEditMode={isEditMode} setIsEditMode={setIsEditMode} onSubmit={onSubmit} />
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
