import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {reportGroupedByProductState, reportState} from './atom';
import {ProductItemList} from './results/ProductItemList';
import {useTranslation} from 'next-i18next';

export const SyncWorkspaceAppLoadedBody = memo(function LoadedResult() {
    const reportList = useRecoilValue(reportState);
    const [reportByProduct, setReportByProduct] = useRecoilState(reportGroupedByProductState);
    const {t} = useTranslation('publicTasting');

    useEffect(() => {
        if (!reportList) return;
        setReportByProduct(reportList.groupByProduct());
    }, [reportList]);

    if (!reportByProduct) return <></>;

    return (
        <section className="pt-8">
            <h1 className="font-semibold mb-[3rem]">
                <span className="text-scordi">{reportByProduct.workspaceName}</span>에서는{' '}
                <span className="block sm:inline-block">
                    <span className="text-scordi">{reportByProduct.items.length}개</span>의 서비스를{' '}
                    <span className="text-scordi">{reportList?.items.length}명</span>이 쓰고 있어요
                </span>
            </h1>

            <ProductItemList items={reportByProduct.items} />
        </section>
    );
});
