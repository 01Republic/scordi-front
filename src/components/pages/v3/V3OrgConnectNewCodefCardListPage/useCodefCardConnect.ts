import {useState} from 'react';
import {RecoilState, useRecoilState} from 'recoil';
import {newCodefCardConnected} from '^v3/V3OrgConnectNewCodefCardListPage/atom';
import {timeoutChain2} from '^components/util/delay';

export const useCodefCardConnectedContainer = (connectedContainerAtom: RecoilState<Record<number, boolean>>) => {
    const [connected, setConnected] = useRecoilState(connectedContainerAtom);
};

export const useCodefCardConnect = (id: number, connectedContainerAtom: RecoilState<Record<number, boolean>>) => {
    const [runningProgress, setRunningProgress] = useState(0);
    const [runningText, setRunningText] = useState('');
    const [connected, setConnected] = useRecoilState(connectedContainerAtom);

    const setStatus = (status?: boolean) => {
        setConnected((obj) => {
            const {...newObj} = obj;
            if (typeof status === 'boolean') {
                newObj[id] = status;
            } else {
                delete newObj[id];
            }
            return newObj;
        });
    };

    const setProgress = (value: number) => {
        setConnected((obj) => {
            if (obj[id] === false) setRunningProgress(value);
            return obj;
        });
    };
    const setText = (value: string) => {
        setConnected((obj) => {
            if (obj[id] === false) setRunningText(value);
            return obj;
        });
    };

    async function startProgress() {
        timeoutChain2(0, [
            [0, () => setProgress(1)],
            [2, () => setProgress(5)],
            [4, () => setProgress(10)],
            [6, () => setProgress(15)],
            [8, () => setProgress(20)],
            [10, () => setProgress(25)],
            [12, () => setProgress(30)],
            [14, () => setProgress(35)],
            [16, () => setProgress(40)],
            [18, () => setProgress(45)],
            [20, () => setProgress(50)],
            [22, () => setProgress(55)],
            [24, () => setProgress(60)],
            [26, () => setProgress(65)],
            [28, () => setProgress(70)],
            [30, () => setProgress(75)],
            [34, () => setProgress(80)],
            [40, () => setProgress(85)],
            [60, () => setProgress(90)],
            // [60, () => setProgress(90)],
            // [60, () => setProgress(90)],
        ]);

        timeoutChain2(0, [
            [0, () => setText('연동을 시작합니다')],
            [3, () => setText('인증 정보를 가져오고 있어요')],
            [6, () => setText('인증 정보를 가져오고 있어요')],
            [9, () => setText('결제내역을 불러오고 있어요 (1/3)')],
            [12, () => setText('결제내역을 불러오고 있어요 (2/3)')],
            [15, () => setText('결제내역을 불러오고 있어요 (3/3)')],
            [16, () => setText('분석중')],
            [20, () => setText('20% 분석중')],
            [21, () => setText('41% 분석중')],
            [22, () => setText('70% 분석중')],
            [23, () => setText('88% 분석중')],
            [24, () => setText('97% 분석중')],
            [25, () => setText('분석중')],
            [27, () => setText('구독만 추려내고 있어요')],
            [32, () => setText('거의 다 됐어요')],
            [
                75,
                () => {
                    // alert('아직 로딩이 끝나지 않았다면\n 새로고침 후 다시 시도해주세요')
                },
            ],
        ]);
    }

    const connectingStatus = {
        start: () => {
            setStatus(false);
            startProgress();
        },
        finish: () => {
            setStatus(true);
            setRunningProgress(100);
            setRunningText('');
        },
        reset: () => {
            setStatus(undefined);
            setRunningProgress(0);
            setRunningText('');
        },
        isRunning: () => connected[id] === false,
        isFinished: () => connected[id] === true,
    };

    return {runningProgress, runningText, connectingStatus};
};
