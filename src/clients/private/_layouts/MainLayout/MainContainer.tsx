import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MainContainerProps extends WithChildren {
    className?: string;
    containerFluid?: boolean;
}

export const MainContainer = memo((props: MainContainerProps) => {
    const {className = '', containerFluid = false, children} = props;

    return (
        <main className={`w-full ${containerFluid ? '' : 'container py-[2rem]'}`}>
            <div
                className={`mx-auto ${
                    containerFluid
                        ? `${className} mt-6 px-4 md:px-6 lg:px-8`
                        : `${className.includes('max-w') ? className : `max-w-6xl ${className}`} px-4 py-2`
                }`}
            >
                {children}
            </div>
        </main>
    );
});
MainContainer.displayName = 'MainContainer';
