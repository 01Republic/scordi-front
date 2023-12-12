import {tChainStep, timeoutChain} from '^components/util/delay';
import {Dispatch, SetStateAction} from 'react';

export const invoiceAccountTimeoutChain = (
    setTitle: Dispatch<SetStateAction<string>>,
    setDesc: Dispatch<SetStateAction<string>>,
) => {
    timeoutChain(4000, [
        tChainStep(5000, () => {
            setTitle('결제 메일을 검색하고 있어요 (1/7)');
        }), // 9s
        tChainStep(2000, () => {
            setTitle('3개월치 분석 중 (2/7)');
        }), // 11s
        tChainStep(2000, () => {
            setTitle('6개월치 분석 중 (3/7)');
        }), // 13s
        tChainStep(2000, () => {
            setTitle('9개월치 분석 중 (4/7)');
        }), // 15s
        tChainStep(2000, () => {
            setTitle('12개월치 분석 중 (5/7)');
        }), // 17s
        tChainStep(6000, () => {
            setTitle('동기화 하는 중 (6/7)');
            setDesc('조금만 기다려 주세요. 새로고침하면 처음부터 해야 해요!');
        }), // 23s
        tChainStep(0, () => {
            setTitle('마지막으로 권한을 확인하고 있어요 (7/7)');
            setDesc('꼼꼼하게 확인하고 정리하는 중이에요!');
        }), // later
    ]);
};
