import React, {useEffect} from 'react';
import {StageMarkUp} from './StageMarkUp';
import {PreLoader} from '^components/PreLoader';

export const StageMarkUpStep1: StageMarkUp = {
    title: () => '연동을 시작합니다.',
    description: '',
    StageForm: (props) => {
        const {title = '', description = '', next} = props;

        useEffect(() => {
            setTimeout(() => next(), 2000);
        }, []);

        return (
            <div className="fade">
                <h3 className="font-bold text-lg mb-2.5 w-full text-center">{title}</h3>
                {description && <p className="py-4">{description}</p>}

                <PreLoader screenSize={false} />
            </div>
        );
    },
};
