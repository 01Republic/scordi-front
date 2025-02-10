import {memo, useEffect} from 'react';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {useRouter} from 'next/router';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {OrganizationDto} from '^models/Organization/type';
import {organizationApi} from '^models/Organization/api';
import {BiLinkExternal} from '^components/react-icons';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {AdminOrgsPageRoute} from '^pages/admin/orgs';
import {
    AccountListTabContent,
    InformationTabContent,
    AdminOrgConnectionTabContent,
    MemberListTabContent,
    SubscriptionListTabContent,
    TodoListTabContent,
    UserListTabContent,
    PaymentListTabContent,
} from './tabContents';
import {defineTabs, useTabs} from '^components/util/tabs';

export const adminOrgDetail = atom<OrganizationDto | null>({
    key: 'adminOrgDetail',
    default: null,
});

const adminOrgDetailPageTab = defineTabs('adminOrgDetailPageTab', [
    {label: '기본정보', TabPane: InformationTabContent},
    {label: '연동된 앱 (구독리스트)', TabPane: SubscriptionListTabContent},
    {label: '연동관리', TabPane: AdminOrgConnectionTabContent},
    {label: '계정관리', TabPane: AccountListTabContent},
    {label: '멤버', TabPane: MemberListTabContent},
    {label: '회원', TabPane: UserListTabContent},
    {label: '체크리스트', TabPane: TodoListTabContent},
    {label: '스코디 결제', TabPane: PaymentListTabContent},
]);

export const AdminOrgDetailPage = memo(() => {
    const router = useRouter();
    const orgId = Number(router.query.id);
    const [org, setOrg] = useRecoilState(adminOrgDetail);
    const {TabNav, CurrentTabPane} = useTabs(adminOrgDetailPageTab);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        organizationApi.show(orgId).then((res) => setOrg(res.data));
    }, [orgId]);

    if (!org) return <>Organization(#{router.query.id}) Not Found.</>;

    return (
        <AdminDetailPageLayout
            title={`${org.name} (#${org.id})`}
            breadcrumbs={[{text: '조직관리'}, {text: '조직목록', href: AdminOrgsPageRoute.path()}, {text: '조직상세'}]}
            buttons={[ShowOnServiceButton]}
            // editPageRoute={''}
            // onDelete={() => console.log('delete!')}
            tabNav={<TabNav />}
        >
            <AdminPageContainer>
                <CurrentTabPane />
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});

const ShowOnServiceButton = memo(() => {
    const org = useRecoilValue(adminOrgDetail);

    if (!org) return <></>;

    const onClick = () => window.open(OrgMainPageRoute.path(org.id), '_blank');

    return (
        <button className="btn btn-gray btn-square" onClick={onClick}>
            <BiLinkExternal />
        </button>
    );
});
