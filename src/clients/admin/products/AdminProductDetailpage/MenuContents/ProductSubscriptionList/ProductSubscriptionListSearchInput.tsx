import {memo, useRef} from 'react';
import {debounce} from 'lodash';

interface ProductSubscriptionListSearchInputProps {
    onChange?: (value: string) => any;
}

export const ProductSubscriptionListSearchInput = memo((props: ProductSubscriptionListSearchInputProps) => {
    const {onChange} = props;
    const searchInputRef = useRef<HTMLInputElement>(null);

    return (
        <input
            ref={searchInputRef}
            className="input input-bordered w-full"
            placeholder="Type here"
            onChange={debounce((e) => {
                onChange && onChange(e.target.value.trim());
            }, 500)}
        />
    );
});
ProductSubscriptionListSearchInput.displayName = 'ProductSubscriptionListSearchInput';
