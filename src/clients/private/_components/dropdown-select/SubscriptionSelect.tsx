import React, {memo, useRef, useState} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionProfile} from '^models/Subscription/components';
import {ChevronDown} from 'lucide-react';
import {Loading} from '^v3/share/Loading';
import {DropdownContent} from '^v3/share/Dropdown';
import {useElementWidth} from '^hooks/useElementWidth';

interface SubscriptionSelectProps {
    defaultValue?: SubscriptionDto;
    subscription?: SubscriptionDto[];
    onSelect: (item: SubscriptionDto) => void;
    onOpen?: () => void;
    readonly?: boolean;
    isLoading?: boolean;
}

export const SubscriptionSelect = memo((props: SubscriptionSelectProps) => {
    const {defaultValue, subscription, onSelect, onOpen, readonly, isLoading} = props;

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<SubscriptionDto | null>(defaultValue || null);
    const subscriptionToShow = selected ? selected : defaultValue ? defaultValue : null;
    const [triggerRef, dropdownWidth] = useElementWidth<HTMLDivElement>();

    const handleSelect = (item: SubscriptionDto) => {
        setSelected(item);
        onSelect(item);
        setOpen(false);
    };

    return (
        <>
            <div
                ref={triggerRef}
                className={`flex items-center justify-between cursor-pointer rounded-lg px-3 py-4 text-14 whitespace-nowrap ${
                    readonly ? 'bg-gray-100 pointer-events-none' : 'ring-1 ring-inset ring-gray-300'
                }`}
                onClick={() => {
                    if (readonly) return;
                    if (!open) onOpen?.();
                    setOpen((open) => !open);
                }}
            >
                {subscriptionToShow ? (
                    <SubscriptionProfile
                        subscription={subscriptionToShow}
                        className="gap-2"
                        isAlias={false}
                        width={20}
                        height={20}
                    />
                ) : (
                    <span className="text-gray-500">구독 선택</span>
                )}
                {!readonly && <ChevronDown className="size-4" />}
            </div>

            {!readonly && (
                <DropdownContent
                    visible={open}
                    hide={() => setOpen(false)}
                    triggerRef={triggerRef}
                    backdrop
                    allowScroll
                    placement="bottom-start"
                >
                    <ul
                        style={{width: dropdownWidth}}
                        className="dropdown-portal-content relative z-10 bg-white border border-gray-300 w-full py-1 rounded-lg max-h-60 overflow-auto px-4 space-y-4"
                    >
                        {isLoading ? (
                            <div className="min-w-60 flex items-center justify-center">
                                <Loading />
                            </div>
                        ) : (
                            <section>
                                {subscription?.map((subscription) => (
                                    <li
                                        key={subscription.id}
                                        className="hover:bg-neutral-100 active:bg-primaryColor-900 active:text-white cursor-pointer text-12 p-1 rounded-md"
                                        onClick={() => handleSelect(subscription)}
                                    >
                                        <SubscriptionProfile
                                            subscription={subscription}
                                            className="gap-2"
                                            isAlias={false}
                                            width={20}
                                            height={20}
                                        />
                                    </li>
                                ))}
                            </section>
                        )}
                    </ul>
                </DropdownContent>
            )}
        </>
    );
});
