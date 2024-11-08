import {memo, useState} from 'react';
import {TopLineBannerContent} from '^clients/private/orgs/OrgMainPage/TopLineBannerContent';
import {LineBannerTheme, TopLineBannerDto} from '^models/TopLineBanner/type';

/*
    ✅이 컴포넌트는 이름이 탑라인베너면안돼요
    ✅배너스로 변경
    api를 통해서 현재 랜더링되어야하는 배너 건들을 조회해야함
    배너 데이터하나하나에맞게 텍스트 링크 테마 가 들어가야함
    ✅닫기/시간지나면 꺼지는 기능들은 변수로 만들어 놓고 api데이터에 따라서 사용할 수 있게
     */

const bannerData: TopLineBannerDto[] = [
    {
        id: 1,
        text: '무료체험이 곧 만료 됩니다. 지금 스코디를 구독하시면 평생 지금처럼 저렴한 요금제로 사용할 수 있어요!',
        url: '',
        theme: 'waring',
        animation: false,
        individual: true,
        duration: null,
    },
    {
        id: 2,
        text: '스코디를 구독해주셔서 감사합니다! 지금 담당자님께만 보이는 이 배너를 클릭해 피드백을 입력하고 투표해보세요!',
        url: 'https://blog.scordi.io/',
        theme: 'thanksTo',
        animation: true,
        individual: true,
        duration: null,
    },
    {
        id: 3,
        text: '스코디를카드 결제내역을 불러오고 있어요. 잠시만 기다려주시면 곧 완료 됩니다!',
        url: '',
        theme: 'cardInfo',
        animation: true,
        individual: false,
        duration: 3000,
    },
];

export const TopLineBannerContainer = memo(() => {
    return (
        <div>
            {bannerData.map((val) => (
                <TopLineBannerContent
                    key={val.id}
                    text={val.text}
                    url={val.url || undefined}
                    theme={val.theme}
                    animation={val.animation}
                    individual={val.individual}
                    duration={val.duration || null}
                />
            ))}
        </div>
    );
});
TopLineBannerContainer.displayName = 'TopLineBannerContainer';
