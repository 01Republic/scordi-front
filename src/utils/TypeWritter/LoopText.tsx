import React from 'react';
import {Typewriter} from 'react-simple-typewriter';
import {TypewriterProps} from 'react-simple-typewriter/dist/hooks/useTypewriter';
import {PartialProp} from '^utils/type/required-prop';

interface LoopTextProps extends PartialProp<TypewriterProps, 'words'> {
    text?: string;
}

export const LoopText = (props: LoopTextProps) => {
    const {text = '...', ...res} = props;

    return <Typewriter words={[text]} cursor={false} loop delaySpeed={0} deleteSpeed={0} typeSpeed={500} {...res} />;
};

interface WithLoopTextProps extends LoopTextProps {
    loopWord?: string;
}

export const WithLoopText = (props: WithLoopTextProps) => {
    const {text, loopWord = '...', ...res} = props;

    return (
        <>
            {text}
            <LoopText text={loopWord} {...res} />
        </>
    );
};
