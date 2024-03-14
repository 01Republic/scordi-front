import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {FcFinePrint} from 'react-icons/fc';
import {SubscriptionDto} from '^models/Subscription/types';
import {useAppShowModal} from '^v3/share/modals/AppShowPageModal';
import {
    BillingCycleTypeColumn,
    ProductProfile,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {yyyy_mm_dd} from '^utils/dateTime';
import {MoneyDto} from '^models/Money';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useSubscriptionsForCard} from '^models/CodefCard/hook';
import {selectedCodefCardAtom} from '^v3/V3OrgConnectedCardListPage/ConnectedCodefCardListPage/atom';

interface Props {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

/** 계정으로 조회된 구독 Section */
export const SubscriptionListSection = memo((props: Props) => {
    const {codefAccount} = props;
    const selectedCodefCard = useRecoilValue(selectedCodefCardAtom);
    const {result, search} = useSubscriptionsForCard(codefAccount.id);

    useEffect(() => {
        if (!codefAccount || !selectedCodefCard) return;
        search({
            codefCardId: selectedCodefCard.id,
            order: {lastPaidAt: 'ASC'},
        });
    }, [codefAccount, selectedCodefCard]);

    const {items, pagination} = result;

    return (
        <div className="col-span-3 mb-8">
            <h3 className="flex items-center gap-2 py-6 sticky top-[64px] z-[1] bg-layout-background -mx-4 px-4">
                <FcFinePrint size={30} />{' '}
                <span>카드로 조회된 구독 {pagination.totalItemCount ? `(${pagination.totalItemCount})` : ''}</span>
            </h3>

            <div className="card card-body px-3 py-2 card-bordered bg-white gap-0">
                {pagination.totalItemCount ? (
                    <>
                        <div className="border-b-2 px-3 py-2 grid grid-cols-6 font-semibold">
                            <div className="col-span-2"></div>
                            <div className="text-13 flex items-center justify-start">결제주기</div>
                            <div className="text-13 flex items-center justify-end">최신 결제금액</div>
                            <div className="text-13 flex items-center justify-end">마지막 결제일</div>
                            <div></div>
                        </div>
                        {items.map((subscription, i) => (
                            <SubscriptionItem data={subscription} key={i} />
                        ))}
                    </>
                ) : (
                    <div className="px-3 py-2 font-semibold flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-14 mb-2">이 카드로는 조회된 구독이 없어요</p>
                            <p className="text-14 mb-4">(백그라운드 연동이 진행되고 있어요)</p>
                            <div className="text-12">
                                조회기간: <span>{`${selectedCodefCard?.syncedStartDate}`}</span> ~{' '}
                                <span>{`${selectedCodefCard?.syncedEndDate}`}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

/** 계정으로 조회된 구독 */
const SubscriptionItem = memo((props: {data: SubscriptionDto}) => {
    const appShowModal = useAppShowModal();
    const {data: subscription} = props;

    return (
        <div className="border-b px-3 py-4 last:border-b-0 grid grid-cols-6">
            <div className="col-span-2">
                <ProductProfile subscription={subscription} />
            </div>
            <div className="flex items-center justify-start">
                <BillingCycleTypeColumn subscription={subscription} onChange={console.log} />
            </div>
            <div className="flex items-center justify-end">
                <Money money={subscription.currentBillingAmount || undefined} />
            </div>
            <div className="text-14 flex items-center justify-end">
                {subscription.lastPaidAt && yyyy_mm_dd(subscription.lastPaidAt)}
            </div>

            <div className="flex items-center justify-end">
                <button className="btn btn-scordi btn-sm" onClick={() => appShowModal.show(subscription.id)}>
                    상세
                </button>
            </div>
        </div>
    );
});

const Money = ({money}: {money?: MoneyDto}) => {
    if (!money) return <></>;

    return (
        <TagUI className="!text-14">
            <small>{money.symbol}</small>
            {money.amount.toLocaleString()}
        </TagUI>
    );
};
