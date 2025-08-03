import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface CreditCardTableHeaderProps extends ListTableHeaderProps {}

export const CreditCardTableHeader = memo((props: CreditCardTableHeaderProps) => {
    const {t} = useTranslation('assets');
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/* 카드 프로필 */}
            <SortableTH sortKey="[name]" onClick={orderBy}>
                {t('creditCard.list.table.header.profile') as string}
            </SortableTH>

            {/* 상태 (editable, sortable) */}
            <SortableTH sortKey="[usingStatus]" onClick={orderBy}>
                {t('creditCard.list.table.header.status') as string}
            </SortableTH>

            {/* 카드사 */}
            <th>{t('creditCard.list.table.header.company') as string}</th>

            {/* 출금계좌 */}
            {/*<th>출금계좌</th>*/}

            {/* 구분(법인/개인) */}
            <th>{t('creditCard.list.table.header.type') as string}</th>

            {/* 종류(신용/체크) */}
            <th>{t('creditCard.list.table.header.category') as string}</th>

            {/* 카드번호 */}
            {/*<th>카드번호</th>*/}

            {/* 비밀번호 */}
            {/*<th>비밀번호</th>*/}

            {/* 유효기간 */}
            <th>{t('creditCard.list.table.header.expiry') as string}</th>

            {/* CVC */}
            {/*<th>CVC</th>*/}

            {/* 인터넷뱅킹 여부 */}
            {/*<th>인터넷뱅킹 여부</th>*/}

            {/* 인터넷뱅킹 비밀번호 */}
            {/*<th>인터넷뱅킹 비밀번호</th>*/}

            {/* 홀더이름 */}
            {/*<th>홀더이름</th>*/}

            {/* 소지자 */}
            <th>{t('creditCard.list.table.header.member') as string}</th>

            {/* 비고 */}
            <th>{t('creditCard.list.table.header.memo') as string}</th>

            {/* 연동 상태 */}
            <th />
        </tr>
    );
});
CreditCardTableHeader.displayName = 'CreditCardTableHeader';
