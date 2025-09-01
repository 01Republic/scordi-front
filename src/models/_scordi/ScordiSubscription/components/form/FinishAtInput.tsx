import {useFormContext} from 'react-hook-form';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {FormControl} from './FormControl';

interface Props {
    scordiSubscription?: ScordiSubscriptionDto;
    readOnly?: boolean;
}

export const FinishAtInput = (props: Props) => {
    const {readOnly = false} = props;
    const form = useFormContext<{finishAtStr?: string | null}>();

    return (
        <FormControl label="종료일시">
            <input
                type="date"
                className="input input-bordered w-full"
                {...form.register('finishAtStr')}
                readOnly={readOnly}
                disabled={readOnly}
            />
        </FormControl>
    );
};
