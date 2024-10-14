import React, {memo} from 'react';
import {FaPlay} from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import {useCurrentCreditCardSync} from '../../atom';

export const NewSyncWithCodefApi = memo(() => {
    const {onFinish} = useCurrentCreditCardSync();

    return (
        <Tippy visible={true} content="But available">
            <div>
                <div className="btn btn-square border-gray-300">
                    <FaPlay />
                </div>
            </div>
        </Tippy>
    );
});
NewSyncWithCodefApi.displayName = 'NewSyncWithCodefApi';
