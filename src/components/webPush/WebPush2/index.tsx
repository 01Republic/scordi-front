import {memo, useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
import {getAnalytics} from 'firebase/analytics';
import {useRouter} from 'next/router';
import {registerUsersWebpushDevice} from '^api/session.api';
import {isMobile} from 'react-device-detect';

const firebaseConfig = {
    //프로젝트 설정 > 일반 > 하단의 내앱에서 확인
    apiKey: 'AIzaSyAsmx6IzlKQbSa_td2LB9LWPui8xNjqwZA',
    authDomain: 'webpush-97038.firebaseapp.com',
    projectId: 'webpush-97038',
    storageBucket: 'webpush-97038.appspot.com',
    messagingSenderId: '896713842795',
    appId: '1:896713842795:web:78ca28137dbb4f7e5c512e',
    measurementId: 'G-B3TVD7TC2D',
};

const scordiIcon = 'https://payplo-service.s3.ap-northeast-2.amazonaws.com/email-templates/assets/logo.png';

// vapidKey: '프로젝트설정 > 클라우드메시징 > 웹 구성의 웹푸시인증서 발급',
const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

export const WebPush2 = memo(() => {
    const router = useRouter();

    async function pageLoaded() {
        // Firebase 앱 초기화
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const messaging = getMessaging(app);

        // 푸시 알림 권한 요청
        const permission = await Notification.requestPermission();
        console.log('permission', permission);
        if (permission !== 'granted') return;

        // console.log('permission', permission);

        // FCM 토큰 검색
        const fcmToken = await getToken(messaging, {vapidKey}).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
        console.log('FCM 토큰:', fcmToken);
        if (!fcmToken) return;

        // Send the token to your server and update the UI if necessary
        // ...
        // console.log('FCM 토큰:', currentToken);

        // 백엔드 서버에 FCM 토큰 전송
        await registerUsersWebpushDevice({isMobile, fcmToken});

        //포그라운드 메시지 수신
        onMessage(messaging, (payload) => {
            const notification = payload.notification!;
            new Notification(`${notification.title}`, {
                body: notification.body,
                image: notification.image,
                icon: notification.icon || scordiIcon,
                data: payload.data,
                vibrate: 100,
                requireInteraction: true,
            });
        });
    }

    useEffect(() => {
        pageLoaded();
    }, [router.isReady]);

    return <></>;
});
