import {memo, useState} from 'react';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useReviewCampaigns} from '^models/ReviewCampaign/hook';
import {reviewCampaignListAtom} from '^models/ReviewCampaign/atom';
import {useIdParam} from '^atoms/common';

export const RequestScopeHandler = memo(function () {
    const orgId = useIdParam('id');
    const {search, query} = useReviewCampaigns(orgId, {
        where: {organizationId: orgId},
        relations: ['organization', 'author'],
        itemsPerPage: 9,
        order: {finishAt: 'DESC'},
    });
    const [active, setActive] = useState<number>(0);

    const searchResource = (type: number) => {
        setActive(type);
        switch (type) {
            case 0:
                search({...query, where: {}, page: 1});
                break;
            case 1:
                /* TODO: 진행중 상태인 요청 필터링 */
                search({...query, where: {finishAt: new Date()}, page: 1});
                break;
            case 2:
                /* TODO: 완료 상태인 요청 필터링 */
                search({...query, where: {finishAt: new Date()}, page: 1});
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
