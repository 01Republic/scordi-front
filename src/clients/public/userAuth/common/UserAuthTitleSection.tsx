import React, {memo} from 'react';

interface TitleSectionProps {
    text: string;
    subTitle?: string;
}

export const UserAuthTitleSection = memo((props: TitleSectionProps) => {
    const {text, subTitle} = props;
    return (
        <section className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-gradient-color" style={{background: 'linear-gradient(to right, #5c5fee, #a5a6f5)'}}>
                {text}
            </h1>
            <p className="text-14 font-semibold text-gray-500">{subTitle}</p>
        </section>
    );
});
