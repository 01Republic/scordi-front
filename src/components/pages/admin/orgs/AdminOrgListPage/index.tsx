import {memo, useEffect, useState} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {organizationAdminApi} from '^models/Organization/api';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {OrgItem} from './OrgItem';
import {OrgTr} from './OrgTr';
import {OrgItemForConnectStatus} from './OrgItemForConnectStatus';
import {OrgTablePanelForConnectStatus} from '^admin/orgs/AdminOrgListPage/OrgTablePanelForConnectStatus';
import {ContentTabNav} from '^layouts/ContentLayout';
import {atom, useRecoilValue} from 'recoil';

enum ViewAbout {
    members,
    connects,
}

const viewAboutAtom = atom({key: 'ViewAboutAtom', default: ViewAbout.members});

export const AdminOrgListPage = memo(() => {
    const viewAbout = useRecoilValue(viewAboutAtom);

    return (
        <AdminListPageLayout
            title="조직목록"
            breadcrumbs={[{text: '조직관리'}, {text: '조직목록'}]}
            // createPageRoute={'/admin/orgs/new'}
            tabNav={<ContentTabNav resetIndex={false} tabs={['가입현황', '연동현황']} recoilState={viewAboutAtom} />}
        >
            <AdminPageContainer>
                {viewAbout === ViewAbout.connects && <ConnectStatusView />}
                {viewAbout === ViewAbout.members && <MembersView />}
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});

const ConnectStatusView = (props: {}) => {
    const form = useListPageSearchForm(organizationAdminApi.summary);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;

    useEffect(() => {
        fetchData({
            order: {id: 'DESC'},
        });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-10">
                <div></div>
                <div className="min-w-[25vw]">
                    <SearchForm
                        searchForm={searchForm}
                        onSearch={onSearch}
                        registerName="where[name]"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                    />
                </div>
            </div>
            <SearchResultContainer>
                <OrgTablePanelForConnectStatus entries={listPage.items} />
            </SearchResultContainer>
        </>
    );
};

const MembersView = () => {
    const form = useListPageSearchForm(organizationAdminApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;

    useEffect(() => {
        fetchData({
            relations: ['memberships', 'memberships.user'],
            order: {id: 'DESC'},
        });
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-10">
                <div></div>
                <div className="min-w-[25vw]">
                    <SearchForm
                        searchForm={searchForm}
                        onSearch={onSearch}
                        registerName="where[name]"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                    />
                </div>
            </div>
            <SearchResultContainer>
                <CardTablePanel
                    gridClass="grid-cols-8"
                    entries={listPage.items}
                    entryComponent={(org, i) => <OrgTr org={org} key={i} />}
                >
                    <CardTableTH className="text-12" gridClass="grid-cols-8">
                        <div className="col-span-2">조직명</div>
                        <div>생성일시</div>
                        <div className="col-span-2 text-center">
                            멤버십 수 <small>(소유자/구성원)</small>
                        </div>
                        <div className="text-center">회원 수</div>
                        <div className="col-span-2">소유자</div>
                    </CardTableTH>
                </CardTablePanel>
                {/*{listPage.items.map((org, i) => (*/}
                {/*    <OrgItem key={i} org={org} />*/}
                {/*))}*/}
            </SearchResultContainer>
        </>
    );
};
