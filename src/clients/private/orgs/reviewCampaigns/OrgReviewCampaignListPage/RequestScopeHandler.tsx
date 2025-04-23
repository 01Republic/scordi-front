import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {Dispatch, SetStateAction, useState} from 'react';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';

enum Scope {
    ALL,
    IN_PROGRESS,
    OVERDUE,
    CLOSED,
}

export function RequestScopeHandler({search}: {search: Dispatch<SetStateAction<FindAllReviewCampaignsQueryDto>>}) {
    const [active, setActive] = useState(Scope.ALL);

    const searchResource = (type: Scope) => {
        setActive(type);
        switch (type) {
            case Scope.ALL:
                search((prev) => ({...prev, where: {}, page: 1}));
                break;
            case Scope.IN_PROGRESS: // 진행중
                search((prev) => ({
                    ...prev,
                    where: {
                        startAt: {op: 'lte', val: new Date()},
                        finishAt: {op: 'mt', val: new Date()},
                        closedAt: 'NULL',
                    },
                    page: 1,
                }));
                break;
            case Scope.OVERDUE: // 마감
                search((prev) => ({
                    ...prev,
                    where: {
                        finishAt: {op: 'lte', val: new Date()},
                        closedAt: 'NULL',
                    },
                    page: 1,
                }));
                break;
            case Scope.CLOSED: // 완료
                search((prev) => ({
                    ...prev,
                    where: {
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
                active={active === Scope.IN_PROGRESS}
                onClick={() => searchResource(Scope.IN_PROGRESS)}
            >
                진행중
            </ListPage.ScopeButton>
            <ListPage.ScopeButton active={active === Scope.OVERDUE} onClick={() => searchResource(Scope.OVERDUE)}>
                마감
            </ListPage.ScopeButton>
            <ListPage.ScopeButton active={active === Scope.CLOSED} onClick={() => searchResource(Scope.CLOSED)}>
                완료
            </ListPage.ScopeButton>
        </div>
    );
}
