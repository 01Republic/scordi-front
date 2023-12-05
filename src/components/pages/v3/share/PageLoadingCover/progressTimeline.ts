import {Dispatch, SetStateAction} from 'react';
import {tChainStep, timeoutChain} from '^components/util/delay';

export function progressTimeline(setProgress: Dispatch<SetStateAction<number>>) {
    const addProgress = (val: number) => setProgress((n) => (n == 100 ? n : n + val));

    addProgress(10); // 10
    timeoutChain(500, [
        tChainStep(500, () => {
            addProgress(20); // 30
        }), // 1s
        tChainStep(800, () => {
            addProgress(5); // 35
        }), // 1.8s
        tChainStep(1200, () => {
            addProgress(3); // 38
        }), // 3s
        tChainStep(500, () => {
            addProgress(17); // 45
        }), // 3.5s
        tChainStep(500, () => {
            addProgress(2); // 47
        }), // 4s
        tChainStep(1000, () => {
            addProgress(3); // 50
        }), // 5s
        tChainStep(1000, () => {
            addProgress(0); // 50
        }), // 6s
        tChainStep(1000, () => {
            addProgress(3); // 53
        }), // 7s
        tChainStep(1000, () => {
            addProgress(17); // 70
        }), // 8s
        tChainStep(1000, () => {
            addProgress(5); // 85
        }), // 9s
        tChainStep(500, () => {
            addProgress(2); // 87
        }), // 9.5s
        tChainStep(500, () => {
            addProgress(3); // 90
        }), // 10s
        tChainStep(0, () => {
            addProgress(5); // 95
        }), // 10s
    ]);
}
