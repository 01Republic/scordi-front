import {useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BillingHistoryStatusMetaDto} from '^models/BillingHistory/type';

export const useBillingHistoryStatus = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [metaData, setMetaData] = useState<BillingHistoryStatusMetaDto>();
    const [years, setYears] = useState<number[]>([]);
    const [focusYear, setFocusYear] = useState<number>();

    const getMetaData = debounce(() => {
        billingHistoryApi.statusMeta(orgId).then((res) => {
            setMetaData(res.data);
            const years = res.data.years.reverse();
            setYears(years);
            setFocusYear(years[0]);
        });
    }, 500);

    useEffect(() => {
        getMetaData();
    }, []);

    return {
        metaData,
        years,
        focusYear,
        setFocusYear,
        getMetaData,
    };
};
