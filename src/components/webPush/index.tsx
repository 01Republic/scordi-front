import {useRouter} from 'next/router';
import React, {memo, useEffect, useState} from 'react';
import {patchUsersWebpushRegister, postUserWebpushTest} from '^models/User/api/session';
import {vapidPublicKey} from '^config/environments';

declare global {
    interface Window {
        subscribe: () => Promise<void>;
    }
}

const publicVapidKey = vapidPublicKey;

export const WebPush = memo(() => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        // 1. 권한 확인 함수
        const checkNotificationPermission = async () => {
            if ('Notification' in window) {
                if (window.Notification.permission === 'granted') {
                    await registerServiceWorker();
                } else {
                    const permission = await window.Notification.requestPermission();
                    if (permission === 'granted') {
                        await registerServiceWorker();
                        console.log('보내져라====');
                        new Notification('⭐️⭐️⭐️⭐️성공⭐️⭐️⭐️⭐️');
                    }
                }
            }
        };

        console.log('🚆알림 권한 상태 : ', window.Notification.permission);

        //2. 서비스워커 등록 함수
        const registerServiceWorker = async () => {
            if (!('serviceWorker' in navigator)) return;
            const registration = await navigator.serviceWorker.register('/service-worker.js', {scope: '/'});

            if (!publicVapidKey) {
                console.error('VAPID public key is not defined');
                return;
            }

            const subscription = await registration.pushManager.subscribe({
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey!),
                userVisibleOnly: true,
            });
            console.log('🐯 apps 내용 : ', subscription);

            //구독 정보 서버로 patch
            patchUsersWebpushRegister({subscription}).then((res) => setUserInfo(res.data));
        };

        checkNotificationPermission();
        postUserWebpushTest().then((res) => console.log('🐤', res));

        return;
    }, []);

    console.log('👨‍👧‍👧 setUserInfo에 담음 : ', userInfo);

    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    return <></>;
});
