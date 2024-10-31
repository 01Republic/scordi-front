import React, {memo} from 'react';

interface TitleProps {
    line1: string;
    line2?: string;
}

export const Title = memo((props: TitleProps) => {
    const {line1 = '', line2 = '입력해주세요'} = props;

    return (
        <div className="flex flex-row lg:flex-col items-center lg:items-start">
            {line1 && <p className="font-semibold text-2xl">{line1}</p>}
            <p className="font-semibold text-2xl ml-1.5 lg:ml-0">{line2}</p>
        </div>
    );
});
