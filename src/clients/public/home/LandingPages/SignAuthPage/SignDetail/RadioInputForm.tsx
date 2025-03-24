import {useFormContext} from 'react-hook-form';
import {CreateUserDetailRequestDto} from '^models/User/types';

interface RadioInputFormProps {
    value: string;
}

export const RadioInputForm = (props: RadioInputFormProps) => {
    const {value} = props;
    const {register} = useFormContext<CreateUserDetailRequestDto>();

    return (
        <label className="flex items-center gap-1 cursor-pointer">
            <input type="radio" value={value} {...register('funnel')} className="scale-110 accent-primaryColor-900" />
            {value}
        </label>
    );
};
