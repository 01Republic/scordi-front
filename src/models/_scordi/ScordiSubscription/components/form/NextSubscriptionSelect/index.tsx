import {useFormContext} from 'react-hook-form';
import {FormControl} from '../FormControl';

export const NextSubscriptionSelect = () => {
    const form = useFormContext<{nextSubscriptionId?: number | null}>();

    return (
        <FormControl label="다음 구독">
            <div></div>
        </FormControl>
    );
};
