import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import React, {memo} from 'react';

export const TeamPaymentsListPage = memo(function TeamPaymentsListPage() {
    const onSearch = () => {
        console.log('search');
    };

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>전체 15</div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-scordi gap-2 mb-1" onClick={() => console.log('click')}>
                        + 결제수단 등록
                    </button>
                </div>
            </div>
            {/* TODO: 리스트 */}
        </TeamDetailLayout>
    );
});
