import React, {DetailedHTMLProps, SelectHTMLAttributes} from 'react';
import {FilterOperator, t_filterOperator} from '^lib/notion-like-filter';

interface Props extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    operators: FilterOperator[];
}

export const FilterOperatorSelect: React.FC<Props> = ({operators, ...props}) => {
    return (
        <select
            {...props}
            defaultValue={props.defaultValue ?? operators[0]}
            className="border rounded text-14 py-1 px-2 min-w-[125px]"
        >
            {operators.map((op) => (
                <option key={op} value={op}>
                    {t_filterOperator(op)}
                </option>
            ))}
        </select>
    );
};
