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
    const messaging = firebase.messaging(firebaseApp);

    //백그라운드 서비스워커 설정
    messaging.onBackgroundMessage((payload) => {
        // 1. push 서비스가 메시지를 받았을때 트리거하는 이벤트
        console.log('🦊===>', payload);
        const notification = payload.notification;
        payload.data ||= {};
        if (payload.fcmOptions?.link) payload.data.link = payload.fcmOptions.link;
        // Customize notification here
        self.registration.showNotification(`${notification.title}`, {
            body: notification.body,
            image: notification.image,
            icon: notification.icon || scordiIcon,
            data: payload.data,
            vibrate: 100,
            requireInteraction: true,
        });
    });
}

//유저가 webpush를 클릭했을때 발생하는 이벤트
self.addEventListener('notificationclick', function (event) {
    // 1. push 서비스가 메시지를 받았을때 트리거하는 이벤트
    console.log('🦊===>', event);
    const url = event?.notification?.data?.link;
    if (!url) return;

    event.waitUntil(
        clients.matchAll({type: 'window'}).then((windowClients) => {
            // Check if there is already a window/tab open with the target URL
            const client = windowClients.find((client) => client.url === url && 'focus' in client);
            if (client) return client.focus();

            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        }),
    );
});
