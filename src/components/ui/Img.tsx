import {memo} from 'react';
import Image, {ImageProps} from 'next/image';

interface ImgProps extends ImageProps {
    // 이미지가 원격지 주소를 사용하는 경우 등,
    // next/image 가 아닌 순수 HTML img 태그를 사용 할 수 있습니다.
    // 값이 true 인 경우, src 는 string 이어야 합니다.
    pure?: boolean;
}

export const Img = memo((props: ImgProps) => {
    const {
        pure = false,
        src,
        layout = 'intrinsic',
        placeholder = 'blur',
        className = '',
        draggable = false,
        loading = 'lazy',
        ...res
    } = props;

    if (pure) {
        if (typeof src !== 'string') return <></>;

        return <img src={src} className={className} draggable={draggable} loading={loading} {...res} />;
    }

    return (
        <span className={`inline-block ${className}`}>
            <Image
                src={src}
                // layout={layout}
                placeholder={placeholder}
                draggable={draggable}
                loading={loading}
                {...res}
            />
        </span>
    );
});
