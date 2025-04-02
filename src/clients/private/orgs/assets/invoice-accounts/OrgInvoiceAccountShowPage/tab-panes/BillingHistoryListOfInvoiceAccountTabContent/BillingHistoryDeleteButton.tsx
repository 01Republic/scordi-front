import React, {memo, useState} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {confirm2, confirmed} from '^components/util/dialog';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {RotateCw, Trash2} from 'lucide-react';

interface BillingHistoryDeleteButtonProps {
    billingHistory: BillingHistoryDto;
    reload: () => any;
}

export const BillingHistoryDeleteButton = memo((props: BillingHistoryDeleteButtonProps) => {
    const {billingHistory, reload} = props;
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        if (isLoading) return;

        const removeConfirm = () =>
            confirm2(
                '청구내역을 삭제할까요?',
                <div className="text-16">
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </div>,
            );
        confirmed(removeConfirm())
            .then(() => setIsLoading(true))
            .then(() => billingHistoryApi.destroy(billingHistory.id))
            .then(() => toast.success('청구내역을 삭제했어요.'))
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <button className="btn btn-sm btn-square btn-white no-animation btn-animation" onClick={onClick}>
            {isLoading ? (
                <RotateCw fontSize={16} className="animated animate-spin" />
            ) : (
                <Trash2 fontSize={16} className="text-error" />
            )}
        </button>
    );
});
