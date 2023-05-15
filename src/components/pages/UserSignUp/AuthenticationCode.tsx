import {memo, useCallback, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

interface TimerProps {
    sec?: number; // 5min default.
    onFinish?: () => any;
    resettable?: boolean;
}

const SEC = 5 * 60;
const ON_FINISH = () => toast.info('Timeout!');

export const Timer = memo((props: TimerProps) => {
    const {sec = SEC, onFinish = ON_FINISH, resettable = false} = props;
    const MINUTES_IN_MS = sec * 1000;
    const INTERVAL = 1000;
    const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - INTERVAL);
        }, INTERVAL);

        if (timeLeft <= 0) {
            clearInterval(timer);
            onFinish();
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    const reset = useCallback(() => setTimeLeft(MINUTES_IN_MS), [MINUTES_IN_MS]);

    return (
        <div onClick={(timeLeft === 0 && resettable && reset) || undefined}>
            {minutes} : {second}
        </div>
    );
});
