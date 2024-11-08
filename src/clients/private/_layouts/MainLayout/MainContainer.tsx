import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MainContainerProps extends WithChildren {}

export const MainContainer = memo((props: MainContainerProps) => {
    const {children} = props;

    return (
        <main className="w-full container py-[2rem]">
            <div className="mx-auto max-w-6xl px-4 py-2">{children}</div>
        </main>
    );
});
MainContainer.displayName = 'MainContainer';
