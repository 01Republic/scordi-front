import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {MobileSection} from '^components/v2/MobileSection';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {Colors, DefaultButtonProps, Size} from '^components/v2/ui/buttons/types';
import Link from 'next/link';
import {FakeLink} from '^components/v2/ui/buttons/FackLink';

type CTAButtonProps = {
    // text?: string;
    // types?: 'button' | 'submit';
    // color?: Colors;
    // size?: Size;
} & DefaultButtonProps;

export const CTAButton = memo((props: CTAButtonProps) => {
    const {
        text,
        href,
        target,
        onClick,
        className = '',
        color = 'secondary',
        outline = false,
        active = false,
        disabled = false,
    } = props;
    const classNames = [`btn btn-${color}`];
    if (outline) classNames.push('btn-outline');
    if (active) classNames.push('btn-active');
    if (disabled) classNames.push('btn-disabled');
    if (className) classNames.push(className);

    const LinkTo = href ? Link : FakeLink;

    return (
        <LinkTo href={href!} target={target}>
            <MobileSection className="py-[20px] pb-[50px] px-0 md:px-[20px]">
                <button
                    type={`${props.type ? props.type : 'submit'}`}
                    onClick={onClick}
                    className={`btn btn-block btn-big ${classNames.join(' ')}`}
                    style={props.style}
                >
                    {text}
                </button>
            </MobileSection>
        </LinkTo>
    );
});
