import React, {memo} from 'react';
import {ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
import {CheckCircle} from '^components/react-icons/check-circle';
import {LinkTo} from '^components/util/LinkTo';

interface PaymentCompleteProps {
    payment?: ScordiPaymentDto;
}

export const PaymentComplete = memo((props: PaymentCompleteProps) => {
    const {payment} = props;

    const receiptUrl = payment?.response?.receipt?.url;

    return (
        <div className="w-full h-full flex flex-col pt-20 pb-8 sm:pb-20">
            <div className="w-full max-w-sm mx-auto flex-auto flex flex-col">
                <CheckCircle className="w-[100px] mb-10" color="#5E5FEE" />

                <h1 className="text-xl sm:text-3xl mb-8 font-bold text-center">결제가 완료되었습니다!</h1>

                <div className="my-auto px-10 md:px-0">
                    <KeyValue label="주문 상품" value={payment?.planName || 'test'} />
                    <KeyValue label="결제 금액" value={`${(payment?.price || 0).toLocaleString()} 원`} />
                </div>
            </div>

            <div className="w-full max-w-sm mx-auto flex items-center gap-2 px-10 md:px-0">
                <div className="flex-1">
                    <LinkTo
                        href={receiptUrl}
                        text="영수증 확인"
                        className={`btn btn-lg sm:btn-md btn-gray btn-block rounded-lg ${
                            receiptUrl ? '' : 'opacity-30 cursor-not-allowed no-click'
                        }`}
                        target="_blank"
                        displayLoading={false}
                    />
                </div>
                <div className="flex-1">
                    <LinkTo
                        className="btn btn-lg sm:btn-md btn-scordi btn-block rounded-lg"
                        href="https://umoh.io/ko/startup_party"
                        target="_blank"
                        displayLoading={false}
                    >
                        우모로 이동
                    </LinkTo>
                </div>
            </div>
        </div>
    );
});
PaymentComplete.displayName = 'PaymentComplete';

const KeyValue = memo((props: {label: string; value: string}) => {
    return (
        <div className="flex items-center justify-between border-b">
            <div className="py-4 font-semibold whitespace-nowrap">{props.label}</div>
            <div className="py-4 font-semibold whitespace-nowrap">{props.value}</div>
        </div>
    );
});
