import {Label} from '^public/components/ui/label';
import {Input} from '^public/components/ui/input';
import React from 'react';
import {cn} from '^public/lib/utils';

interface InputWithLabelProps {
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    className?: string;
}

export const InputWithLabel = (props: InputWithLabelProps) => {
    return (
        <div className={cn('flex flex-col space-y-2', props.className)}>
            <Label htmlFor={props.id}>{props.label}</Label>
            <Input type={props.type || 'text'} id={props.id} placeholder={props.placeholder} className={'bg-white'} />
        </div>
    );
};
