import React, {memo} from 'react';
import {IoMdMore} from 'react-icons/io';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {FetchBillingHistoriesItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefCardListContent/ActionColumn/FetchBillingHistoriesItem';
import {RemoveCreditCardItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefCardListContent/ActionColumn/RemoveCreditCardItem';
import {CreateCreditCardItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefCardListContent/ActionColumn/CreateCreditCardItem';
import {PatchAllForCodefCardItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefCardListContent/ActionColumn/PatchAllForCodefCardItem';
import {RemoveAllOfCodefCardItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefCardListContent/ActionColumn/RemoveAllOfCodefCardItem';

interface CodefCardRowActionColumnProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
    moveTab: (tabIndex: number) => any;
}

export const CodefCardRowActionColumn = memo((props: CodefCardRowActionColumnProps) => {
    const org = useRecoilValue(adminOrgDetail);
    const {codefCard, reload, moveTab} = props;

    const {codefBillingHistories = [], isSleep = false} = codefCard;
    const isConnected = !!codefCard.creditCardId;
    const sleepStyleClass: string = 'opacity-20';

    return (
        <MoreDropdown
            placement="bottom-end"
            Trigger={() => (
                <button className={`btn btn-xs btn-square !border-gray-400 !bg-white !text-gray-600`}>
                    <IoMdMore fontSize={16} />
                </button>
            )}
        >
            {() => (
                <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                    <FetchBillingHistoriesItem codefCard={codefCard} reload={reload} />
                    {isConnected ? (
                        <RemoveCreditCardItem codefCard={codefCard} reload={reload} />
                    ) : (
                        <CreateCreditCardItem codefCard={codefCard} reload={reload} />
                    )}
                    <PatchAllForCodefCardItem codefCard={codefCard} reload={reload} />
                    <RemoveAllOfCodefCardItem codefCard={codefCard} reload={reload} />
                </div>
            )}
        </MoreDropdown>
    );
});
CodefCardRowActionColumn.displayName = 'CodefCardRowActionColumn';
