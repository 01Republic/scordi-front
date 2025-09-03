import React, {memo} from 'react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FetchBillingHistoriesItem} from './FetchBillingHistoriesItem';
import {RemoveCreditCardItem} from './RemoveCreditCardItem';
import {CreateCreditCardItem} from './CreateCreditCardItem';
import {PatchAllForCodefCardItem} from './PatchAllForCodefCardItem';
import {RemoveAllOfCodefCardItem} from './RemoveAllOfCodefCardItem';
import {PatchSubscriptionsByCodefCardItem} from './PatchSubscriptionsByCodefCardItem';
import {MoreHorizontal} from 'lucide-react';

interface CodefCardRowActionColumnProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
    moveTab: (tabIndex: number) => any;
}

export const CodefCardRowActionColumn = memo((props: CodefCardRowActionColumnProps) => {
    const {codefCard, reload, moveTab} = props;

    const {codefBillingHistoryCount, isSleep = false, account} = codefCard;
    const isConnected = !!codefCard.creditCardId;
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
                    {!isSleep && account?.connectedIdentityId && (
                        <FetchBillingHistoriesItem codefCard={codefCard} reload={reload} />
                    )}
                    {isConnected ? (
                        <RemoveCreditCardItem codefCard={codefCard} reload={reload} />
                    ) : !isSleep ? (
                        <CreateCreditCardItem codefCard={codefCard} reload={reload} />
                    ) : (
                        <></>
                    )}
                    {!isSleep && <PatchSubscriptionsByCodefCardItem codefCard={codefCard} reload={reload} />}
                    {!isSleep && account?.connectedIdentityId && (
                        <PatchAllForCodefCardItem codefCard={codefCard} reload={reload} />
                    )}
                    <RemoveAllOfCodefCardItem codefCard={codefCard} reload={reload} />
                </div>
            )}
        </MoreDropdown>
    );
});
CodefCardRowActionColumn.displayName = 'CodefCardRowActionColumn';
