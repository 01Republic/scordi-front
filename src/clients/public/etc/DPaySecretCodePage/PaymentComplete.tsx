import React, {memo} from 'react';
import {ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
import {CheckCircle} from '^components/react-icons/check-circle';
import {LinkTo} from '^components/util/LinkTo';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';

interface PaymentCompleteProps {
    payment?: ScordiPaymentDto;
    plan?: ScordiPlanDto;
}

export const PaymentComplete = memo((props: PaymentCompleteProps) => {
    const {payment, plan} = props;

    const planData = (payment?.scordiPlan || plan)?.getDPayPlanData();

    const planName = payment?.planName || 'test';
    const price = payment?.price || 0;
    const receiptUrl = payment?.response?.receipt?.url;
    const hasMoveButton = planData?.hasMoveButton ?? true;
    const moveButtonText = planData?.moveButtonText || '오픈카톡방으로 이동';
    const moveButtonUrl = planData?.moveButtonUrl || "javascript:alert('이동할 주소를 설정해주세요.')";
    const moveButtonMethod: React.HTMLAttributeAnchorTarget | undefined = planData?.moveButtonMethod || '_blank';
    // const etcRequired = !!planData?.etcRequired;
    // const etcLabel = planData?.etcLabel || '';
    const onCompleteMessage = planData?.onCompleteMessage || '';

    return (
        <div className="w-full h-full flex flex-col pt-20 pb-8 sm:pb-20">
            <div className="w-full max-w-sm mx-auto flex-auto flex flex-col">
                <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />

                <h1 className="text-xl sm:text-3xl mb-8 font-bold text-center">결제가 완료되었습니다!</h1>

                <div className="my-20 px-10 md:px-0">
                    <KeyValue label="모임 이름" value={planName} />
                    <KeyValue label="결제 금액" value={`${price.toLocaleString()} 원`} />
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
                {hasMoveButton && (
                    <div className="flex-1">
                        <LinkTo
                            className="btn btn-lg sm:btn-md btn-scordi btn-block rounded-lg"
                            href={moveButtonUrl}
                            target={moveButtonMethod}
                            displayLoading={false}
                            onClick={() => onCompleteMessage && alert(onCompleteMessage)}
                        >
                            {moveButtonText}
                        </LinkTo>
                    </div>
                )}
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
