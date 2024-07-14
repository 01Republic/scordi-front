import React, {memo} from 'react';

interface FormControlEmptyValueProps {
    text?: string;
}

export const FormControlEmptyValue = memo((props: FormControlEmptyValueProps) => {
    const {text = '비어 있음'} = props;
    return <div className="text-12 text-gray-300">{text}</div>;
});
