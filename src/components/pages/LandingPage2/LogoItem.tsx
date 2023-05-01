import React, {memo} from 'react';

export interface LogoItemProps {
    imgSrc: string;
    imgAlt?: string;
}

export const LogoItem = memo((props: LogoItemProps) => {
    const {imgSrc, imgAlt = ''} = props;

    return (
        <li className="logos-slide">
            <img src={imgSrc} alt={imgAlt} className="logo-img" />
        </li>
    );
});
