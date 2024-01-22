import {memo} from 'react';
import {WithChildren} from '^types/global.type';

export const FormControlGroup = memo((props: WithChildren) => {
    const {children} = props;
    return <div className="w-full flex flex-col gap-4">{children}</div>;
});
