import {memo} from 'react';
import Image from 'next/image';
import {NextImage} from '^components/NextImage';

interface ResponsiveFigureImgProps {
    src: string;
    alt: string;
    responsiveHeight: string;
    className?: string;
    imgClassName?: string;
}

/**
 * 반응형 가로세로 비율을 유지하는 이미지
 */
export const ResponsiveFigureImg = memo((props: ResponsiveFigureImgProps) => {
    const {src, alt, responsiveHeight, className = '', imgClassName = ''} = props;

    return (
        <figure
            className={`relative w-full h-0 overflow-hidden ${className}`}
            style={{paddingBottom: responsiveHeight}}
        >
            <NextImage src={src} alt={alt} className={`${imgClassName}`} />
        </figure>
    );
});
