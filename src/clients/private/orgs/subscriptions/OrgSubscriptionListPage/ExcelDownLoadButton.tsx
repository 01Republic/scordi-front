import {debounce} from 'lodash';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {useTranslation} from 'next-i18next';
import {errorToast} from '^api/api';
import React, {memo, useState} from 'react';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {useCurrentOrg2} from '^models/Organization/hook';
import {yyyy_mm_dd} from '^utils/dateTime';
import {Download} from 'lucide-react';

export const ExcelDownLoadButton = memo(() => {
    const {t} = useTranslation('subscription');
    const {currentOrg} = useCurrentOrg2();
    const {query} = useSubscriptionTableListAtom();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = debounce(() => {
        if (!currentOrg) return;

        const orgName = currentOrg.name.trim().replace(/\s/g, '_');
        const timestamp = yyyy_mm_dd(new Date());
        const filename = `${orgName}_${t('excel.filename') as string}`;

        setIsLoading(true);
        subscriptionApi
            .download(query, filename)
            .then(() => toast.success(t('excel.downloadSuccess') as string))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, 250);

    return (
        <div
            className={`btn btn-header-action ${isLoading ? 'opacity-40 pointer-events-none' : ''}`}
            onClick={!isLoading ? onClick : undefined}
        >
            <Download fontSize={20} />
        </div>
    );
});
