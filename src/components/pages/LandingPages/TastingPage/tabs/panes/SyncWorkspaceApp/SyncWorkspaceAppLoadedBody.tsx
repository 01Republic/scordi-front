import {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {reportGroupedByProductState, reportState} from './atom';
import {ProductItemList} from './results/ProductItemList';
import {ReportItemModal} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/ReportItemModal';

export const SyncWorkspaceAppLoadedBody = memo(function LoadedResult() {
    const reportList = useRecoilValue(reportState);
    const [reportByProduct, setReportByProduct] = useRecoilState(reportGroupedByProductState);

    useEffect(() => {
        if (!reportList) return;
        setReportByProduct(reportList.groupByProduct());
    }, [reportList]);

    if (!reportByProduct) return <></>;

    return (
        <section className="pt-8">
            <h1 className="font-semibold mb-5">{reportByProduct.workspaceName}에서 사용하는 서비스</h1>

            <ProductItemList items={reportByProduct.items} />
            <ReportItemModal />
        </section>
    );
});
