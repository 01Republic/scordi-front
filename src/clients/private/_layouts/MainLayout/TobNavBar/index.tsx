import {memo} from 'react';
import {useRouter} from 'next/router';
import {FaReceipt} from 'react-icons/fa6';
import {BsCreditCardFill, BsPeopleFill, BsPersonLinesFill} from 'react-icons/bs';
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

interface TobNavBarProps {
    //
}

export const TobNavBar = memo((props: TobNavBarProps) => {
    const {} = props;
    const router = useRouter();
    const {currentOrg} = useCurrentOrg2();

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
            <TopNavBarItem name="홈" {...orgRouteProps(OrgMainPageRoute)} />
            <TopNavBarItem name="구독" {...orgRouteProps(OrgSubscriptionListPageRoute)} />
            <TopNavBarItem
                name="팀"
                active={orgRouteProps(OrgTeamListPageRoute).active || orgRouteProps(OrgTeamMemberListPageRoute).active}
            >
                <TopNavBarDropdownContent>
                    <TopNavBarDropdownItem
                        name="팀 목록"
                        Icon={BsPersonLinesFill}
                        {...orgRouteProps(OrgTeamListPageRoute)}
                    />
                    <TopNavBarDropdownItem
                        name="구성원"
                        Icon={BsPeopleFill}
                        {...orgRouteProps(OrgTeamMemberListPageRoute)}
                    />
                </TopNavBarDropdownContent>
            </TopNavBarItem>
            <TopNavBarItem
                name="자산"
                active={
                    orgRouteProps(OrgCreditCardListPageRoute).active ||
                    orgRouteProps(OrgInvoiceAccountListPageRoute).active
                }
            >
                <TopNavBarDropdownContent>
                    <TopNavBarDropdownItem
                        name="결제수단"
                        Icon={BsCreditCardFill}
                        {...orgRouteProps(OrgCreditCardListPageRoute)}
                    />
                    <TopNavBarDropdownItem
                        name="청구서수신메일"
                        Icon={FaReceipt}
                        {...orgRouteProps(OrgInvoiceAccountListPageRoute)}
                    />
                </TopNavBarDropdownContent>
            </TopNavBarItem>
            <TopNavBarItem name="설정" {...orgRouteProps(OrgSettingsInformationPageRoute)} />
        </div>
    );
});
TobNavBar.displayName = 'TobNavBar';
