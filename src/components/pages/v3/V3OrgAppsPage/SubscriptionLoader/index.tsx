import React, {memo, useEffect} from 'react';
import {subscriptionApi} from '^models/Subscription/api';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {subscriptionsState} from '^models/Subscription/atom';

/**
 * 좌
 * - 검색조건 드롭다운
 * - 검색어 인풋 (검색어를 입력해주세요)
 *
 * 우
 * - 날짜 검색
 * 이건 전에 핸들리 따라 만들었던거 컴포넌트 가져오기
 *
 * ---
 *
 * 근데 일단 UI 는 나중에 하고, 로딩부터 먼저 할 것.
 */
export const SubscriptionLoader = memo(function SubscriptionLoader() {
    const orgId = useRecoilValue(orgIdParamState);
    const setSubscriptions = useSetRecoilState(subscriptionsState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        // only for summary
        const req = subscriptionApi.index({
            where: {organizationId: orgId},
            relations: ['master'],
            itemsPerPage: 0,
        });

        req.then((res) => {
            setSubscriptions(res.data.items);
        });
    }, [orgId]);

    return (
        <section className="flex items-center justify-between mb-10">
            <div></div>
            <div className="min-w-[25vw]">
                <div></div>
            </div>
        </section>
    );
});
