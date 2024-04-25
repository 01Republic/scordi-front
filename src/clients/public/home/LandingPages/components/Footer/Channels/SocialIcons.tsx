import React, {memo} from 'react';
import {SocialIcon} from '../ui/SocialIcon';

export const SocialIcons = memo(() => {
    return (
        <ul className="flex list-none gap-2 mb-[30px]">
            {/*<SocialIcon*/}
            {/*    name="Scordi KakaoTalk"*/}
            {/*    href="https://pf.kakao.com/_AZZPxj?utm_source=kakaochannel&utm_medium=link&utm_campaign=homepage"*/}
            {/*    imgSrc="https://static.toss.im/assets/homepage/safety/icn-kakao.svg"*/}
            {/*/>*/}
            {/*<SocialIcon*/}
            {/*    name="Scordi Instagram"*/}
            {/*    href="https://instagram.com/saas.scordi?igshid=NTc4MTIwNjQ2YQ=="*/}
            {/*    imgSrc="https://static.toss.im/assets/homepage/safety/icn-instagram.svg"*/}
            {/*/>*/}
            <SocialIcon
                name="Scordi KakaoTalk"
                href="https://pf.kakao.com/_AZZPxj?utm_source=kakaochannel&utm_medium=link&utm_campaign=homepage"
                imgSrc="/home/icons/footer-icons/kakao_talk-g-80_80.png"
                imgSrcHover="/home/icons/footer-icons/kakao_talk-p-80_80.png"
            />
            <SocialIcon
                name="Scordi Instagram"
                href="https://instagram.com/saas.scordi?igshid=NTc4MTIwNjQ2YQ=="
                imgSrc="/home/icons/footer-icons/instagram-g-80_80.png"
                imgSrcHover="/home/icons/footer-icons/instagram-p-80_80.png"
            />
            <SocialIcon
                name="Scordi LinkedIn"
                href="https://www.linkedin.com/company/01republic-inc"
                imgSrc="/home/icons/footer-icons/linked_in-g-80_80.png"
                imgSrcHover="/home/icons/footer-icons/linked_in-p-80_80.png"
            />
            {/*<SocialIcon*/}
            {/*    name="Scordi Facebook"*/}
            {/*    href="https://www.facebook.com/profile.php?id=100092455911269"*/}
            {/*    imgSrc="/home/icons/footer-icons/facebook-g-80_80.png"*/}
            {/*    imgSrcHover="/home/icons/footer-icons/facebook-p-80_80.png"*/}
            {/*/>*/}
            <SocialIcon
                name="Scordi Naver blog"
                href="https://blog.naver.com/saas_scordi"
                imgSrc="/home/icons/footer-icons/naver_blog-g-80_80.png"
                imgSrcHover="/home/icons/footer-icons/naver_blog-p-80_80.png"
            />
            {/*<SocialIcon*/}
            {/*    name="Scordi Medium"*/}
            {/*    href="https://medium.com/@official_82899"*/}
            {/*    imgSrc="/home/icons/footer-icons/medium-g-80_80.png"*/}
            {/*    imgSrcHover="/home/icons/footer-icons/medium-p-80_80.png"*/}
            {/*/>*/}
            {/*<SocialIcon*/}
            {/*    name="Scordi Youtube"*/}
            {/*    href="https://youtube.com/@01republic"*/}
            {/*    imgSrc="/home/icons/footer-icons/youtube-g-80_80.png"*/}
            {/*    imgSrcHover="/home/icons/footer-icons/youtube-p-80_80.png"*/}
            {/*/>*/}
        </ul>
    );
});
