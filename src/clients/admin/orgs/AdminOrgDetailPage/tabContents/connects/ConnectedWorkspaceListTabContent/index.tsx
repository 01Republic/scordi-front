import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {defineTabs, useTabs} from '^components/util/tabs';
import {GoogleWorkspaceListTabContent} from './GoogleWorkspaceListTabContent';
import {GoogleWorkspaceMemberListTabContent} from './GoogleWorkspaceMemberListTabContent';
import {GoogleWorkspaceActivityListTabContent} from './GoogleWorkspaceActivityListTabContent';

const googleAdminConnectedTab = defineTabs('googleAdminConnectedTab', [
    {label: '워크스페이스', TabPane: GoogleWorkspaceListTabContent},
    {label: '구성원 계정', TabPane: GoogleWorkspaceMemberListTabContent},
    {label: '로그인 내역', TabPane: GoogleWorkspaceActivityListTabContent},
]);

export const ConnectedWorkspaceListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const {tabs, currentTabIndex, setCurrentTabIndex, CurrentTabPane} = useTabs(googleAdminConnectedTab);

    if (!org) return <></>;

    return (
        <div className="grid grid-cols-6 gap-8">
            <div>
                <ul className="p-0 menu bg-base-100 shadow">
                    {tabs.map((tab, i) => (
                        <li key={i} className={currentTabIndex === i ? 'bordered' : ''}>
                            <a onClick={() => setCurrentTabIndex(i)}>{tab.label}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-span-5">
                <CurrentTabPane moveTab={(tabIndex: number) => setCurrentTabIndex(tabIndex)} />
            </div>
        </div>
    );
});

export const ConnectedWorkspaceListTabContent2 = memo(() => {
    // const org = useRecoilValue(adminOrgDetail);
    // const [isSyncLoading, setSyncLoading] = useState(false);
    // const {result, search, isLoading, reload} = useGoogleSyncHistoriesForAdmin();
    //
    // useEffect(() => {
    //     if (!org) return;
    //
    //     search({
    //         relations: ['googleTokenData'],
    //         where: {organizationId: org.id},
    //         order: {id: 'DESC'},
    //     });
    // }, [org]);
    //
    // if (!org) return <></>;
    // if (isLoading) return <>loading...</>;
    //
    // // 재실행
    // const sync = () => {
    //     setSyncLoading(true);
    //     const req = organizationConnectGoogleWorkspaceApi.sync(org.id);
    //     req.then(() => {
    //         reload();
    //         toast.success('동기화가 완료됐습니다.');
    //     });
    //     req.catch((err) => toast.error(err.response.data.message));
    //     req.finally(() => setSyncLoading(false));
    // };

    return (
        <div className="w-full">
            {/*<div className="flex justify-between">*/}
            {/*    <h2 className="mb-6">*/}
            {/*        {result.pagination.totalItemCount}*/}
            {/*        <small>개의 실행 이력이 있습니다.</small>*/}
            {/*    </h2>*/}

            {/*    <div className="flex items-center gap-2">*/}
            {/*        <a className="btn btn-ghost gap-2" onClick={() => reload()}>*/}
            {/*            <RotateCw /> 새로고침*/}
            {/*        </a>*/}

            {/*        <button*/}
            {/*            className={`btn btn-primary ${isSyncLoading && 'opacity-70 loading'}`}*/}
            {/*            onClick={!isSyncLoading ? sync : undefined}*/}
            {/*        >*/}
            {/*            {!isSyncLoading ? <span>재실행</span> : <span>실행중</span>}*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<CardTablePanel*/}
            {/*    gridClass="grid-cols-5"*/}
            {/*    entries={result.items}*/}
            {/*    ths={[<div>id</div>, <div>계정</div>, <div>실행 시각</div>, <div>token</div>, <div></div>]}*/}
            {/*    entryComponent={(googleSyncHistory, i, arr) => (*/}
            {/*        <GoogleSyncHistoryItem*/}
            {/*            key={i}*/}
            {/*            googleSyncHistory={googleSyncHistory}*/}
            {/*            borderBottom={i + 1 < arr.length}*/}
            {/*            onFinish={() => reload()}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*/>*/}
        </div>
    );
});
