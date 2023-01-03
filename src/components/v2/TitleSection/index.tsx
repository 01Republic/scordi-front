import {TitleSectionSimple} from './Simple';
import React, {memo} from 'react';
import {DefaultButtonProps} from '^components/v2/ui/buttons/types';
import {BasicButton} from '^components/v2/ui/buttons/BasicButton';
import {TitleSectionCollapse} from '^components/v2/TitleSection/Collapse';
import {TitleSectionText} from '^components/v2/TitleSection/Text';

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
    Collapse: TitleSectionCollapse,
    Title: TitleSectionText,
    Button: TitleSectionButton,
    TopPadding: TitleSectionTopPadding,
};
