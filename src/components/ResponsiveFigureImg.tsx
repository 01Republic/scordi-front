import {memo} from 'react';

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
            <img src={src} alt={alt} className={`absolute top-0 left-0 w-full h-full ${imgClassName}`} loading="lazy" />
        </figure>
    );
});
