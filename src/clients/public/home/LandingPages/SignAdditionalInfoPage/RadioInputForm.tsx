import {useFormContext} from 'react-hook-form';

interface RadioInputFormProps {
    value: string;
}

export const RadioInputForm = (props: RadioInputFormProps) => {
    const {value} = props;
    const {register} = useFormContext();

    return (
        <label className="flex items-center gap-1 cursor-pointer">
            <input type="radio" value={value} {...register('funnel')} className="scale-110 accent-primaryColor-900" />
            {value}
        </label>
    );
};
