import {useFormContext} from 'react-hook-form';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {FormControl} from './FormControl';

interface Props {
    scordiSubscription?: ScordiSubscriptionDto;
    readOnly?: boolean;
}

export const StartAtInput = (props: Props) => {
    const {readOnly = false} = props;
    const form = useFormContext<{startAtStr?: string | null}>();

    return (
        <FormControl label="시작일시">
            <input
                type="date"
                className="input input-bordered w-full"
                {...form.register('startAtStr')}
                readOnly={readOnly}
                disabled={readOnly}
            />
        </FormControl>
    );
};
