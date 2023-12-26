import {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';

interface AmountBodyProps {
    form: UseFormReturn<CreateBillingHistoryRequestDto>;
}

export const AmountBody = memo((props: AmountBodyProps) => {
    return <></>;
});
