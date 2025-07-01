import {useRecoilValue} from 'recoil';
import {memo} from 'react';
import {useRouter} from 'next/router';
import {useCurrentOrg2} from '^models/Organization/hook';
import {currentUserAtom, getMembership} from '^models/User/atom';
import {ActiveRoute} from '^types/pageRoute.type';
import {TopNavBarItem} from './TopNavBarItem';
import {TopNavBarDropdownItem} from './TopNavBarDropdownItem';
import {TopNavBarDropdownContent} from './TopNavBarDropdownContent';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {OrgTeamListPageRoute} from '^pages/orgs/[id]/teams';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgBillingHistoryStatusPageRoute} from '^pages/orgs/[id]/billingHistories/status';
import {MembershipDto, MembershipLevel} from '^models/Membership/types';
import {BarChart4, CreditCard, Mail, MessagesSquare, LayoutGrid, User, Users} from 'lucide-react';

interface TopNavBarProps {
    //
}

const getTopNavStructure = (props: {currentUserMembership?: MembershipDto}) => [
    {name: '홈', routeProps: OrgMainPageRoute},

    {
        name: '구독',
        items: [
            {name: '구독리스트', Icon: LayoutGrid, routeProps: OrgSubscriptionListPageRoute},
            {name: '결제현황', Icon: BarChart4, routeProps: OrgBillingHistoryStatusPageRoute},
        ],
    },
    {
        name: '팀',
        items: [
            {name: '팀 목록', Icon: User, routeProps: OrgTeamListPageRoute},
            {name: '구성원', Icon: Users, routeProps: OrgTeamMemberListPageRoute},
        ],
    },
    {
        name: '자산',
        items: [
            {name: '결제수단', Icon: CreditCard, routeProps: OrgCreditCardListPageRoute},
            {name: '청구서 메일', Icon: Mail, routeProps: OrgInvoiceAccountListPageRoute},
        ],
    },
    {
        name: '업무',
        items: [{name: '요청', Icon: MessagesSquare, routeProps: OrgReviewCampaignListPageRoute}],
    },
    {
        name: '설정',
        routeProps: OrgSettingsInformationPageRoute,
        isValid() {
            const level = props.currentUserMembership?.level;
            if (!level) return false;

            if (level === MembershipLevel.ADMIN) return true;
            if (level === MembershipLevel.OWNER) return true;

            return false;
        },
    },
];

export const TopNavBar = memo((props: TopNavBarProps) => {
    const {} = props;
    const router = useRouter();
    const {currentOrg} = useCurrentOrg2();
    const currentUser = useRecoilValue(currentUserAtom);
    const currentUserMembership = getMembership(currentUser, currentOrg?.id);

    const TopNavStructure = getTopNavStructure({currentUserMembership});

    const routeProps = <T extends (...args: any) => any>(
        route: {pathname: string; path: T},
        ...params: Parameters<T>
    ) => {
        return ActiveRoute.props(route, router, ...params);
    };

    const orgRouteProps = <T extends (orgId: number) => string>(route: {pathname: string; path: T}) => {
        // @ts-ignore
        return routeProps<T>(route, currentOrg?.id);
    };

    return (
        <div className="container-fluid h-[52px] flex items-stretch justify-center py-0 border-b bg-white-blurred">
            {TopNavStructure.map((menuItem, i) => {
                const {name, routeProps, items, isValid} = menuItem;

                if (isValid && !isValid()) return <></>;

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
