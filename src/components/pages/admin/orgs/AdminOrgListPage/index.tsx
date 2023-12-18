import {memo, useEffect} from 'react';
import {AdminListPageLayout} from '^admin/layouts';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {organizationAdminApi} from '^models/Organization/api';
import {OrgItem} from '^admin/orgs/AdminOrgListPage/OrgItem';

export const AdminOrgListPage = memo(() => {
    const form = useListPageSearchForm(organizationAdminApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
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
                    {listPage.items.map((org, i) => (
                        <OrgItem key={i} org={org} />
                    ))}
                </SearchResultContainer>
            </div>
        </AdminListPageLayout>
    );
});
