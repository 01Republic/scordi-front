import {HTMLAttributeAnchorTarget, memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ButtonToProps {
    href?: string;
    text?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: 'success' | 'gray';
    outline?: boolean;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
    onClick?: () => any;
    disabled?: boolean;
}

/**
 * ButtonTo (2023-03, fred)
 * 구독 상세 페이지에서 사용되는 실험적인 버튼 컴포넌트.
 */
export const ButtonTo = memo((props: ButtonToProps & WithChildren) => {
    const {text, size = 'sm', color, outline = false, className = '', children, ...attrs} = props;

    const classNames = ['btn normal-case'];

    // size
    if (size !== 'md') classNames.push(`btn-${size}`);

    // colors
    if (color === 'success') classNames.push('btn-success border border-success text-white');
    if (color === 'gray') classNames.push('btn-gray');

    if (outline) classNames.push('btn-outline');

    return (
        <a className={classNames.join(' ')} {...attrs}>
            {text || children}
        </a>
    );
});
