import {memo, useEffect} from 'react';
import {userManageApi} from '^models/User/api';
import {UserItem} from './UserItem';
import {AdminListPageLayout} from '^components/pages/admin/layouts/ListPageLayout';
import {useListPageSearchForm} from '^admin/share/list-page/use-list-page-search-form';
import {AdminPageContainer} from '^admin/layouts';

export const AdminUserListPage = memo(() => {
    const form = useListPageSearchForm(userManageApi.index);
    const {searchForm, onSearch, fetchData, SearchForm, SearchResultContainer, listPage} = form;

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
    }, []);

    return (
        <AdminListPageLayout
            title="회원목록"
            breadcrumbs={[{text: '회원관리'}, {text: '회원목록'}]}
            // createPageRoute={'/admin/users/new'}
        >
            <AdminPageContainer>
                <div className="flex items-center justify-between mb-10">
                    <div></div>
                    <div className="min-w-[25vw]">
                        <SearchForm
                            searchForm={searchForm}
                            onSearch={onSearch}
                            registerName="keyword"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                <SearchResultContainer>
                    {listPage.items.map((user, i) => (
                        <UserItem key={i} user={user} />
                    ))}
                </SearchResultContainer>
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
