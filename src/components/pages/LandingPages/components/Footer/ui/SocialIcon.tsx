import React, {HTMLAttributeAnchorTarget, memo} from 'react';

interface SocialIconProps {
    name: string;
    href: string;
    imgSrc: string;
    imgSrcHover: string;
    target?: HTMLAttributeAnchorTarget;
}

export const SocialIcon = memo((props: SocialIconProps) => {
    const {name, href, imgSrc, imgSrcHover, target = '_blank'} = props;

    return (
        <li className="p-footer__social-list-item mr-[8px]">
            <a
                className="w-[36px] h-[36px] cursor-pointer inline-block opacity-70 rounded-full hover:opacity-100"
                style={{transition: 'opacity .2s ease'}}
                aria-label={name}
                target={target}
                href={href}
            >
                <img src={imgSrc} alt={name} loading="lazy" draggable={false} className="inline-block" />
            </a>
        </li>
    );
});
