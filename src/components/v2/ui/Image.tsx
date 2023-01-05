import {memo} from 'react';
import {WithChildren} from '^types/global.type';

type ImageV2Props = {
    src: string;
    alt: string;
    width: number;
    rounded?: boolean;
} & WithChildren;

export const ImageV2 = memo((props: ImageV2Props) => {
    const {width, src, alt, rounded = false, children} = props;

    return (
        <div className={`avatar`}>
            <div className={`w-[${width}px] ${rounded ? 'rounded' : ''}`}>
                <img src={src} alt={alt} />
            </div>
        </div>
    );
});
