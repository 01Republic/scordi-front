import React, {memo} from 'react';
import {TopNavMobileContainer} from './Container';
import {ReactComponentLike} from 'prop-types';
import {ReactNodeElement} from '^types/global.type';

interface TopNavMobileProps {
    title?: ReactNodeElement;
    rightButtons?: ReactComponentLike[];
}

export const TopNavMobileDefault = memo((props: TopNavMobileProps) => {
    const {title, rightButtons = []} = props;

    return (
        <TopNavMobileContainer>
            <h1 className="flex-1 px-6 m-0 text-xl capitalize">{title}</h1>
            <div className="text-sm px-6 h-full flex items-center">
                {rightButtons.length ? rightButtons.map((RightButton, i) => <RightButton key={i} />) : <br />}
            </div>
        </TopNavMobileContainer>
    );
});
