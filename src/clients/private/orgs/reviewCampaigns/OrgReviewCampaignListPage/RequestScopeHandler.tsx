import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {Dispatch, SetStateAction, useState} from 'react';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';

export function RequestScopeHandler({search}: {search: Dispatch<SetStateAction<FindAllReviewCampaignsQueryDto>>}) {
    const [active, setActive] = useState(0);

    const searchResource = (type: number) => {
        switch (type) {
            case 0:
                setActive(0);
                search((prev) => ({...prev, where: {}, page: 1}));
                break;
            case 1:
                setActive(1);
                search((prev) => ({
                    ...prev,
                    where: {
                        finishAt: {op: 'lte', val: new Date()},
                    },
                    page: 1,
                }));
                break;
            case 2:
                setActive(2);
                search((prev) => ({
                    ...prev,
                    where: {
                        finishAt: {op: 'mte', val: 'null'},
                    },
                    page: 1,
                }));
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
}
