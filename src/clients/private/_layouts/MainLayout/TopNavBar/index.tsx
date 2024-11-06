import {memo} from 'react';
import {useRouter} from 'next/router';
import {FaReceipt} from 'react-icons/fa6';
import {
    BsCreditCardFill,
    BsPeopleFill,
    BsPersonLinesFill,
    MdSpaceDashboard,
    TbChartInfographic,
} from '^components/react-icons';
import {useCurrentOrg2} from '^models/Organization/hook';
import {ActiveRoute} from '^types/pageRoute.type';
import {TopNavBarItem} from './TopNavBarItem';
import {TopNavBarDropdownItem} from './TopNavBarDropdownItem';
import {TopNavBarDropdownContent} from './TopNavBarDropdownContent';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {OrgTeamListPageRoute} from '^pages/orgs/[id]/teams';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgBillingHistoryStatusPageRoute} from '^pages/orgs/[id]/billingHistories/status';

interface TopNavBarProps {
    //
}

const getTopNavStructure = () => [
    {name: '홈', routeProps: OrgMainPageRoute},
    {
        name: '구독',
        items: [
            {name: '구독리스트', Icon: MdSpaceDashboard, routeProps: OrgSubscriptionListPageRoute},
            {name: '결제현황', Icon: TbChartInfographic, routeProps: OrgBillingHistoryStatusPageRoute},
        ],
    },
    {
        name: '팀',
        items: [
            {name: '팀 목록', Icon: BsPersonLinesFill, routeProps: OrgTeamListPageRoute},
            {name: '구성원', Icon: BsPeopleFill, routeProps: OrgTeamMemberListPageRoute},
        ],
    },
    {
        name: '자산',
        items: [
            {name: '결제수단', Icon: BsCreditCardFill, routeProps: OrgCreditCardListPageRoute},
            {name: '청구서수신메일', Icon: FaReceipt, routeProps: OrgInvoiceAccountListPageRoute},
        ],
    },
    {name: '설정', routeProps: OrgSettingsInformationPageRoute},
];

export const TopNavBar = memo((props: TopNavBarProps) => {
    const {} = props;
    const router = useRouter();
    const {currentOrg} = useCurrentOrg2();
    const TopNavStructure = getTopNavStructure();

    if (!currentOrg) return <></>;

    const routeProps = <T extends (...args: any) => any>(
        route: {pathname: string; path: T},
        ...params: Parameters<T>
    ) => {
        return ActiveRoute.props(route, router, ...params);
    };

    const orgRouteProps = <T extends (orgId: number) => string>(route: {pathname: string; path: T}) => {
        // @ts-ignore
        return routeProps<T>(route, currentOrg.id);
    };

    return (
        <div className="container-fluid h-[52px] flex items-stretch justify-center py-0 border-b bg-white-blurred">
            {TopNavStructure.map((menuItem, i) => {
                const {name, routeProps, items} = menuItem;

                if (!items) {
                    return (
                        <TopNavBarItem
                            key={i}
                            name={name}
                            {...(routeProps ? orgRouteProps(routeProps) : {active: false})}
                        />
                    );
                }

                const isActive = items.map((item) => orgRouteProps(item.routeProps).active).some((active) => active);

                return (
                    <TopNavBarItem key={i} name={name} active={isActive}>
                        <TopNavBarDropdownContent>
                            {items.map((item, j) => (
                                <TopNavBarDropdownItem
                                    key={j}
                                    name={item.name}
                                    Icon={item.Icon}
                                    {...orgRouteProps(item.routeProps)}
                                />
                            ))}
                        </TopNavBarDropdownContent>
                    </TopNavBarItem>
                );
            })}
        </div>
    );
});
TopNavBar.displayName = 'TopNavBar';
