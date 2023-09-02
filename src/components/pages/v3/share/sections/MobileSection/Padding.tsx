import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface PaddingProps extends WithChildren {}

export default memo((props: PaddingProps) => {
    const {children} = props;

    return (
        <div data-component="MobileSection.Padding" className="p-4">
            {children}
        </div>
    );
});
