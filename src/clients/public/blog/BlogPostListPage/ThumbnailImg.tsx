import {memo} from 'react';

interface ThumbnailImgProps {
    src: string;
    alt: string;
}

export const ThumbnailImg = memo((props: ThumbnailImgProps) => {
    const {src, alt} = props;

    return (
        <div className={`min-w-full`}>
            <div className="w-full relative h-0 pt-[67.5%]">
                <div className="absolute w-full h-full top-0 left-0">
                    <div className="blog-post-item-img-hover-container w-full h-full overflow-hidden border rounded-[12px] sm:rounded-box">
                        <div className="w-full h-full object-cover" style={{transform: 'translateZ(0)'}}>
                            <span className="blog-post-item-img-wrapper">
                                <img
                                    src={src}
                                    alt={alt}
                                    draggable={false}
                                    sizes="100vw"
                                    decoding="async"
                                    data-nimg="fill"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
