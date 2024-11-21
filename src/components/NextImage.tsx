import {memo} from 'react';
import Image from 'next/image';
import {ImageProps} from 'next/dist/client/image';
import {className} from 'postcss-selector-parser';

interface NextImageProps extends ImageProps {
    className: string;
}

export const NextImage = (props: NextImageProps) => {
    const {src, alt, layout = 'fill', className, ...res} = props;

    return (
        <Image
            src={src}
            alt={alt}
            layout={layout}
            loading="lazy"
            draggable={false}
            {...res}
            className={`${className}`}
        />
    );
};
