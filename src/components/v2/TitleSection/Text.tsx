import React, {memo} from 'react';

type TitleSectionTextProps = {
    text: string;
    size?: 'sm' | 'lg' | 'xl' | '2xl' | '3xl';
};

export const TitleSectionText = memo((props: TitleSectionTextProps) => {
    const {text, size = '3xl'} = props;
    return <h1 className={`text-${size}`}>{text}</h1>;
});
