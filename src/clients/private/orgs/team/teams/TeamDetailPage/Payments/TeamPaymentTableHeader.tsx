import React, {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

type TeamPaymentTableHeaderProps = ListTableHeaderProps;

export const TeamPaymentTableHeader = memo((props: TeamPaymentTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/* 카드 프로필 */}
            <SortableTH sortKey="[name]" onClick={orderBy}>
                이름
            </SortableTH>

            {/* 상태 (editable, sortable) */}
            <SortableTH sortKey="[usingStatus]" onClick={orderBy}>
                상태
            </SortableTH>

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
            <th />
        </tr>
    );
});
TeamPaymentTableHeader.displayName = 'TeamPaymentTableHeader';
