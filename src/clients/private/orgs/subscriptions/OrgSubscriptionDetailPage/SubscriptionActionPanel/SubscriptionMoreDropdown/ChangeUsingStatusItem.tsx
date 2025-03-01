import React, {memo, useState} from 'react';
import Tippy from '@tippyjs/react/headless';
import {toast} from 'react-hot-toast';
import {FaCheck, FaChevronDown} from 'react-icons/fa6';
import {errorToast} from '^api/api';
import {SubscriptionUsingStatusTag} from '^models/Subscription/components';
import {SubscriptionUsingStatus} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {useCurrentSubscription} from '../../atom';

export const ChangeUsingStatusItem = memo(function ChangeUsingStatusItem() {
    const {currentSubscription, reload} = useCurrentSubscription();
    const [isLoading, setIsLoading] = useState(false);

    if (!currentSubscription) return <></>;

    const {usingStatus} = currentSubscription;

    return (
        <MoreDropdownMenuItem onClick={console.log} theme="none" size="default">
            <div
                className={`flex items-center justify-between text-13 ${
                    isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
            >
                <div className="">사용 상태</div>
                <div>
                    <Tippy
                        interactive
                        placement="right-start"
                        render={() => (
                            <UsingStatusSelect
                                selectedValue={usingStatus}
                                selectOption={(option: SubscriptionUsingStatus) => {
                                    if (!currentSubscription) return;

                                    setIsLoading(true);
                                    subscriptionApi
                                        .update(currentSubscription.id, {usingStatus: option})
                                        .then(() => toast.success('변경사항을 저장했어요.'))
                                        .then(() => reload())
                                        .catch(errorToast)
                                        .finally(() => setIsLoading(false));
                                }}
                            />
                        )}
                    >
                        <div className="flex items-center justify-end hover:bg-slate-50 transition-all rounded-md py-1 px-1.5 -my-1 -mr-1.5">
                            <div className="">
                                <SubscriptionUsingStatusTag value={usingStatus} />
                            </div>

                            <div>
                                <FaChevronDown fontSize={10} className="text-gray-500" />
                            </div>
                        </div>
                    </Tippy>
                </div>
            </div>
        </MoreDropdownMenuItem>
    );
});

const UsingStatusSelect = (props: {
    selectedValue: SubscriptionUsingStatus;
    selectOption: (option: SubscriptionUsingStatus) => any;
}) => {
    const {selectedValue, selectOption} = props;
    return (
        <div className="text-14 menu px-0 py-0.5 shadow-xl bg-white border rounded-md min-w-[180px] !z-[1]">
            <div className="w-full mb-1 px-2 pt-2 pb-1">
                <p className="text-12 font-semibold text-gray-500">사용 상태를 변경할까요?</p>
                {/*<p className="text-10">사용상태 변경하기</p>*/}
            </div>

            {[
                SubscriptionUsingStatus.NONE,
                SubscriptionUsingStatus.FREE,
                SubscriptionUsingStatus.PAID,
                SubscriptionUsingStatus.QUIT,
            ].map((option, i) => {
                const isSelected = selectedValue === option;
                return (
                    <div
                        tabIndex={0}
                        key={i}
                        className="px-2 py-0.5 flex items-center justify-between cursor-pointer group hover:bg-gray-100 transition-all"
                        onClick={() => selectOption(option)}
                    >
                        <div className="flex-auto">
                            <SubscriptionUsingStatusTag value={option} />
                        </div>

                        <div>{isSelected && <FaCheck fontSize={16} className="text-green-500" />}</div>
                    </div>
                );
            })}
        </div>
    );
};
