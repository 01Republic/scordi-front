import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {Dispatch, SetStateAction, useState} from 'react';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';

enum Scope {
    ALL,
    In_PROGRESS,
    FINISHED,
}

export function RequestScopeHandler({search}: {search: Dispatch<SetStateAction<FindAllReviewCampaignsQueryDto>>}) {
    const [active, setActive] = useState(Scope.ALL);

    const searchResource = (type: Scope) => {
        setActive(type);
        switch (type) {
            case Scope.ALL:
                search((prev) => ({...prev, where: {}, page: 1}));
                break;
            case Scope.In_PROGRESS:
                search((prev) => ({
                    ...prev,
                    where: {
                        // 시작일시가 현재보다 작고
                        startAt: {op: 'lte', val: new Date()},
                        // 종료가 안된것
                        closedAt: 'NULL',
                    },
                    page: 1,
                }));
                break;
            case Scope.FINISHED:
                search((prev) => ({
                    ...prev,
                    where: {
                        // 종료가 된것
                        closedAt: {op: 'not', val: 'NULL'},
                    },
                    page: 1,
                }));
                break;
        }
    };

    return (
        <div className="flex items-center gap-2">
            <ListPage.ScopeButton active={active === Scope.ALL} onClick={() => searchResource(Scope.ALL)}>
                전체
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={active === Scope.In_PROGRESS}
                onClick={() => searchResource(Scope.In_PROGRESS)}
            >
                진행 중
            </ListPage.ScopeButton>
            <ListPage.ScopeButton active={active === Scope.FINISHED} onClick={() => searchResource(Scope.FINISHED)}>
                완료
            </ListPage.ScopeButton>
        </div>
    );
}
