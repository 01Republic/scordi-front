import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useSubscriptionMenuSummaryV2} from '^models/SubscsriptionSummary/hook';

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
    const {index: search} = useSubscriptionMenuSummaryV2();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        // only for summary
        search();
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
