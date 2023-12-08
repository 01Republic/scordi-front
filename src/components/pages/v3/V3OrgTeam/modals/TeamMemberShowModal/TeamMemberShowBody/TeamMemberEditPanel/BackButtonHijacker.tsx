import React, {memo} from 'react';

interface BackButtonHijackerProps {
    onClick?: () => any;
}

export const BackButtonHijacker = memo(function BackButtonHijacker(props: BackButtonHijackerProps) {
    const {onClick} = props;

    return (
        <div
            data-component="BackButtonHijacker"
            className="sticky top-0 left-0 h-[50px] z-10 mt-[-50px] no-selectable w-fit"
        >
            <div className="h-full px-5 cursor-pointer inline-block" onClick={onClick}>
                <div className="block w-[24px]">&nbsp;</div>
            </div>
        </div>
    );
});
