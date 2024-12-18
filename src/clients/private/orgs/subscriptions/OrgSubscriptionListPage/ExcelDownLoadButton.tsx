import {debounce} from 'lodash';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {FiDownload} from 'react-icons/fi';
import React, {memo, useState} from 'react';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {useCurrentOrg2} from '^models/Organization/hook';
import {yyyy_mm_dd} from '^utils/dateTime';

export const ExcelDownLoadButton = memo(() => {
    const {currentOrg} = useCurrentOrg2();
    const {query} = useSubscriptionTableListAtom();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = debounce(() => {
        if (!currentOrg) return;

        const orgName = currentOrg.name.trim().replace(/\s/g, '_');
        const timestamp = yyyy_mm_dd(new Date());
        const filename = `${orgName}_구독리스트_다운로드`;

        setIsLoading(true);
        subscriptionApi
            .download(query, filename)
            .then(() => toast.success('다운로드 완료'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, 250);

    return (
        <div
            className={`btn bg-white border border-[#CBD5E1] ${isLoading ? 'opacity-40 pointer-events-none' : ''}`}
            onClick={!isLoading ? onClick : undefined}
        >
            <FiDownload fontSize={20} />
        </div>
    );
});
