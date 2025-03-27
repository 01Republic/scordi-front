import {Checkbox} from '^public/components/ui/checkbox';
import React from 'react';

interface CheckboxWithLabelProps {
    id: string;
    label: string;
}

export const CheckboxWithLabel = (props: CheckboxWithLabelProps) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={props.id} />
            <label
                htmlFor={props.id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {props.label}
            </label>
        </div>
    );
};
