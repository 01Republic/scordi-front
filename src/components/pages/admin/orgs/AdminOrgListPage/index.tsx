import {memo, useEffect} from 'react';
import {AdminListPageLayout} from '^admin/layouts';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {organizationAdminApi} from '^models/Organization/api';
import {OrgItem} from '^admin/orgs/AdminOrgListPage/OrgItem';
import {CardTablePanel, CardTableTR} from '^admin/share';
import {OrgTr} from '^admin/orgs/AdminOrgListPage/OrgTr';

export const AdminOrgListPage = memo(() => {
    const form = useListPageSearchForm(organizationAdminApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;

    useEffect(() => {
        fetchData({relations: ['memberships', 'memberships.user'], order: {id: 'DESC'}});
    }, []);

    return (
        <AdminListPageLayout
            title="조직목록"
            breadcrumbs={[{text: '조직관리'}, {text: '조직목록'}]}
            // createPageRoute={'/admin/orgs/new'}
        >
            <div className="container pt-10 px-2 sm:px-4">
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
                        gridClass="grid-cols-6"
                        entries={listPage.items}
                        ths={['조직명', '소유자', '워크스페이스 연동', '인보이스 계정 연동', '생성일시', '']}
                        entryComponent={(org, i) => <OrgTr org={org} key={i} />}
                    />
                    {/*{listPage.items.map((org, i) => (*/}
                    {/*    <OrgItem key={i} org={org} />*/}
                    {/*))}*/}
                </SearchResultContainer>
            </div>
        </AdminListPageLayout>
    );
});
