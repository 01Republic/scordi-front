import {memo, useEffect} from 'react';
import {AdminDetailPageLayout} from '^admin/layouts';
import {useRouter} from 'next/router';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {OrganizationDto} from '^models/Organization/type';
import {organizationApi} from '^models/Organization/api';
import {ContentTabNav} from '^layouts/ContentLayout';
import {BiLinkExternal} from '^components/react-icons';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {AdminOrgsPageRoute} from '^pages/admin/orgs';
import {
    AccountListTabContent,
    InformationTabContent,
    AdminOrgConnectionTabContent,
    MemberListTabContent,
    SubscriptionListTabContent,
    TodoListTabContent,
    UserListTabContent,
} from './tabContents';

export const adminOrgDetail = atom<OrganizationDto | null>({
    key: 'adminOrgDetail',
    default: null,
});

export const navTabIndex = atom({
    key: 'adminOrgDetailPage/NavTabIndex',
    default: 0,
});

export const AdminOrgDetailPage = memo(() => {
    const router = useRouter();
    const orgId = Number(router.query.id);
    const [org, setOrg] = useRecoilState(adminOrgDetail);
    const tabIndex = useRecoilValue(navTabIndex);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        organizationApi.show(orgId).then((res) => setOrg(res.data));
    }, [orgId]);

    if (!org) return <>Organization(#{router.query.id}) Not Found.</>;

    const tabs = [
        {label: '기본정보', Component: InformationTabContent},
        {label: '연동된 앱 (구독리스트)', Component: SubscriptionListTabContent},
        {label: '연동관리', Component: AdminOrgConnectionTabContent},
        {label: '계정관리', Component: AccountListTabContent},
        {label: '멤버', Component: MemberListTabContent},
        {label: '회원', Component: UserListTabContent},
        {label: '체크리스트', Component: TodoListTabContent},
    ];

    const TabContentComponent = tabs[tabIndex]?.Component || InformationTabContent;

    return (
        <AdminDetailPageLayout
            title={`${org.name} (#${org.id})`}
            breadcrumbs={[{text: '조직관리'}, {text: '조직목록', href: AdminOrgsPageRoute.path()}, {text: '조직상세'}]}
            buttons={[ShowOnServiceButton]}
            // editPageRoute={''}
            // onDelete={() => console.log('delete!')}
            tabNav={<ContentTabNav resetIndex={true} tabs={tabs.map((tab) => tab.label)} recoilState={navTabIndex} />}
        >
            <div className="pt-10 px-2 sm:px-4">
                <TabContentComponent />
            </div>
        </AdminDetailPageLayout>
    );
});

const ShowOnServiceButton = memo(() => {
    const org = useRecoilValue(adminOrgDetail);

    if (!org) return <></>;

    const onClick = () => window.open(V3OrgHomePageRoute.path(org.id), '_blank');

    return (
        <button className="btn btn-gray btn-square" onClick={onClick}>
            <BiLinkExternal />
        </button>
    );
});
