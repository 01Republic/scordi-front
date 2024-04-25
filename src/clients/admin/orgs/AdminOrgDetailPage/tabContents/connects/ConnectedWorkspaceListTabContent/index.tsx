import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useGoogleSyncHistoriesForAdmin} from '^models/GoogleSyncHistory/hook';
import {CardTablePanel} from '^admin/share';
import {GoogleSyncHistoryItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectedWorkspaceListTabContent/GoogleSyncHistoryItem';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {plainToast as toast} from '^hooks/useToast';
import {IoReload} from 'react-icons/io5';

export const ConnectedWorkspaceListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const [isSyncLoading, setSyncLoading] = useState(false);
    const {result, search, isLoading, reload} = useGoogleSyncHistoriesForAdmin();

    useEffect(() => {
        if (!org) return;

        search({
            relations: ['googleTokenData'],
            where: {organizationId: org.id},
            order: {id: 'DESC'},
        });
    }, [org]);

    if (!org) return <></>;
    if (isLoading) return <>loading...</>;

    // 재실행
    const sync = () => {
        setSyncLoading(true);
        const req = organizationConnectGoogleWorkspaceApi.sync(org.id);
        req.then(() => {
            reload();
            toast.success('동기화가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setSyncLoading(false));
    };

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="mb-6">
                    {result.pagination.totalItemCount}
                    <small>개의 실행 이력이 있습니다.</small>
                </h2>

                <div className="flex items-center gap-2">
                    <a className="btn btn-ghost gap-2" onClick={() => reload()}>
                        <IoReload /> 새로고침
                    </a>

                    <button
                        className={`btn btn-primary ${isSyncLoading && 'opacity-70 loading'}`}
                        onClick={!isSyncLoading ? sync : undefined}
                    >
                        {!isSyncLoading ? <span>재실행</span> : <span>실행중</span>}
                    </button>
                </div>
            </div>

            <CardTablePanel
                gridClass="grid-cols-5"
                entries={result.items}
                ths={['id', '계정', '실행 시각', 'token', '']}
                entryComponent={(googleSyncHistory, i, arr) => (
                    <GoogleSyncHistoryItem
                        key={i}
                        googleSyncHistory={googleSyncHistory}
                        borderBottom={i + 1 < arr.length}
                        onFinish={() => reload()}
                    />
                )}
            />
        </div>
    );
});
