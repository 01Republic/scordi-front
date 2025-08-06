import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';
import {useTranslation} from 'next-i18next';
import {Dispatch, SetStateAction, useState} from 'react';

enum Scope {
    ALL,
    IN_PROGRESS,
    OVERDUE,
    CLOSED,
}

export function RequestScopeHandler({search}: {search: Dispatch<SetStateAction<FindAllReviewCampaignsQueryDto>>}) {
    const {t} = useTranslation('reviewCampaigns');
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
                {t('list.scope.all')}
            </ListPage.ScopeButton>
            <ListPage.ScopeButton
                active={active === Scope.IN_PROGRESS}
                onClick={() => searchResource(Scope.IN_PROGRESS)}
            >
                {t('list.scope.inProgress')}
            </ListPage.ScopeButton>
            <ListPage.ScopeButton active={active === Scope.OVERDUE} onClick={() => searchResource(Scope.OVERDUE)}>
                {t('list.scope.overdue')}
            </ListPage.ScopeButton>
            <ListPage.ScopeButton active={active === Scope.CLOSED} onClick={() => searchResource(Scope.CLOSED)}>
                {t('list.scope.closed')}
            </ListPage.ScopeButton>
        </div>
    );
}
