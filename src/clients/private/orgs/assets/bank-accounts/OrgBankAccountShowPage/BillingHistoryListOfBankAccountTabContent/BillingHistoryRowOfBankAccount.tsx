import {BillingHistoryDto, UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import React, {memo} from 'react';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {eventCut} from '^utils/event';
import {Dropdown} from '^v3/share/Dropdown';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {SubscriptionProfile} from '^models/Subscription/components';
import {BillingHistoryStatusTagUI, BillingHistoryTimestamp, PayAmount} from '^models/BillingHistory/components';
import {MoreHorizontal} from 'lucide-react';

interface BillingHistoryRowOfBankAccountProps {
    item: BillingHistoryDto;
    onSaved?: () => any;
    onDelete: (id: number) => any;
}

export const BillingHistoryRowOfBankAccount = memo((props: BillingHistoryRowOfBankAccountProps) => {
    const {item: billingHistory, onSaved, onDelete} = props;

    const update = debounce((dto: UpdateBillingHistoryRequestDtoV2) => {
        return billingHistoryApi
            .updateV2(billingHistory.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.success('문제가 발생했어요.'))
            .finally(() => onSaved && onSaved());
    }, 250);

    return (
        <tr className="group text-14" data-id={billingHistory.id} onClick={() => console.log(billingHistory)}>
            {/*일시*/}
            <td>
                <BillingHistoryTimestamp billingHistory={billingHistory} />
            </td>

            {/*상태*/}
            <td>
                <BillingHistoryStatusTagUI billingHistory={billingHistory} />
            </td>

            {/*내용*/}
            <td className="text-12 max-w-sm whitespace-pre-wrap">{billingHistory.title}</td>

            {/*결제금액*/}
            <td>
                <PayAmount billingHistory={billingHistory} />
            </td>

            {/*연결된 구독*/}
            <td>{billingHistory.subscription && <SubscriptionProfile subscription={billingHistory.subscription} />}</td>

            {/*비고*/}
            <td>
                <AirInputText
                    defaultValue={billingHistory.memo || undefined}
                    onChange={async (memo) => {
                        if (billingHistory.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>

            {/* Actions */}
            <td className="cursor-pointer">
                <Dropdown placement="bottom-end" Trigger={() => <MoreHorizontal fontSize={20} />}>
                    {({hide}) => (
                        <ul
                            className="dropdown-content menu p-0 shadow-lg bg-base-100 rounded-btn border border-gray-200 min-w-[8rem]"
                            onClick={eventCut}
                        >
                            <li>
                                <a
                                    className="p-2 text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 active:bg-red-100"
                                    onClick={() => {
                                        hide();
                                        onDelete(billingHistory.id);
                                    }}
                                >
                                    삭제하기
                                </a>
                            </li>
                        </ul>
                    )}
                </Dropdown>
            </td>
        </tr>
    );
});
