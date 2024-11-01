import React, {memo} from 'react';
import {ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
import {CheckCircle} from '^components/react-icons/check-circle';
import {LinkTo} from '^components/util/LinkTo';

interface PaymentCompleteProps {
    payment: ScordiPaymentDto;
}

export const PaymentComplete = memo((props: PaymentCompleteProps) => {
    const {payment} = props;

    return (
        <div className="w-full h-full flex flex-col py-20">
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
                    <button className="btn btn-gray btn-block rounded-lg">혹시 버튼</button>
                </div>
                <div className="flex-1">
                    <LinkTo
                        className="btn btn-scordi btn-block rounded-lg"
                        href={'javascript:alert("우모 페이지 링크 빨리 주셈")'}
                        displayLoading={false}
                    >
                        우모로 이동하기
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
