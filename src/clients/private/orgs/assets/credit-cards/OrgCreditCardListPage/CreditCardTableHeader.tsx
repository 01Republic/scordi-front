import React, {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';

interface CreditCardTableHeaderProps extends ListTableHeaderProps {
    sortVal: 'ASC' | 'DESC';
}

export const CreditCardTableHeader = memo((props: CreditCardTableHeaderProps) => {
    const {orderBy, sortVal} = props;

    return (
        <tr className="bg-slate-100">
            {/* 카드 프로필 */}
            <SortableTH2 sortKey="[name]" onClick={orderBy} sortVal={sortVal} className="!static !left-auto !z-auto">
                이름
            </SortableTH2>

            {/* 상태 (editable, sortable) */}
            <SortableTH2 sortKey="[usingStatus]" onClick={orderBy} sortVal={sortVal}>
                상태
            </SortableTH2>

            {/* 팀 */}
            <th>팀</th>

            {/* 구독 수 */}
            <SortableTH2 sortKey="[subscriptionCount]" onClick={orderBy} sortVal={sortVal}>
                구독 수
            </SortableTH2>

            {/* 월 누적 결제금액 */}
            <SortableTH2 sortKey="[monthlyPaidAmount]" onClick={orderBy} sortVal={sortVal}>
                월 누적 결제금액
            </SortableTH2>

            {/* 카드사 */}
            <th>카드사</th>

            {/* 출금계좌 */}
            {/*<th>출금계좌</th>*/}

            {/* 구분(법인/개인) */}
            <th>구분</th>

            {/* 종류(신용/체크) */}
            <th>종류</th>

            {/* 카드번호 */}
            {/*<th>카드번호</th>*/}

            {/* 비밀번호 */}
            {/*<th>비밀번호</th>*/}

            {/* 유효기간 */}
            <th>유효기간</th>

            {/* CVC */}
            {/*<th>CVC</th>*/}

            {/* 인터넷뱅킹 여부 */}
            {/*<th>인터넷뱅킹 여부</th>*/}

            {/* 인터넷뱅킹 비밀번호 */}
            {/*<th>인터넷뱅킹 비밀번호</th>*/}

            {/* 홀더이름 */}
            {/*<th>홀더이름</th>*/}

            {/* 소지자 */}
            <th>소지자</th>

            {/* 비고 */}
            <th>비고</th>

            {/* 연동 상태 */}
            <th />
        </tr>
    );
});
CreditCardTableHeader.displayName = 'CreditCardTableHeader';
