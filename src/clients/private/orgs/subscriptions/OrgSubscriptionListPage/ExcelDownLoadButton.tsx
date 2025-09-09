import {debounce} from 'lodash';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import React, {memo, useState} from 'react';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {useCurrentOrg2} from '^models/Organization/hook';
import {yyyy_mm_dd} from '^utils/dateTime';
import {Download} from 'lucide-react';
import {FindAllSubscriptionsGroupedByProductDto, FindAllSubscriptionsQuery} from '^models/Subscription/types';

interface Props {
    isGroupMode: boolean;
    query: FindAllSubscriptionsQuery | FindAllSubscriptionsGroupedByProductDto;
}

export const ExcelDownLoadButton = memo((props: Props) => {
    const {isGroupMode, query} = props;
    const {currentOrg} = useCurrentOrg2();
    // const {query} = useSubscriptionTableListAtom();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = debounce(() => {
        if (!currentOrg) return;

        const orgName = currentOrg.name.trim().replace(/\s/g, '_');
        const timestamp = yyyy_mm_dd(new Date());
        const filename = `${orgName}_구독리스트_다운로드`;

        setIsLoading(true);
        subscriptionApi
            .download(isGroupMode, query, filename)
            .then(() => toast.success('구독리스트 엑셀 다운로드가 완료되었어요.'))
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
