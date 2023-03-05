//프로젝트 버전 확인
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js');

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

const firebaseApp = firebase.initializeApp(firebaseConfig);
if (firebase.messaging.isSupported()) {
    console.log('firebaseConfig', firebaseConfig);
    const messaging = firebase.messaging(firebaseApp);

    //백그라운드 서비스워커 설정
    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        const notification = payload.notification;
        // Customize notification here
        self.registration.showNotification(`[BG] ${notification.title}`, {
            body: notification.body,
            image: notification.image,
            icon: notification.icon || scordiIcon,
            data: payload.data,
            vibrate: 100,
            requireInteraction: true,
        });
    });
}
