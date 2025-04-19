import confetti from 'canvas-confetti';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

interface ConfettiEffectProps {
    shouldFire: boolean;
}

const count = 200;
const defaults = {
    origin: {y: 0.7},
};

function fire(particleRatio: number, opts: any) {
    confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
    });
}

export const ConfettiEffect = ({shouldFire}: ConfettiEffectProps) => {
    const router = useRouter();

    useEffect(() => {
        if (shouldFire) {
            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });
            fire(0.2, {
                spread: 60,
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });

            const {confetti, ...restQuery} = router.query;
            router.replace({query: restQuery}, undefined, {shallow: true});
        }
    }, [shouldFire, router]);

    return null;
};
