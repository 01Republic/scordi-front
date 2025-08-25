import {useFormContext} from 'react-hook-form';
import {FormControl} from './FormControl';

interface IsActiveInputProps {}

export const IsActiveInput = (props: IsActiveInputProps) => {
    const {} = props;
    const form = useFormContext<{isActive?: boolean}>();

    return (
        <FormControl label="활성 여부" required>
            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" {...form.register('isActive')} />
        </FormControl>
    );
};
