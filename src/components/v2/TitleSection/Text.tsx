import React, {memo} from 'react';

export const TitleSectionText = memo((props: {text: string}) => {
    return <h1 className="text-3xl">{props.text}</h1>;
});
