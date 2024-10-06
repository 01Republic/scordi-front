import {memo, useEffect} from 'react';
import {useCurrentInvoiceAccount} from '../atom';
import {useTeamTagListInInvoiceAccountDetail} from '^models/TeamInvoiceAccount/hook';
import {TeamTag} from '^models/Team/components/TeamTag';

export const InvoiceAccountTeamList = memo(function InvoiceAccountTeamList() {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
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
        <div className="flex items-center gap-1">
            {items.length ? (
                items.map((teamInvoiceAccount, i) => (
                    <TeamTag key={i} id={teamInvoiceAccount.teamId} name={teamInvoiceAccount.team?.name} />
                ))
            ) : (
                <span className="text-gray-400 text-12">비어있음</span>
            )}
        </div>
    );
});
