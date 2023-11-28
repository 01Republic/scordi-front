import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {LinkTo} from '^components/util/LinkTo';
import {isAddingModeState} from './atom';

export const AddNewAppButton = memo(function AddNewAppButton() {
    const setAddingMode = useSetRecoilState(isAddingModeState);

    return (
        <LinkTo
            href="#"
            onClick={() => setAddingMode(true)}
            className="card p-4 btn-scordi shadow-md hover:shadow-lg flex flex-row gap-2 items-start cursor-pointer btn-animation"
        >
            <span className="leading-[20px]">
                혹시 쓰고 있는데 <br /> 표시되지 않은 <br /> 서비스가 있나요?
            </span>
        </LinkTo>
    );
});
