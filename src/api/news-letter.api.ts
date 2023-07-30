import {CreateNewsLetterSubscriberDto, NewsLetterSubscriberDto} from '^types/news-letter-subscriber.type';
import {api} from '^api/api';

export const newsLetterApi = {
    subscribers: {
        create(dto: CreateNewsLetterSubscriberDto) {
            return api.post<NewsLetterSubscriberDto>('/news-letter-subscribers', dto);
        },
    },
};
