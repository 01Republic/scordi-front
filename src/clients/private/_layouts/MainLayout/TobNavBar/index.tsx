import {memo} from 'react';
import {BsCreditCardFill, BsPeopleFill, BsPersonLinesFill} from 'react-icons/bs';
import {FaReceipt} from 'react-icons/fa6';
import {useCurrentOrg2} from '^models/Organization/hook';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import {TopNavBarItem} from './TopNavBarItem';
import {TopNavBarDropdownItem} from './TopNavBarDropdownItem';
import {TopNavBarDropdownContent} from './TopNavBarDropdownContent';
import {useRouter} from 'next/router';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {ActiveRoute} from '^types/pageRoute.type';

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
            <TopNavBarItem name="구독" {...orgRouteProps(OrgAppIndexPageRoute)} />
            <TopNavBarItem name="팀" active={orgRouteProps(OrgTeamMemberListPageRoute).active}>
                <TopNavBarDropdownContent>
                    <TopNavBarDropdownItem name="팀 목록" Icon={BsPersonLinesFill} href="" />
                    <TopNavBarDropdownItem
                        name="구성원"
                        Icon={BsPeopleFill}
                        {...orgRouteProps(OrgTeamMemberListPageRoute)}
                    />
                </TopNavBarDropdownContent>
            </TopNavBarItem>
            <TopNavBarItem name="자산" active={false}>
                <TopNavBarDropdownContent>
                    <TopNavBarDropdownItem name="결제수단" href="" Icon={BsCreditCardFill} />
                    <TopNavBarDropdownItem name="청구서수신메일" href="" Icon={FaReceipt} />
                </TopNavBarDropdownContent>
            </TopNavBarItem>
            <TopNavBarItem name="설정" active={false} />
        </div>
    );
});
TobNavBar.displayName = 'TobNavBar';
