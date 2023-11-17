import React, {memo} from 'react';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {useCreditCardsOfOrganization} from '^models/CreditCard/hook';
import {V3OrgCardListPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {CardItem, CardItem2} from '^v3/V3OrgHomePage/desktop/sections/CardListSection/CardItem';
import {MoreButton} from '^v3/V3OrgHomePage/desktop/MoreButton';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';

export const CardListSection = memo(function CardListSection() {
    const {CreditCard} = useCreditCardsOfOrganization(true);
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <Section
            title={
                <>
                    <span className="text-black">
                        <b>{CreditCard ? CreditCard.length : 0}</b>개
                    </span>
                    의 카드를 쓰고 있어요
                </>
            }
            titleButtons={[<MoreButton href={safePath((org) => V3OrgCardListPageRoute.path(org.id))} />]}
        >
            {/*<Panel padding="compact">*/}
            {/*    {CreditCard && CreditCard.map((card, i) => <CardItem2 card={card} idx={i} key={i} />)}*/}
            {/*</Panel>*/}

            <Panel padding="no">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="text-gray-500">
                                <th className="bg-transparent">카드</th>
                                <th className="bg-transparent">구독</th>
                                <th className="bg-transparent">이번달</th>
                                <th className="bg-transparent">소유자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CreditCard && CreditCard.map((card, i) => <CardItem card={card} idx={i} key={i} />)}
                        </tbody>
                    </table>
                </div>
            </Panel>
        </Section>
    );
});
