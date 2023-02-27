self.addEventListener('push', function (event) {
    // 1. push 서비스가 메시지를 받았을때 트리거하는 이벤트
    console.log('🦊===>', event);

    const payload = JSON.parse(event.data.text());
    const urlToOpen = 'http://localhost:3000';
    event.waitUntil(
        registration.showNotification(payload.title, {
            body: payload.body,
            data: {link: payload.link},
        }),
    );
});

//유저가 webpush를 클릭했을때 발생하는 이벤트
self.addEventListener('notificationclick', (event) => {
    ClientRequest.openWindow(event.notification.data.link);
});

//서비스 워커가 설치됐을때 발생하는 이벤트
self.addEventListener('install', () => {
    self.skipWaiting();
});
