import {memo, ReactNode, useEffect, useState} from 'react';
import {WithChildren} from '^types/global.type';

type Component = ReactNode | (() => JSX.Element);

type Next =
    /** stay time ms */
    | number

    /** Promise function. If false, stop sequence, and if number, retry after number(ms). */
    | (() => Promise<boolean | number>);

interface StepProps {
    index: number;
    next: (nextIndex: number) => any;
}

type SequenceStep = [Component, Next] | ((props: StepProps) => JSX.Element);

interface SequenceProps {
    steps: SequenceStep[];
    loop?: boolean;
}

export const Sequence = memo((props: SequenceProps) => {
    const {steps, loop = false} = props;
    const [index, setIndex] = useState(0);
    const size = steps.length;
    const CurrentStep = steps[index];

    const next = (nextIndex: number) => {
        if (nextIndex < size) return setIndex((i) => (i < nextIndex ? nextIndex : i));

        if (loop) return setIndex(0);

        return setIndex(size - 1);
    };

    if (typeof CurrentStep === 'function') {
        return <CurrentStep index={index} next={next} />;
    }

    return <SequenceStepContainer index={index} step={CurrentStep} onNext={next} />;
});

interface SequenceStepContainerProps {
    index: number;
    step: [Component, Next];
    onNext: (nextIndex: number) => any;
}

const SequenceStepContainer = (props: SequenceStepContainerProps) => {
    const {index, step, onNext} = props;
    const [Component, next] = step;

    useEffect(() => {
        if (typeof next === 'number') {
            setTimeout(() => onNext(index + 1), next);
        }
        if (typeof next === 'function') {
            next()
                .then((result) => {
                    if (result === false) return onNext(index);
                    if (typeof result === 'number') return setTimeout(() => onNext(index + 1), result);
                    return onNext(index + 1);
                })
                .catch(console.error);
        }
    }, [index]);

    return typeof Component === 'function' ? <Component /> : <>{Component}</>;
};

interface SequenceStepProps extends WithChildren, StepProps {
    content?: Component;

    /** stay time ms */
    delay?: number;

    /** Promise function. If false, stop sequence, and if number, retry after number(ms). */
    promise?: () => Promise<boolean | number>;

    onNext?: (nextIndex: number) => any;
}

export const SequenceStep = (props: SequenceStepProps) => {
    const {content: Content, children, delay, promise, index, next, onNext} = props;

    const goNext = (nextIndex: number) => {
        next(nextIndex);
        onNext && onNext(nextIndex);
    };

    useEffect(() => {
        if (typeof delay === 'number') {
            setTimeout(() => goNext(index + 1), delay);
        }
        if (typeof promise === 'function') {
            promise()
                .then((result) => {
                    if (result === false) return goNext(index);
                    if (typeof result === 'number') return setTimeout(() => goNext(index + 1), result);
                    return goNext(index + 1);
                })
                .catch(console.error);
        }
    }, [index]);

    return typeof Content === 'undefined' ? (
        <>{children}</>
    ) : typeof Content === 'function' ? (
        <Content />
    ) : (
        <>{Content}</>
    );
};
