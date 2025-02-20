import React, {memo} from 'react';
import {useCurrentSubscription} from '../../atom';
import {FormControl} from '^clients/private/_components/inputs/FormControl';

interface SubscriptionSeatsProps {
    isEditMode?: boolean;
    handleSeats: (value: number) => void;
}

export const SubscriptionSeats = memo((props: SubscriptionSeatsProps) => {
    const {isEditMode, handleSeats} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    const prevSeatCount = subscription.subscriptionSeats?.length || 0;

    return (
        <FormControl label="구매수량">
            {isEditMode ? (
                <div className="relative">
                    <input
                        className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                        defaultValue={prevSeatCount}
                        min={prevSeatCount}
                        type="number"
                        onChange={(e) => {
                            const value = Number(e.target.value.toString().replace(/\D/g, ''));
                            e.target.value = value.toString();
                            if (value) handleSeats(value);
                        }}
                    />
                    <div className="flex items-center absolute right-2 top-0 bottom-0 text-12 text-gray-500">
                        현재 보유: {prevSeatCount.toLocaleString()}개
                    </div>
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{prevSeatCount}</div>
            )}
            <span />
        </FormControl>
    );
});
