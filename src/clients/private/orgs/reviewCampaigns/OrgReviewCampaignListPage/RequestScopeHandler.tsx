import {memo, useState} from 'react';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useReviewCampaigns} from '^models/ReviewCampaign/hook';
import {reviewCampaignListAtom} from '^models/ReviewCampaign/atom';

export const RequestScopeHandler = memo(function () {
    const {search, query} = useReviewCampaigns(reviewCampaignListAtom);
    const [active, setActive] = useState<number>(0);

    const searchResource = (type: number) => {
        setActive(type);
        switch (type) {
            case 0:
                search({...query, where: {}, page: 1});
                break;
            case 1:
                search({...query, where: {closedAt: 'NULL'}, page: 1});
                break;
            case 2:
                search({...query, where: {closedAt: {op: 'not', val: 'NULL'}}, page: 1});
                break;
        }
    };

    return (
        <div className="flex items-center gap-2">
            <ListPage.ScopeButton active={active === 0} onClick={() => searchResource(0)}>
                전체
            </ListPage.ScopeButton>
            <ListPage.ScopeButton active={active === 1} onClick={() => searchResource(1)}>
                진행 중
            </ListPage.ScopeButton>
            <ListPage.ScopeButton active={active === 2} onClick={() => searchResource(2)}>
                완료
            </ListPage.ScopeButton>
        </div>
    );
});
