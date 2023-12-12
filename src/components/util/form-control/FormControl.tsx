import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';
import {TopLeftLabel} from './TopLeftLabel';
import {BottomLeftHint} from './BottomLeftHint';

export interface FormControlProps extends WithChildren {
    topLeftLabel?: ReactNode;
    bottomLeftHint?: ReactNode;
}

export const FormControl = memo((props: FormControlProps) => {
    const {topLeftLabel, bottomLeftHint, children} = props;

    return (
        <div className="form-control w-full">
            {topLeftLabel && <TopLeftLabel text={topLeftLabel} />}
            {children}
            {bottomLeftHint && <BottomLeftHint text={bottomLeftHint} />}
        </div>
    );
});
FormControl.displayName = 'FormControl';
