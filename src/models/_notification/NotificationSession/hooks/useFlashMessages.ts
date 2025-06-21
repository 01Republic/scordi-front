import {useRecoilValue, useSetRecoilState} from 'recoil';
import {notificationFlashMessagesAtom} from '../atom';

export const useFlashMessages = () => {
    return useRecoilValue(notificationFlashMessagesAtom);
};

export const useSetFlashMessages = () => {
    const setFlashMessages = useSetRecoilState(notificationFlashMessagesAtom);
    const reset = () => setFlashMessages([]);

    const removeOne = (id: number) => {
        setFlashMessages((messages) => messages.filter((message) => message.id !== id));
    };

    return {
        reset,
        removeOne,
    };
};
