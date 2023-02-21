import {memo, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export const Timer = memo(() => {
    const MINUTES_IN_MS = 5 * 60 * 1000;
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
            toast.info('Please check your code');
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    return (
        <div>
            {minutes} : {second}
        </div>
    );
});
