import {memo} from 'react';

interface ImageBoxProps {
    imgUrl: string;
    leftTxt: string;
    centerNum: number;
    rightTxt: string;
}

export const ImageBox = memo((props: ImageBoxProps) => {
    const {imgUrl, leftTxt, centerNum, rightTxt} = props;

    return (
        <div className="section-3-image-box">
            <div className="s3-image" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <img src={imgUrl} className="w-full" />
            </div>
            <div className="s3-text -mt-[0.5rem]" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <span className="s-text-sm mr-3">{leftTxt}</span>
                <span className="s-text-xl">{centerNum}%</span>
                <span className="s-text-sm ml-3">{rightTxt}</span>
            </div>
        </div>
    );
});
