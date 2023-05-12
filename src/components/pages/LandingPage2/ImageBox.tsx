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
        <div className="section-3-image-box mb-5">
            <div className="s3-image" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <img src={imgUrl} className="w-full" />
            </div>
            <div
                className="s3-text text-center -mt-[1rem]"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
            >
                <span className="s-text-sm mr-2 sm:mr-3">{leftTxt}</span>
                <span className="s-text-xl">{centerNum}%</span>
                <span className="s-text-sm ml-2 sm:mr-3">{rightTxt}</span>
            </div>
        </div>
    );
});
