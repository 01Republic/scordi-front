import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {userSocialGoogleApi} from '^api/social-google.api';
import {ReportDto} from '^tasting/tabs/panes/SyncWorkspaceApp/dto/report.dto';
import {useAlert} from '^hooks/useAlert';
import {LinkTo} from '^components/util/LinkTo';
import {CheckCircle} from '^components/react-icons/check-circle';
import {ProductItem} from '^tasting/tabs/panes/SyncWorkspaceApp/results/ProductItemList/ProductItem';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {useCurrentOrg} from '^models/Organization/hook';
import {googleWorkspaceAccessTokenAtom, isSavingState, reportState} from './atom';

export const GoogleWorkspaceSaveConnectPage = memo(function GoogleWorkspaceSaveConnectPage() {
    const router = useRouter();
    const organizationId = useRecoilValue(orgIdParamState);
    const {reload: reloadCurrentOrg} = useCurrentOrg(organizationId);
    const [reportData, setReportData] = useRecoilState(reportState);
    const setAccessToken = useSetRecoilState(googleWorkspaceAccessTokenAtom);
    const [showAnim, setShowAnim] = useState(true);
    const [isSaving, setIsSaving] = useRecoilState(isSavingState);
    const {alert} = useAlert();
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;
    const reportByProduct = reportData?.groupByProduct && reportData?.groupByProduct();

    const routerBack = () => {
        setIsSaving(false);
        setReportData(null);
        setAccessToken(null);
    };

    const saveRedirect = () => {
        router.replace(V3OrgHomePageRoute.path(organizationId)).then(() => {
            setReportData(null);
            setAccessToken(null);
        });
    };

    const saveReport = (report: ReportDto) => {
        setIsSaving(true);
        const {workspaceName, items} = report;
        const req = googleUsageReportApi.save2({
            organizationId,
            workspaceName,
            items,
            syncedEmail: report.rawMetadata.syncedEmail,
        });

        req.then(() => {
            reloadCurrentOrg();
            saveRedirect();
        });

        req.catch((e) => {
            if (e.response.data.code == 'Unauthorized') {
                alert.error('G-Suite 관리자 계정으로 시도해주세요', '', {
                    html: `
                    ex) official@scordi.io
                    `,
                });
            } else {
                alert.error('관리자 계정 연결이 필요해요', '회사 공식 메일로 워크스페이스를 연동해주세요');
            }
        });
    };

    useEffect(() => {
        setTimeout(() => setShowAnim(false), 3000);
    }, []);

    return (
        <div className="py-10 px-12">
            <header>
                <div className="mb-12">
                    <LinkTo
                        onClick={routerBack}
                        className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                    >
                        <ArrowLeft /> 처음으로
                    </LinkTo>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <img
                        src="https://fonts.gstatic.com/s/i/productlogos/admin_2020q4/v6/192px.svg"
                        alt="google workspace logo"
                        className="avatar w-[48px] h-[48px] bg-white"
                    />
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl mb-4">
                        {reportData?.workspaceName} 워크스페이스<span className="text-gray-400">로부터</span> <br />
                        {reportData?.memberList.length}명의 구성원<span className="text-gray-400">과</span> {` `}
                        {reportByProduct?.items.length}개의 서비스
                        <span className="text-gray-400">를 불러왔어요</span>
                    </h1>
                    {/*<h2 className="text-xl mb-4">데이터를 저장하고 대시보드에서 확인해보세요</h2>*/}
                    <h2 className="text-xl mb-4">아래 버튼을 눌러야 대시보드에서 구독정보를 볼 수 있어요!</h2>
                </div>
            </header>

            {!showAnim && (
                <div className="sm:w-[40%] grid grid-cols-2 gap-2">
                    <button
                        className={`btn btn-lg btn-scordi gap-2 ${isSaving ? 'loading' : ''}`}
                        onClick={!isSaving ? () => reportData && saveReport(reportData) : undefined}
                    >
                        {isSaving ? '' : '저장하고 마치기'}
                    </button>

                    <button className="btn btn-lg gap-2" onClick={routerBack}>
                        다시 시도하기
                    </button>
                </div>
            )}

            <section className="py-8">
                {showAnim && <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />}

                {!showAnim && (
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {(reportByProduct?.sortItems() || []).map((item, i) => (
                            <div key={i}>
                                <ProductItem item={item} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
});
