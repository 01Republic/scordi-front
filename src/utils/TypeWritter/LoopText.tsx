import React from 'react';
import {Typewriter} from 'react-simple-typewriter';
import {TypewriterProps} from 'react-simple-typewriter/dist/hooks/useTypewriter';
import {PartialProp} from '^utils/type/required-prop';

interface LoopTextProps extends PartialProp<TypewriterProps, 'words'> {
    text?: string;
}

export const LoopText = (props: LoopTextProps) => {
    const {text = '...', loop, ...res} = props;

    return (
        <Typewriter
            words={[text]}
            cursor={false}
            loop={loop ?? true}
            delaySpeed={0}
            deleteSpeed={0}
            typeSpeed={500}
            {...res}
        />
    );
};

interface WithLoopTextProps extends LoopTextProps {
    loopWord?: string;

    /**
     * 중심텍스트 고정 여부.
     * - 텍스트가 화면 중앙정렬 등 왼쪽정렬이 아닌경우, 루프 단어가 움직이면 전체 가로길이가 늘어나고 이로인해 문장 전체가 의도치않게 움직이는 문제가 있을 수 있음.
     * - CSS 를 통해 display: absolute; 를 붙여서 해결함.
     * - 혹시 기준점이 이상하다면 감싸는 컴포넌트에서 relative 를 적용해 볼 것.
     * */
    absolute?: boolean;
}

export const WithLoopText = (props: WithLoopTextProps) => {
    const {text, loopWord = '...', absolute = false, ...res} = props;

    return (
        <>
            {text}
            {absolute ? (
                <span className="absolute">
                    <LoopText text={loopWord} {...res} />
                </span>
            ) : (
                <LoopText text={loopWord} {...res} />
            )}
        </>
    );
};
