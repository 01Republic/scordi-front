import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface AvatarGroupProps extends WithChildren {
    className?: string;
    size?: number;
    spaceSize?: string | number;
    max?: number;
    urls?: string[];
    onClick?: () => any;
}

export const AvatarGroup = memo((props: AvatarGroupProps) => {
    const {className = '', size = 12, spaceSize, max = 3, urls = [], onClick, children} = props;

    const sizeClass = `w-${size}`;
    const placeholderNeeded = urls.length > max;

    return (
        <div className={`avatar-group ${className} ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
            {urls.slice(0, max).map((url, i) => (
                <div className={`avatar`} key={i} style={{marginLeft: i === 0 ? 0 : spaceSize}}>
                    <div className={sizeClass}>
                        <img src={url} loading="lazy" draggable={false} />
                    </div>
                </div>
            ))}
            {placeholderNeeded && (
                <div className={`avatar placeholder`} style={{marginLeft: spaceSize}}>
                    <div className={`${sizeClass} bg-neutral-focus text-neutral-content`}>
                        <span>+{urls.length - max}</span>
                    </div>
                </div>
            )}
        </div>
    );
});
