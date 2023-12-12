import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {FaArrowRight} from 'react-icons/fa6';
import {StepContentProps} from '^components/util/funnel';
import {Container} from '../../Container';
import {CheckCircle} from '^components/react-icons/check-circle';
import {reportState} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/atom';
import {ProductItem} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/results/ProductItemList/ProductItem';
import {ReportDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report.dto';
import {userSocialGoogleApi} from '^api/social-google.api';
import {useAlert} from '^hooks/useAlert';
import {orgIdParamState} from '^atoms/common';
import {
    isLoadedState,
    onboardingFlowStepStatus,
    onboardingReportSavedEmail,
    OnboardingStep,
} from '^v3/share/OnboardingFlow/atom';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const ConnectGoogleAdminAfterLoad = memo(function ConnectGoogleAdminAfterLoad(props: Props) {
    const [currentStep, setStep] = useRecoilState(onboardingFlowStepStatus);
    const organizationId = useRecoilValue(orgIdParamState);
    const reportData = useRecoilValue(reportState);
    const [reportSavedEmail, setReportSavedEmail] = useRecoilState(onboardingReportSavedEmail);
    const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
    const {alert} = useAlert();
    const {onNext} = props;
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;
    const reportByProduct = reportData?.groupByProduct && reportData?.groupByProduct();

    const saveReport = (report: ReportDto) => {
        const {workspaceName, items} = report;
        const req = googleUsageReportApi.save2({
            organizationId,
            workspaceName,
            items,
            syncedEmail: report.rawMetadata.syncedEmail,
        });

        req.then(() => {
            window.localStorage.removeItem('report');
            setReportSavedEmail(report.rawMetadata.syncedEmail);
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
        const timeout = reportSavedEmail ? 0 : 3000;
        setTimeout(() => {
            setIsLoaded(true);
        }, timeout);
    }, []);

    useEffect(() => {
        if (currentStep !== OnboardingStep.ConnectWorkspace_AfterLoad) return;

        if (reportData) {
            if (reportSavedEmail) return;
            saveReport(reportData);
        } else {
            window.alert('잘못된 접근입니다.\n데이터를 찾을 수 없습니다.\n스텝을 초기화 합니다.');
            setStep(OnboardingStep.ConnectWorkspace_BeforeLoad);
        }
    }, [currentStep, reportSavedEmail, reportData]);

    return (
        <div data-step="ConnectGoogleAdmin" className="h-full flex flex-col gap-7">
            <Container size="md">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-3">{reportByProduct?.items.length}개의 서비스를 발견했어요</h3>
                    <p className="text-16 text-gray-500">
                        <b>{reportData?.workspaceName}</b> 으로 연동할게요
                    </p>
                </div>
            </Container>

            {!isLoaded && (
                <Container size="sm" className="flex justify-center py-8">
                    <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />
                </Container>
            )}

            {isLoaded && (
                <Container size="sm" className="mb-8">
                    <button className="btn btn-lg btn-block btn-scordi gap-2" onClick={() => onNext()}>
                        <span>계속하기</span>
                        <FaArrowRight />
                    </button>
                </Container>
            )}

            {isLoaded && (
                <Container size="6xl" className="pb-8">
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {(reportByProduct?.sortItems() || []).map((item, i) => (
                            <div key={i}>
                                <ProductItem item={item} preventRemove />
                            </div>
                        ))}
                    </div>
                </Container>
            )}
        </div>
    );
});
