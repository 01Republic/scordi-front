import {FC, ImgHTMLAttributes, memo} from 'react';
import {BiCreditCard} from 'react-icons/bi';
import {WithChildren} from '^types/global.type';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

/**
 * @example
 * <Avatar
 *   className="10"
 *   src="https://source.unsplash.com/random/40x40"
 * />
 */
export const Avatar: FC<AvatarProps & WithChildren> = ({className = '', src, alt = 'avatar', children, ...props}) => {
    if (src) {
        return <img className={`avatar ${className}`} src={src} alt={alt} {...props} />;
    }

    return (
        <span className={`avatar-default ${className}`}>
            {children || (
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </span>
    );
};

interface Avatar2Props {
    src?: string;
    size?: number;
    mask?: 'squircle' | 'hexagon' | 'triangle';
    className?: string;
}

export const Avatar2 = memo((props: Avatar2Props) => {
    const {src, size = 24, mask = 'squircle', className = ''} = props;

    return (
        <div className="avatar">
            <div className={`w-${size} mask mask-${mask}`}>
                {src ? (
                    <img src={src} className={className} />
                ) : (
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                )}
            </div>
        </div>
    );
});

interface AvatarCardProps {
    src?: string;
    className?: string;
}

export const AvatarCard = memo((props: AvatarCardProps) => {
    const {src, className} = props;

    return src ? (
        <img className={`avatar ${className}`} src={src} {...props} />
    ) : (
        <span className={`avatar-default ${className} p-0.5`}>
            <BiCreditCard className="h-full w-full text-gray-300" />
        </span>
    );
});
