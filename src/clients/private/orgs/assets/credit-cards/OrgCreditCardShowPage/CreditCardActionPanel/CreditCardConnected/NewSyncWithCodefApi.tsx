import React, {memo} from 'react';
import {FaPlay} from 'react-icons/fa6';
import Tippy from '@tippyjs/react';

interface NewSyncWithCodefApiProps {
    onStart: () => any;
    onFinish: () => any;
}

export const NewSyncWithCodefApi = memo((props: NewSyncWithCodefApiProps) => {
    const {onStart, onFinish} = props;

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
