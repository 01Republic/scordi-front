import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface PaddingProps extends WithChildren {}

export default memo(function MobileSectionItemPadding(props: PaddingProps) {
    const {children} = props;

    return (
        <div data-component="MobileSection.Padding" className="py-4 px-6">
            {children}
        </div>
    );
});
