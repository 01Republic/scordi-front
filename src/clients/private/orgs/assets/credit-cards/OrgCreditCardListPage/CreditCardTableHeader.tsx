import React, {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

interface CreditCardTableHeaderProps extends ListTableHeaderProps {}

export const CreditCardTableHeader = memo((props: CreditCardTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr>
            {/* 카드 프로필 */}
            <th className="!bg-slate-100 rounded-tl-md">이름</th>

            {/* 카드사 */}
            <th className="bg-slate-100">카드사</th>

            {/* 출금계좌 */}
            {/*<th className="bg-slate-100">출금계좌</th>*/}

            {/* 팀 */}
            <SortableTH sortKey="[teams][id]" onClick={orderBy} className="!bg-slate-100">
                팀
            </SortableTH>

            {/* 소지자 */}
            <th className="bg-slate-100">소지자</th>

            {/* 종류(신용/체크) */}
            <th className="bg-slate-100">종류(신용/체크)</th>

            {/* 구분(비자/마스터) */}
            {/*<th className="bg-slate-100">구분(비자/마스터)</th>*/}

            {/* 카드번호 */}
            {/*<th className="bg-slate-100">카드번호</th>*/}

            {/* 비밀번호 */}
            {/*<th className="bg-slate-100">비밀번호</th>*/}

            {/* 유효기간 */}
            {/*<th className="bg-slate-100">유효기간</th>*/}

            {/* CVC */}
            {/*<th className="bg-slate-100">CVC</th>*/}

            {/* 인터넷뱅킹 여부 */}
            {/*<th className="bg-slate-100">인터넷뱅킹 여부</th>*/}

            {/* 인터넷뱅킹 비밀번호 */}
            {/*<th className="bg-slate-100">인터넷뱅킹 비밀번호</th>*/}

            {/* 홀더이름 */}
            {/*<th className="bg-slate-100">홀더이름</th>*/}

            {/* 연결된 구독 수 (sortable) */}
            <th className="!bg-slate-100">연결된 구독</th>

            {/* 연동 상태 */}
            <th className="bg-slate-100 rounded-tr-md" />
        </tr>
    );
});
CreditCardTableHeader.displayName = 'CreditCardTableHeader';
