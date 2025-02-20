import React, {memo} from 'react';
import {useCurrentSubscription} from '../../atom';
import {FormControl} from '^clients/private/_components/inputs/FormControl';

interface SubscriptionSeatsProps {
    isEditMode?: boolean;
    setUpdateSeatCount: (value: number) => void;
    currentSeatCount: number;
    currentAssignedSeatCount: number;
}

export const SubscriptionSeats = memo((props: SubscriptionSeatsProps) => {
    const {isEditMode, currentSeatCount, currentAssignedSeatCount, setUpdateSeatCount} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <FormControl label="구매수량">
            {isEditMode ? (
                <div className="relative">
                    <input
                        className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                        defaultValue={currentSeatCount}
                        type="number"
                        onWheel={(e) => e.preventDefault()}
                        onChange={(e) => {
                            const value = Number(e.target.value.toString().replace(/\D/g, ''));
                            e.target.value = value.toString();
                            if (value) setUpdateSeatCount(value - currentSeatCount);
                        }}
                    />
                    <div className="flex items-center absolute right-2 top-0 bottom-0 text-12 text-gray-500">
                        {`할당: ${currentAssignedSeatCount} / 보유: ${currentSeatCount}`}
                    </div>
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{currentSeatCount}</div>
            )}
            <span />
        </FormControl>
    );
});
