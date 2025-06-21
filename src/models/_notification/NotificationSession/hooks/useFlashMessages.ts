import {useRecoilValue} from 'recoil';
import {notificationFlashMessagesAtom} from '../atom';

export const useFlashMessages = () => {
    return useRecoilValue(notificationFlashMessagesAtom);
};
