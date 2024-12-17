import React, {memo} from 'react';
import {TeamTag} from '^models/Team/components/TeamTag';
import {FormControlEmptyValue} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControlEmptyValue';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';

interface InvoiceAccountTeamProps {
    defaultValue?: TeamInvoiceAccountDto[];
}

export const InvoiceAccountTeamList = memo((props: InvoiceAccountTeamProps) => {
    const {defaultValue} = props;

    return (
        <label className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-start text-14 text-gray-400">팀</div>

            <div className="col-span-3">
                <div className={`w-full flex items-center h-[32px] gap-1`}>
                    {defaultValue?.length ? (
                        defaultValue.map((teamInvoiceAccount, i) => (
                            <TeamTag key={i} id={teamInvoiceAccount.teamId} name={teamInvoiceAccount.team?.name} />
                        ))
                    ) : (
                        <FormControlEmptyValue />
                    )}
                </div>
            </div>
        </label>
    );
});
InvoiceAccountTeamList.displayName = 'CreditCardTeam';
