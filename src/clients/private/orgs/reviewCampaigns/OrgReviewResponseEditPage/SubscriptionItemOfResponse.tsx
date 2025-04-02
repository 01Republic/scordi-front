import React from 'react';
import {Checkbox} from '^public/components/ui/checkbox';

export const SubscriptionItemOfResponse = () => {
    return (
        <div className={'flex justify-between items-center py-5 border-b last:border-0'}>
            <div>슬랙</div>
            <div className={'flex items-center space-x-4'}>
                <div className="flex items-center space-x-2">
                    <Checkbox id="alarmForMember" />
                    <label
                        htmlFor="alarmForMember"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        사용함
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="alarmForMember" />
                    <label
                        htmlFor="alarmForMember"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        사용 안 함
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="alarmForMember" />
                    <label
                        htmlFor="alarmForMember"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        잘 모르겠음
                    </label>
                </div>
            </div>
        </div>
    );
};
