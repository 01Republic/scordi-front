import React, {memo, useEffect, useState} from 'react';
import {EmptyTable} from '^_components/table/EmptyTable';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {Transition} from '@headlessui/react';

interface SearchingProps {
    isLoadingMsg: string;
}

export const Searching = memo((props: SearchingProps) => {
    const {isLoadingMsg} = props;
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsShow(true), 1000);
        return () => {
            setIsShow(false);
        };
    }, []);

    return (
        <Transition show={isShow}>
            <EmptyTable
                className="py-0 transition duration-500 ease-in data-closed:opacity-0"
                Icon={() => <Lottie src={LOTTIE_SRC.LOADING_SEARCHING} loop autoplay className="h-40 -mb-4" />}
                message={isLoadingMsg || '계좌 정보 조회중'}
            />
        </Transition>
    );
});
Searching.displayName = 'Searching';
