import {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {cn} from '^public/lib/utils';

export function Checkbox(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    const {className = '', ...attrs} = props;

    return (
        <input
            type="checkbox"
            className={cn(
                `checkbox checkbox-xs checkbox-primary rounded-[4px] disabled:cursor-pointer disabled:opacity-100 disabled:border-gray-200 disabled:bg-gray-100 checked:disabled:!border-indigo-500 checked:disabled:!bg-indigo-500`,
                className,
            )}
            {...attrs}
        />
    );
}
