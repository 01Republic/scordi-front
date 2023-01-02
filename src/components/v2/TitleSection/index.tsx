import {TitleSectionSimple} from './Simple';
import React, {memo} from 'react';
import {DefaultButtonProps} from '^components/v2/ui/buttons/types';
import {BasicButton} from '^components/v2/ui/buttons/BasicButton';

const TitleSectionText = memo((props: {text: string}) => {
    return <h1 className="text-3xl">{props.text}</h1>;
});

const TitleSectionButton = memo((props: Omit<DefaultButtonProps, 'color' | 'outline'>) => {
    return <BasicButton {...props} size="sm" />;
});

const TitleSectionTopPadding = memo(() => {
    return (
        <>
            <br />
            <br />
        </>
    );
});

export const TitleSection = {
    Simple: TitleSectionSimple,
    Title: TitleSectionText,
    Button: TitleSectionButton,
    TopPadding: TitleSectionTopPadding,
};
