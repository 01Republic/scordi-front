import Image, {ImageProps} from 'next/image';

interface NextImageProps extends ImageProps {
    className?: string;
    fill?: ImageProps['fill'];
    sizes?: ImageProps['sizes'];
}

export const NextImage = (props: NextImageProps) => {
    const {src, alt, className = '', sizes, style = {}, ...res} = props;
    const fill = props.width ? false : props.fill ?? true;

    if (fill) {
        style.objectFit ??= 'cover';
    }

    return (
        <Image
            src={src}
            alt={alt}
            loading="lazy"
            draggable={false}
            {...res}
            fill={fill}
            sizes={fill ? sizes || '100%' : sizes}
            className={`${className}`}
            style={style}
        />
    );
};
