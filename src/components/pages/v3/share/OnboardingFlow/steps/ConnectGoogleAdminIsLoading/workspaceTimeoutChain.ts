import {tChainStep, timeoutChain} from '^components/util/delay';
import {Dispatch, SetStateAction} from 'react';

export const workspaceTimeoutChain = (
    setTitle: Dispatch<SetStateAction<string>>,
    setDesc: Dispatch<SetStateAction<string>>,
) => {
    timeoutChain(4000, [
        tChainStep(5000, () => {
            setTitle('구성원 정보를 불러오고 있어요');
        }), // 9s
        tChainStep(3000, () => {
            setTitle('구독 서비스를 불러오고 있어요');
        }), // 12s
        tChainStep(2000, () => {
            setTitle('거의 다 가져왔어요');
            setDesc('조금만 기다려 주세요. 새로고침하면 처음부터 해야 해요!');
        }), // 14s
        tChainStep(0, () => {
            setTitle('마지막으로 권한을 확인하고 있어요');
            setDesc('꼼꼼하게 확인하고 정리하는 중이에요!');
        }), // later
    ]);
};
