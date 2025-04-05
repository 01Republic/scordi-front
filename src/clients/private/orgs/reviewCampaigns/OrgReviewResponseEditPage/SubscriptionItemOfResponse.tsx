import React from 'react';
import {Tabs, TabsList, TabsTrigger} from '^public/components/ui/tabs';

export const SubscriptionItemOfResponse = () => {
    const tabsTriggerClassName = 'w-20 data-[state=active]:bg-[#5C5FEE] data-[state=active]:text-white';

    return (
        <div className={'flex justify-between items-center py-5 border-b last:border-0'}>
            <div>슬랙</div>
            <Tabs defaultValue="1">
                <TabsList className={'bg-gray-100 border border-gray-200'}>
                    <TabsTrigger value="1" className={tabsTriggerClassName} onClick={() => console.log(1)}>
                        사용
                    </TabsTrigger>
                    <TabsTrigger value="0" className={tabsTriggerClassName}>
                        미사용
                    </TabsTrigger>
                    <TabsTrigger value="2" className={tabsTriggerClassName}>
                        모름
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};
