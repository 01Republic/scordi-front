import {plainToInstance} from 'class-transformer';
import {NotificationMessageDto} from '^models/_notification/NotificationMessage/types';

export const dummyItems = plainToInstance(NotificationMessageDto, [
    {
        title: '구독 가격이 변경됐어요.',
        readAt: null,
        sentAt: new Date(),
        url: 'https://naver.com',
    },
    {
        title: '구독 가격이 변경됐어요. 내용이 더 길어지면 생략하는 대신 늘어나도 될 듯 합니다.',
        readAt: null,
        sentAt: new Date('2025-06-18T00:00:00.000Z'),
        url: 'https://naver.com',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-06-16T06:00:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: null,
        sentAt: new Date('2025-05-10T10:00:00.000Z'),
        url: 'https://naver.com',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-04-28T00:00:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: null,
        sentAt: new Date('2025-03-11T00:00:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-02-05T12:45:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-01-05T12:45:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-01-05T12:45:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-01-05T12:45:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-01-05T12:45:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-01-05T12:45:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-01-05T12:45:00.000Z'),
        url: '/',
    },
    {
        title: '구독 가격이 변경됐어요.',
        readAt: new Date(),
        sentAt: new Date('2025-01-05T12:45:00.000Z'),
        url: '/',
    },
]);
